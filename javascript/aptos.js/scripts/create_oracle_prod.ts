
import {
  AptosClient,
  AptosAccount,
  FaucetClient,
  HexString,
  CoinClient,
} from "aptos";
import {
  OracleQueueAccount,
  CrankAccount,
  generateResourceAccountAddress,
  createOracle,
  sendAptosTx,
} from "../lib/cjs";
import * as YAML from "yaml";
import * as fs from "fs";

// const NODE_URL = "https://fullnode.mainnet.aptoslabs.com/v1";
const NODE_URL =
  "https://7023b384-9d18-4480-ba7a-bb629d724ae9:881b272ea3154b9dbb64b0bfe3878c9f@aptos-mainnet.nodereal.io/v1";
//const NODE_URL = "http://0.0.0.0:8080/v1";

// TODO: MAKE THIS THE DEPLOYER ADDRESS
const SWITCHBOARD_ADDRESS =
  "0x7d7e436f0b2aafde60774efb26ccc432cf881b677aca7faaf2a01879bd19fb8"; // (localnet)

// TODO: MAKE THIS THE AUTHORITY THAT WILL OWN THE ORACLE
const QUEUE_ADDRESS =
  "0xc887072e37f17f9cc7afc0a00e2b283775d703c610acca3997cb26e74bc53f3b"; // "0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77"; // (localnet)
/*
  CREATE 1 ORACLE AND WRITE OUT THE KEY
 */

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

  const ONE_APT = 100_000_000; // octas per APT

  const coinClient = new CoinClient(client);

  const transfer = async (
    client: AptosClient,
    from: AptosAccount,
    to: AptosAccount,
    amount: number
  ) => {
    const payload = {
      type: "entry_function_payload",
      function: "0x1::aptos_account::transfer",
      type_arguments: [],
      arguments: [to.address().hex(), amount],
    };
    await sendAptosTx(
      client,
      from,
      payload.function,
      payload.arguments,
      payload.type_arguments
    );
  };

  /*
    ORACLE CREATION
  */
  let oracle: any;
  try {
    // CREATE AUTHORITY OWNER AND FUND 1 APT
    const oracle_owner = new AptosAccount();
    fs.writeFileSync(
      `oracle-owner-keys-${oracle_owner.address().hex()}`,
      JSON.stringify(oracle_owner.toPrivateKeyObject())
    );

    // TODO: FUND MORE - since this is where gas payments will come from
    await transfer(client, funder, oracle_owner, ONE_APT);
    console.log(
      `Authority account ${oracle_owner.address().hex()} funded for oracle`
    );

    // NOTE: THIS WILL ONLY ADD THE HEARTBEAT PERMISSION QUEUE IF THE FUNDER IS THE QUEUE'S AUTHORITY
    const [o, oracleTxHash] = await createOracle(
      client,
      oracle_owner, // oracle_owner??
      {
        name: "Switchboard OracleAccount",
        authority: oracle_owner.address().hex(),
        metadata: "",
        queue: QUEUE_ADDRESS,
        coinType: "0x1::aptos_coin::AptosCoin",
      },
      SWITCHBOARD_ADDRESS
    );
    oracle = o;
    console.log(`Oracle ${oracle.address} created. tx hash: ${oracleTxHash}`);
  } catch (e) {
    console.log(e);
  }

  // try {
  // // trigger the oracle heartbeat
  // const heartbeatTxSig = await oracle.heartbeat(funder);
  // console.log("Heartbeat Tx Hash:", heartbeatTxSig);
  // } catch (e) {
  // console.log("could not heartbeat");
  // }
})();