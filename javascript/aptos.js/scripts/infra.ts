
/**
 * Creates a new account, inititalizes a Switchboard Resource Account on it
 *
 * Using that it should:
 *
 * DEMO --
 * Creates a new Aggregator
 * Creates a new Job (ftx btc/usd),
 * Adds Job to Aggregator
 * Push Aggregator to Crank
 */
import { AptosAccount, AptosClient, FaucetClient, HexString } from "aptos";
import Big from "big.js";
import { Buffer } from "buffer";
import {
  AggregatorAccount,
  AptosEvent,
  CrankAccount,
  createFeed,
  createOracle,
  EventCallback,
  fetchAggregators,
  JobAccount,
  LeaseAccount,
  OracleJob,
  OracleQueueAccount,
} from "../lib/cjs";

const NODE_URL = "http://0.0.0.0:8080";
const FAUCET_URL = "http://0.0.0.0:8081";

const SWITCHBOARD_ADDRESS =
  "0x348ecb66a5d9edab8d175f647d5e99d6962803da7f5d3d2eb839387aeb118300";

const onAggregatorUpdate = (
  client: AptosClient,
  cb: EventCallback,
  pollIntervalMs: number = 1000
): AptosEvent => {
  return AggregatorAccount.watch(
    client,
    SWITCHBOARD_ADDRESS,
    cb,
    pollIntervalMs
  );
};

const onAggregatorOpenRound = (
  client: AptosClient,
  cb: EventCallback,
  pollIntervalMs: number = 1000
) => {
  const event = new AptosEvent(
    client,
    HexString.ensure(SWITCHBOARD_ADDRESS),
    `${SWITCHBOARD_ADDRESS}::switchboard::State`,
    "aggregator_open_round_events",
    pollIntervalMs
  );
  event.onTrigger(cb);
  return event;
};

// run it all at once
(async () => {
  // INFRA ------
  const client = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

  // create new user
  let user = new AptosAccount();
  await faucetClient.fundAccount(user.address(), 500000000);
  console.log(`User account ${user.address().hex()} created + funded.`);

  const [queue, queueTxHash] = await OracleQueueAccount.init(
    client,
    user,
    {
      name: "switchboard unermissioned queue",
      metadata: "running",
      authority: user.address(),
      oracleTimeout: 3000,
      reward: 1,
      minStake: 0,
      slashingEnabled: false,
      varianceToleranceMultiplierValue: 0,
      varianceToleranceMultiplierScale: 0,
      feedProbationPeriod: 0,
      consecutiveFeedFailureLimit: 0,
      consecutiveOracleFailureLimit: 0,
      unpermissionedFeedsEnabled: true,
      unpermissionedVrfEnabled: true,
      lockLeaseFunding: false,
      enableBufferRelayers: false,
      maxSize: 1000,
      coinType: "0x1::aptos_coin::AptosCoin",
    },
    SWITCHBOARD_ADDRESS
  );
  console.log(`Oracle Queue ${queue.address} created. tx hash: ${queueTxHash}`);

  const [oracle, oracleTxHash] = await createOracle(
    client,
    user,
    {
      name: "Switchboard OracleAccount",
      authority: user.address(),
      metadata: "metadata",
      queue: queue.address,
      coinType: "0x1::aptos_coin::AptosCoin",
    },
    SWITCHBOARD_ADDRESS
  );

  console.log(await oracle.loadData());

  console.log(`Oracle ${oracle.address} created. tx hash: ${oracleTxHash}`);

  // first heartbeat
  const heartbeatTxHash = await oracle.heartbeat(user);
  console.log("First Heartbeat Tx Hash:", heartbeatTxHash);

  // heartbeat every 30 seconds
  setInterval(async () => {
    try {
      const heartbeatTxHash = await oracle.heartbeat(user);
      console.log("Heartbeat Tx Hash:", heartbeatTxHash);
    } catch (e) {
      console.log("failed heartbeat");
    }
  }, 30000);

  // create crank to catch aggregator push
  const [crank, txhash] = await CrankAccount.init(
    client,
    user,
    {
      queueAddress: queue.address,
      coinType: "0x1::aptos_coin::AptosCoin",
    },
    SWITCHBOARD_ADDRESS
  );
  console.log(`Created crank at ${crank.address}, tx hash ${txhash}`);

  // Make JobAccount data for btc price
  const serializedJob1 = Buffer.from(
    OracleJob.encodeDelimited(
      OracleJob.create({
        tasks: [
          {