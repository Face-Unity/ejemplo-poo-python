
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
  createFeed,
  EventCallback,
  LeaseAccount,
  OracleJob,
  SWITCHBOARD_TESTNET_ADDRESS,
} from "@switchboard-xyz/aptos.js";
import { AptosAccount, AptosClient, FaucetClient } from "aptos";
import Big from "big.js";
import { Buffer } from "buffer";

const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
const FAUCET_URL = "https://faucet.testnet.aptoslabs.com";

const SWITCHBOARD_QUEUE_ADDRESS = SWITCHBOARD_TESTNET_ADDRESS;

const SWITCHBOARD_CRANK_ADDRESS = SWITCHBOARD_TESTNET_ADDRESS;

const onAggregatorUpdate = (
  client: AptosClient,
  cb: EventCallback,
  pollIntervalMs: number = 1000
): AptosEvent => {
  return AggregatorAccount.watch(
    client,
    SWITCHBOARD_TESTNET_ADDRESS,
    cb,
    pollIntervalMs
  );
};

// run it all at once
(async () => {
  // INFRA ------
  const client = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

  // create new user
  let user = new AptosAccount();

  await faucetClient.fundAccount(user.address(), 50000);
  console.log(`User account ${user.address().hex()} created + funded.`);

  const aggregator_acct = new AptosAccount();
  await faucetClient.fundAccount(aggregator_acct.address(), 50000);

  // Make Job data for btc price
  const serializedJob = Buffer.from(
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
      queueAddress: SWITCHBOARD_QUEUE_ADDRESS,
      batchSize: 1,
      minJobResults: 1,
      minOracleResults: 1,
      minUpdateDelaySeconds: 5,
      varianceThreshold: new Big(0),
      coinType: "0x1::aptos_coin::AptosCoin",
      crankAddress: SWITCHBOARD_CRANK_ADDRESS,
      initialLoadAmount: 1000,
      jobs: [
        {
          name: "BTC/USD",
          metadata: "binance",
          authority: user.address().hex(),
          data: serializedJob.toString("base64"),
          weight: 1,
        },
      ],
    },
    SWITCHBOARD_TESTNET_ADDRESS
  );

  console.log(
    `Created Aggregator and Lease resources at account address ${aggregator.address}. Tx hash ${createFeedTx}`
  );

  /**
   * Log Data Objects
   */
  console.log("logging all data objects");
  console.log("Aggregator:", await aggregator.loadData());
  console.log(
    "Lease:",
    await new LeaseAccount(
      client,
      aggregator.address,
      SWITCHBOARD_TESTNET_ADDRESS
    ).loadData(SWITCHBOARD_QUEUE_ADDRESS)
  );
  console.log("Load aggregator jobs data", await aggregator.loadJobs());
})();