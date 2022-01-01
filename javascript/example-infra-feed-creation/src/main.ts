
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
  SWITCHBOARD_DEVNET_ADDRESS,
} from "@switchboard-xyz/aptos.js";
import { AptosAccount, AptosClient, FaucetClient, HexString } from "aptos";
import Big from "big.js";
import { Buffer } from "buffer";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const SWITCHBOARD_ADDRESS = SWITCHBOARD_DEVNET_ADDRESS;

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
  await faucetClient.fundAccount(user.address(), 50000000);
  console.log(`User account ${user.address().hex()} created + funded.`);

  const [queue, queueTxHash] = await OracleQueueAccount.init(
    client,
    user,
    {
      name: "Switch Queue",
      metadata: "Nothing to see here",
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
            httpTask: {
              url: "https://www.binance.us/api/v3/ticker/price?symbol=BTCUSD",
            },
          },
          {
            jsonParseTask: {
              path: "$.price",
            },
          },
        ],
      })
    ).finish()
  );

  const [aggregator, createFeedTx] = await createFeed(
    client,
    user,
    {
      authority: user.address(),
      queueAddress: queue.address,
      batchSize: 1,
      minJobResults: 1,
      minOracleResults: 1,
      minUpdateDelaySeconds: 5,
      startAfter: 0,
      varianceThreshold: new Big(0),
      forceReportPeriod: 0,
      expiration: 0,
      coinType: "0x1::aptos_coin::AptosCoin",
      crankAddress: user.address().hex(),
      initialLoadAmount: 1000,
      jobs: [
        {
          name: "BTC/USD",
          metadata: "binance",
          authority: user.address().hex(),
          data: serializedJob1.toString("base64"),
          weight: 1,
        },
      ],
    },
    SWITCHBOARD_ADDRESS
  );

  console.log(
    `Created AggregatorAccount and LeaseAccount resources at account address ${aggregator.address}. Tx hash ${createFeedTx}`
  );

  const updatePoller = onAggregatorUpdate(client, async (e) => {
    console.log(`NEW RESULT:`, e.data);
  });

  const onOpenRoundPoller = onAggregatorOpenRound(client, async (e) => {
    console.log(e);
    try {
      // only handle updates for this aggregator
      if (e.data.aggregator_address !== aggregator.address) {
        return;
      }

      const agg = new AggregatorAccount(
        client,
        e.data.aggregator_address,
        SWITCHBOARD_ADDRESS
      );

      const aggregatorData = await agg.loadData();

      // The event data includes JobAccount Pubkeys, so grab the JobAccount Data
      const jobs: OracleJob[] = await Promise.all(
        e.data.job_keys.map(async (jobKey: string) => {
          const job = new JobAccount(client, jobKey, SWITCHBOARD_ADDRESS);
          const jobData = await job.loadJob().catch((e) => {
            console.log(e);
          });
          return jobData;
        })
      );

      // simulate a fetch
      const response = await fetch(`https://api.switchboard.xyz/api/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobs }),
      });

      if (!response.ok) console.error(`[Task runner] Error testing jobs json.`);
      try {
        const json = await response.json();

        // try save result
        const tx = await aggregator.saveResult(user, {
          oracleAddress: oracle.address,
          oracleIdx: 0,
          error: false,
          value: new Big(json.result),
          jobsChecksum: Buffer.from(aggregatorData.jobsChecksum).toString(
            "hex"
          ),
          minResponse: new Big(json.result),
          maxResponse: new Big(json.result),
        });
        console.log("save result tx:", tx);
      } catch (e) {} // errors will happen when task runner returns them
    } catch (e) {
      console.log("open round resp fail");
    }
  });

  /**
   * Log Data Objects
   */
  console.log("logging all data objects");
  console.log("AggregatorAccount:", await aggregator.loadData());
  console.log(
    "LeaseAccount:",
    await new LeaseAccount(
      client,
      aggregator.address,
      SWITCHBOARD_ADDRESS
    ).loadData(queue.address)
  );
  console.log("Load aggregator jobs data", await aggregator.loadJobs());

  console.log(
    await fetchAggregators(client, user.address().hex(), SWITCHBOARD_ADDRESS)
  );

  setInterval(() => {
    try {
      aggregator.openRound(user);
      console.log("opening round");
    } catch (e) {
      console.log("failed open round");
    }