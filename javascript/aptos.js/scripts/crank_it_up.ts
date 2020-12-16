
/* 
  THE NON-CRANK CRANKER
*/
import { AptosClient, AptosAccount, HexString } from "aptos";
import {
  AggregatorAccount,
  CrankAccount,
  JobAccount,
  OracleJob,
} from "../lib/cjs";
import * as YAML from "yaml";
import * as fs from "fs";
import Big from "big.js";

const NODE_URL = "https://fullnode.mainnet.aptoslabs.com/v1";
const CRANK_ADDRESS =
  "0xbc9576fedda51d33e8129b5f122ef4707c2079dfb11cd836e86adcb168cbd473";

const SWITCHBOARD_ADDRESS =
  "0x7d7e436f0b2aafde60774efb26ccc432cf881b677aca7faaf2a01879bd19fb8";

(async () => {
  const client = new AptosClient(NODE_URL);

  let funder;

  // if file extension ends with yaml
  try {
    const parsedYaml = YAML.parse(
      fs.readFileSync("../.aptos/config.yaml", "utf8")
    );
    funder = new AptosAccount(
      HexString.ensure(parsedYaml.profiles.default.private_key).toUint8Array()
    );
  } catch (e) {
    console.log(e);
  }

  if (!funder) {
    throw new Error("Could not get funder account.");
  }

  // every 30s let's do a loop through all the data, check if we can crank pop at any idx - and do it if we can
  setInterval(async () => {
    const crank = new CrankAccount(client, CRANK_ADDRESS, SWITCHBOARD_ADDRESS);
    const data = await crank.loadData();
    const heap = data.heap;

    const heapEntries = Array.from(heap.entries());

    for (let [i, entry] of heapEntries) {
      console.log(i, entry);
      try {
        if (entry.timestamp.toNumber() * 1000 > Date.now()) {
          continue;
        }

        const agg = new AggregatorAccount(
          client,
          entry.aggregatorAddr,
          SWITCHBOARD_ADDRESS
        );

        const aggregatorData = await agg.loadData();

        // The event data includes JobAccount Pubkeys, so grab the JobAccount Data
        const jobs: OracleJob[] = await agg.loadJobs();

        // simulate a fetch
        const response = await fetch(`https://api.switchboard.xyz/api/test`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobs }),
        });

        if (!response.ok)
          console.error(`[Task runner] Error testing jobs json.`);
        else
          try {
            const json = await response.json();

            if (
              await AggregatorAccount.shouldReportValue(
                new Big(json.result),
                aggregatorData
              )
            ) {
              console.log("should pop", i, json.result);
              //const tx = await crank.pop(funder, i);
              console.log("save result tx:", 0);
            }
          } catch (e) {
            console.log("should not pop");
          } // errors will happen when task runner returns them
      } catch (e) {
        console.log("open round fail", e);
      }
    }
  }, 10000);
})();