
import { AptosClient, FaucetClient, HexString } from "aptos";
import {
  AggregatorAccount,
  SWITCHBOARD_DEVNET_ADDRESS,
  JobAccount,
  OracleQueueAccount,
  OracleAccount,
  CrankAccount,
  EscrowManager,
} from "../lib/cjs";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const QUEUE_HEX = SWITCHBOARD_DEVNET_ADDRESS;
const ORACLE_HEX =
  "0x8c7633f0a6037d590b852443ff452823709a884d45a2cd748c00a0d0728ec99d";
const CRANK_HEX = SWITCHBOARD_DEVNET_ADDRESS;
const AGGREGATOR_HEX =
  "0xd7cf7788710a7249c76f84f4c73c46a935087650df11c0c35d1d4c4cdca4c79a";

// run it all at once
(async () => {
  const client = new AptosClient(NODE_URL);
  const faucet = new FaucetClient(NODE_URL, FAUCET_URL);

  const queue = new OracleQueueAccount(
    client,
    QUEUE_HEX,
    SWITCHBOARD_DEVNET_ADDRESS
  );
  const queueState = await queue.loadData();

  console.log(`## QUEUE`);
  console.log(queueState.toJSON());

  const oracle = new OracleAccount(
    client,
    ORACLE_HEX,
    SWITCHBOARD_DEVNET_ADDRESS
  );
  const oracleState = await oracle.loadData();

  console.log(`## ORACLE`);
  console.log(oracleState.toJSON());

  const crank = new CrankAccount(client, CRANK_HEX, SWITCHBOARD_DEVNET_ADDRESS);
  const crankState = await crank.loadData();

  console.log(`## CRANK`);
  console.log(crankState.toJSON());

  const aggregator = new AggregatorAccount(
    client,
    AGGREGATOR_HEX,
    SWITCHBOARD_DEVNET_ADDRESS
  );
  const aggregatorState = await aggregator.loadData();

  console.log(`## AGGREGATOR`);
  console.log(aggregatorState.toJSON());

  for await (const [i, jobKey] of aggregatorState.jobKeys.entries()) {
    const job = new JobAccount(client, jobKey, SWITCHBOARD_DEVNET_ADDRESS);
    const jobState = await job.loadData();
    const oracleJob = await job.loadJob();

    console.log(`## Job ${i}`);
    console.log(jobState.toJSON());
    console.log(oracleJob.toJSON());
  }

  const aggregatorEscrowManagerState = await EscrowManager.fetchItem(
    aggregator,
    QUEUE_HEX
  );

  console.log(`## ESCROW MANAGER`);
  console.log(aggregatorEscrowManagerState.toJSON());
})();