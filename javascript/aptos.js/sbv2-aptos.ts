#!/usr/bin/env ts-node-esm

/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
import * as YAML from "yaml";
import * as fs from "fs";
import * as path from "path";

import chalk from "chalk";
import { AptosAccount, AptosClient, FaucetClient, HexString } from "aptos";
import {
  AggregatorAccount,
  JobAccount,
  OracleAccount,
  OracleQueueAccount,
  StateAccount,
  CrankAccount,
  SWITCHBOARD_DEVNET_ADDRESS,
} from "./src";
import { OracleJob } from "@switchboard-xyz/common";

export const CHECK_ICON = chalk.green("\u2714");
export const FAILED_ICON = chalk.red("\u2717");

yargs(hideBin(process.argv))
  .scriptName("sbv2-aptos")
  .command(
    "create-account",
    "create an Aptos account and save to fs",
    (y: any) => {
      return y;
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, pid, stateAddress } = argv;

      const client = new AptosClient(rpcUrl);
      const faucet = new FaucetClient(
        "https://fullnode.devnet.aptoslabs.com/v1",
        "https://faucet.devnet.aptoslabs.com"
      );

      const account = new AptosAccount();

      await faucet.fundAccount(account.address(), 5000);

      console.log(`Account: ${account.address()}`);
      console.log(`Balance: ${await loadBalance(client, account.address())}`);

      saveAptosAccount(account, keypair, true);

      process.exit(0);
    }
  )
  .command(
    "print-aggregator [aggregatorHex]",
    "print an aggregator account",
    (y: any) => {
      return y.positional("aggregatorHex", {
        type: "string",
        describe: "hexString of the aggregator to print",
        required: true,
      });
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, aggregatorHex, pid, stateAddress } =
        argv;

      const { client, faucet, account, state } = await loadCli(
        rpcUrl,
        faucetUrl,
        pid,
        stateAddress,
        keypair
      );

      const aggregatorHexString = new HexString(aggregatorHex);
      const aggregator = new AggregatorAccount(
        client,
        aggregatorHexString,
        pid,
        stateAddress
      );
      const aggregatorState = await aggregator.loadData();

      process.exit(0);
    }
  )
  .command(
    "address",
    "print the hex address of the keypair",
    (y: any) => {
      return y;
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, numAirdrops } = argv;
      const client = new AptosClient(rpcUrl);
      const account = loadAptosAccount(keypair);
      console.log(`Address: ${account.address()}`);
      console.log(`Balance: ${await loadBalance(client, account.address())}`);
      process.exit(0);
    }
  )
  .command(
    "airdrop",
    "request from faucet",
    (y: any) => {
      return y.option("numAirdrops", {
        type: "number",
        describe: "number of airdrops to request",
        demand: false,
        default: 2,
      });
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, numAirdrops, pid, stateAddress } =
        argv;

      const { client, faucet, account, state } = await loadCli(
        rpcUrl,
        faucetUrl,
        pid,
        stateAddress,
        keypair
      );

      for await (const _ of new Array(numAirdrops)) {
        await faucet.fundAccount(account.address(), 50_000);
      }

      console.log(`Address: ${account.address()}`);
      console.log(`Balance: ${await loadBalance(client, account.address())}`);

      process.exit(0);
    }
  )
  .command(
    "create-state",
    "create a state account",
    (y: any) => {
      return y;
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, pid, stateAddress } = argv;

      const { client, faucet, account } = await loadCli(
        rpcUrl,
        faucetUrl,
        pid,
        stateAddress,
        keypair
      );

      const stateAccount = new AptosAccount();
      await faucet.fundAccount(stateAccount.address(), 10000);
      await faucet.fundAccount(stateAccount.address(), 10000);
      await faucet.fundAccount(stateAccount.address(), 10000);
      console.log(
        `Balance: ${await loadBalance(client, stateAccount.address())}`
      );

      const [state, sig] = await StateAccount.init(client, stateAccount, pid);
      console.log(`Signature: ${sig}`);
      console.log(`State: ${stateAccount.address()}`);

      saveAptosAccount(
        stateAccount,
        `state-${new Date().toJSON().slice(0, 10)}-${stateAccount.address}.json`
      );

      console.log(`stateAccount: ${stateAccount.address()}`);

      try {
        const stateData = await state.loadData();
        console.log(JSON.stringify(stateData, undefined, 2));
      } catch (error) {
        console.error(`Error fetching state data: ${error}`);
      }

      process.exit(0);
    }
  )
  .command(
    "create-queue",
    "create an oracle queue",
    (y: any) => {
      return y;
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, pid, stateAddress } = argv;

      const { client, faucet, account, state } = await loadCli(
        rpcUrl,
        faucetUrl,
        pid,
        stateAddress,
        keypair
      );

      const queueAccount = new AptosAccount();
      await faucet.fundAccount(queueAccount.address(), 5000);
      await faucet.fundAccount(queueAccount.address(), 5000);

      const [queue, sig] = await OracleQueueAccount.init(
        client,
        queueAccount,
        {
          name: "queue",
          metadata: "",
          authority: account.address().hex(),
          oracleTimeout: 180,
          reward: 0,
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
          maxSize: 10,
          coinType: "0x1::aptos_coin::AptosCoin",
        },
        pid
      );

      console.log(`Signature: ${sig}`);
      console.log(`Queue: ${queue.address}`);

      saveAptosAccount(
        queueAccount,
        `queue-${new Date().toJSON().slice(0, 10)}-${queueAccount.address}.json`
      );

      console.log(`queueAccount: ${queueAccount.address()}`);

      try {
        const queueData = await queue.loadData();
        console.log(JSON.stringify(queueData, undefined, 2));
      } catch (error) {
        console.error(`Error fetching queue data: ${error}`);
      }

      process.exit(0);
    }
  )
  .command(
    "create-oracle [queueHex]",
    "action",
    (y: any) => {
      return y.positional("queueHex", {
        type: "string",
        describe: "hexString of the oracle queue to join",
        required: true,
      });
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, queueHex, pid, stateAddress } = argv;

      const { client, faucet, account, state } = await loadCli(
        rpcUrl,
        faucetUrl,
        pid,
        stateAddress,
        keypair
      );

      const queueHexString = new HexString(queueHex);
      const queue = new OracleQueueAccount(
        client,
        queueHexString,
        pid,
        stateAddress
      );
      const oracleAccount = new AptosAccount();
      await faucet.fundAccount(oracleAccount.address(), 5000);

      console.log(`authority = ${account.address()}`);

      const [oracle, sig] = await OracleAccount.init(
        client,
        oracleAccount,
        {
          name: "TestOracle",
          metadata: "Testing123",
          authority: account.address(),
          queue: queueHexString,
          coinType: "0x1::aptos_coin::AptosCoin",
        },
        pid
      );

      console.log(`Signature: ${sig}`);
      console.log(`Oracle: ${oracle.address}`);
      console.log(`oracleAccount: ${oracleAccount.address()}`);

      saveAptosAccount(
        oracleAccount,
        `oracle-${new Date()
          .toJSON()
          .slice(0, 10)}-${oracleAccount.address()}.json`
      );

      try {
        const oracleData = await oracle.loadData();
        console.log(JSON.stringify(oracleData, undefined, 2));
      } catch (error) {
        console.error(`Error fetching oracle data: ${error}`);
      }

      process.exit(0);
    }
  )
  .command(
    "create-crank [queueHex]",
    "action",
    (y: any) => {
      return y.positional("queueHex", {
        type: "string",
        describe: "hexString of the oracle queue to join",
        required: true,
      });
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, queueHex, pid, stateAddress } = argv;

      const { client, faucet, account, state } = await loadCli(
        rpcUrl,
        faucetUrl,
        pid,
        stateAddress,
        keypair
      );

      const queueHexString = new HexString(queueHex);
      const queue = new OracleQueueAccount(
        client,
        queueHexString,
        pid,
        stateAddress
      );
      const crankAccount = new AptosAccount();
      await faucet.fundAccount(crankAccount.address(), 5000);

      console.log(`authority = ${account.address()}`);

      const [crank, sig] = await CrankAccount.init(
        client,
        crankAccount,
        {
          queueAddress: HexString.ensure(queueHexString),
          coinType: "0x1::aptos_coin::AptosCoin",
        },
        pid
      );

      console.log(`Signature: ${sig}`);
      console.log(`Crank: ${crank.address}`);
      console.log(`crankAccount: ${crankAccount.address()}`);

      saveAptosAccount(
        crankAccount,
        `crank-${new Date()
          .toJSON()
          .slice(0, 10)}-${crankAccount.address()}.json`
      );

      try {
        const crankData = await crank.loadData();
        console.log(JSON.stringify(crankData, undefined, 2));
      } catch (error) {
        console.error(`Error fetching crank data: ${error}`);
      }

      process.exit(0);
    }
  )
  .command(
    "crank-push [crankHex] [aggregatorHex]",
    "action",
    (y: any) => {
      return [
        y.positional("crankHex", {
          type: "string",
          describe: "hexString of the crank",
          required: true,
        }),
        y.positional("aggregatorHex", {
          type: "string",
          describe: "hexString of the aggregator",
          required: true,
        }),
      ];
    },
    async function (argv: any) {
      const {
        rpcUrl,
        faucetUrl,
        keypair,
        crankHex,
        aggregatorHex,
        pid,
        stateAddress,
      } = argv;

      const { client, faucet, account, state } = await loadCli(
        rpcUrl,
        faucetUrl,
        pid,
        stateAddress,
        keypair
      );

      const crankHexString = new HexString(crankHex);
      const crank = new CrankAccount(client, crankHexString, pid, stateAddress);
      const aggregatorHexString = new HexString(aggregatorHex);
      const payer = new AptosAccount();
      await faucet.fundAccount(payer.address(), 10000);
      const aggregator = new AggregatorAccount(
        client,
        aggregatorHexString,
        pid,
        stateAddress
      );
      const sig = await crank.push(payer, {
        aggregatorAddress: HexString.ensure(aggregator.address).hex(),
      });
      console.log(sig);
      process.exit(0);
    }
  )
  .command(
    "create-aggregator [queueHex]",
    "action",
    (y: any) => {
      return y.positional("queueHex", {
        type: "string",
        describe: "hexString of the oracle queue to join",
        required: true,
      });
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, queueHex, pid, stateAddress } = argv;

      const { client, faucet, account, state } = await loadCli(
        rpcUrl,
        faucetUrl,
        pid,
        stateAddress,
        keypair
      );

      const queueHexString = new HexString(queueHex);
      const queue = new OracleQueueAccount(
        client,
        queueHexString,
        pid,
        stateAddress
      );

      const aggregatorAccount = new AptosAccount();
      await faucet.fundAccount(aggregatorAccount.address(), 15000);

      const [aggregator, aggregatorSig] = await AggregatorAccount.init(
        client,
        aggregatorAccount,
        {
          authority: account.address(),
          name: "BTC/USD",
          metadata: "Switchboard BTC/USD Feed",
          queueAddress: queue.address,
          crankAddress: SWITCHBOARD_DEVNET_ADDRESS, // same as testnetA
          batchSize: 1,
          minOracleResults: 1,
          minJobResults: 3,
          minUpdateDelaySeconds: 8,
          coinType: "0x1::aptos_coin::AptosCoin",
        },
        pid
      );
      console.log(`Aggregator Address: ${aggregator.address}`);
      console.log(`AggregatorAccount Signature: ${aggregatorSig}`);

      const job1 = await createJob(
        client,
        faucet,
        account,
        FTX_COM_BTC_USD_JOB,
        "Ftx BTC/USD",
        aggregator
      );

      const job2 = await createJob(
        client,
        faucet,
        account,
        COINBASE_BTC_USD_JOB,
        "Coinbase BTC/USD",
        aggregator
      );

      const job3 = await createJob(
        client,
        faucet,
        account,
        BINANCE_BTC_USD_JOB,
        "Binance BTC/USD",
        aggregator
      );
      const job4 = await createJob(
        client,
        faucet,
        account,
        BITFINEX_BTC_USD_JOB,
        "Bitfinex BTC/USD",
        aggregator
      );
      const job5 = await createJob(
        client,
        faucet,
        account,
        BITSTAMP_BTC_USD_JOB,
        "Bitstamp BTC/USD",
        aggregator
      );
      // const job6 = await createJob(
      //   client,
      //   faucet,
      //   account,
      //   KRAKEN_BTC_USD_JOB,
      //   "Kraken BTC/USD",
      //   aggregator
      // );
      // const job7 = await createJob(
      //   client,
      //   faucet,
      //   account,
      //   HUOBI_BTC_USD_JOB,
      //   "Huobi BTC/USD",
      //   aggregator
      // );
      // const job8 = await createJob(
      //   client,
      //   faucet,
      //   account,
      //   OKEX_BTC_USD_JOB,
      //   "Okex BTC/USD",
      //   aggregator
      // );

      saveAptosAccount(
        aggregatorAccount,
        `aggregator-${new Date().toJSON().slice(0, 10)}-${
          aggregator.address
        }.json`
      );

      try {
        const aggregatorData = await aggregator.loadData();
        console.log(JSON.stringify(aggregatorData, undefined, 2));
      } catch (error) {
        console.error(`Error fetching aggregator data: ${error}`);
      }

      process.exit(0);
    }
  )
  .command(
    "open-round [aggregatorHex]",
    "action",
    (y: any) => {
      return y.positional("aggregatorHex", {
        type: "string",
        describe: "hexString of the aggregator to call open round for",
        required: true,
      });
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, aggregatorHex, pid, stateAddress } =
        argv;

      const { client, faucet, account, state } = await loadCli(
        rpcUrl,
        faucetUrl,
        pid,
        stateAddress,
        keypair
      );

      const aggregatorHexString = new HexString(aggregatorHex);
      const aggregator = new AggregatorAccount(
        client,
        aggregatorHexString,
        pid,
        stateAddress
      );

      const payer = new AptosAccount();
      await faucet.fundAccount(payer.address(), 5000);
      const openRoundSig = await aggregator.openRound(payer);
      console.log(`OpenRound Signature: ${openRoundSig}`);

      process.exit(0);
    }
  )
  .command(
    "watch-aggregator [aggregatorHex]",
    "action",
    (y: any) => {
      return y.positional("aggregatorHex", {
        type: "string",
        describe: "hexString of the aggregator to call open round for",
        required: true,
      });
    },
    async function (argv: any) {
      const { rpcUrl, faucetUrl, keypair, aggregatorHex, pid, stateAddress } =
        argv;

      const { client, faucet, account, state } = await loadCli(
        rpcUrl,
        faucetUrl,
        pid,
        stateAddress
      );

      const aggregatorHexString = new HexString(aggregatorHex);
      const aggregator = new AggregatorAccount(
        client,
        aggregatorHexString,
        pid,
        stateAddress
      );

      const event = await aggregator.watch(async (event) => {
        console.log(`AggregatorAccount Updated @ ${Date.now()}`);
        console.log(JSON.stringify(event, undefined, 2));
      });

      // process.exit(0);
    }
  )
  .options({
    keypair: {
      type: "string",
      alias: "k",
      describe: "filesystem path to an AptosAccount keypair file",
      required: true,
    },
    rpcUrl: {
      type: "string",
      alias: "u",
      describe: "Alternative RPC URL",
      default: "https://fullnode.devnet.aptoslabs.com/v1/",
    },
    faucetUrl: {
      type: "string",
      describe: "Alternative Faucet URL",
      default: "https://faucet.devnet.aptoslabs.com",
    },
    pid: {
      type: "string",
      describe: "devnet program ID",
      default: SWITCHBOARD_DEVNET_ADDRESS,
    },
    stateAddress: {
      type: "string",
      describe: "state address",
      default: SWITCHBOARD_DEVNET_ADDRESS,
    },
  })
  .help().argv;

function loadAptosAccount(keypairPath: string): AptosAccount {
  const parseKeypairString = (fileString: string): AptosAccount => {
    // check if bytes
    const parsedFileString = fileString
      .trim()
      .replace(/\n/g, "")
      .replace(/\s/g, "");
    const bytesRegex = /^\[(\s)?[0-9]+((\s)?,(\s)?[0-9]+){31,}\]/g;
    if (bytesRegex.test(parsedFileString)) {
      return new AptosAccount(new Uint8Array(JSON.parse(parsedFileString)));
    }

    // check if hex
    const hexRegex = /^(0x|0X)?[a-fA-F0-9]{64}/g;
    if (hexRegex.test(parsedFileString)) {
      return new AptosAccount(
        new Uint8Array(HexString.ensure(parsedFileString).toUint8Array())
      );
    }

    // check if base64 encoded
    const base64Regex =
      /^(?:[A-Za-z\d+\/]{4})*(?:[A-Za-z\d+\/]{3}=|[A-Za-z\d+\/]{2}==)?/g;
    if (base64Regex.test(parsedFileString)) {
      return new AptosAccount(
        new Uint8Array(Buffer.from(parsedFileString, "base64"))
      );
    }

    // check if yaml file

    throw new Error(`Failed to derive secret key from input file`);
  };

  // if file extension ends with yaml
  if (keypairPath.endsWith(".yaml")) {
    try {
      const parsedYaml = YAML.parse(fs.readFileSync(keypairPath, "utf8"));
      if (
        "profiles" in parsedYaml &&
        "default" in parsedYaml.profiles &&
        "private_key" in parsedYaml.profiles.default
      ) {
        return new AptosAccount(
          HexString.ensure(
            parsedYaml.profiles.default.private_key
          ).toUint8Array()
        );
      }
    } catch {}
  }

  const fileString = fs.readFileSync(keypairPath, "utf-8");
  return parseKeypairString(fileString);
}

function saveAptosAccount(
  account: AptosAccount,
  keypairName: string,
  skipSwitchboardDir = false
) {
  const privateKeyObject = account.toPrivateKeyObject();

  const buffer = Buffer.from(privateKeyObject.privateKeyHex.slice(2), "hex");
  if (buffer.byteLength === 0) {
    throw new Error("buffer empty");
  }

  const outputDir = skipSwitchboardDir
    ? process.cwd()
    : path.join(process.cwd(), ".switchboard");

  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(
    path.join(outputDir, keypairName),
    `[${new Uint8Array(buffer).map((i) => Number(i)).toString()}]`,
    "utf-8"
  );
}

async function loadCli(
  rpcUrl: string,
  faucetUrl: string,
  pid: string,
  stateAddress: string,
  keypairPath?: string
): Promise<{
  client: AptosClient;
  account: AptosAccount;
  faucet: FaucetClient;
  state: StateAccount;
}> {
  const client = new AptosClient(rpcUrl);
  const faucet = new FaucetClient(
    "https://fullnode.devnet.aptoslabs.com/v1",
    "https://faucet.devnet.aptoslabs.com"
  );

  let account: AptosAccount;

  if (keypairPath) {
    account = loadAptosAccount(keypairPath);
  } else {
    account = new AptosAccount();
    await faucet.fundAccount(account.address(), 5000);
  }

  const state = new StateAccount(client, stateAddress, account, pid);

  return {
    client,
    faucet,
    account,
    state,
  };
}

async function loadBalance(
  client: AptosClient,
  addr: HexString
): Promise<string> {
  return (
    (
      await client.getAccountResource(
        addr,
        "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
      )
    ).data as any
  ).coin.value;
}

async function createAggregatorAccountFromJson(
  client: AptosClient,
  faucet: FaucetClient,
  authority: AptosAccount,
  jsonFilePath: string
) {}

async function createJob(
  client: AptosClient,
  faucet: FaucetClient,
  authority: AptosAccount,
  oracleJob: OracleJob,
  name: string,
  aggregator: AggregatorAccount
): Promise<JobAccount> {
  const jobAccount = new AptosAccount();
  await faucet.fundAccount(authority.address(), 5000);
  await faucet.fundAccount(jobAccount.address(), 5000);
  // await faucet.fundAccount(jobAccount.address(), 5000);

  const serializedJob = Buffer.from(
    OracleJob.encodeDelimited(oracleJob).finish()
  );

  const [job, jobSig] = await JobAccount.init(
    client,
    jobAccount,
    {
      name: name,
      metadata: name,
      authority: authority.address(),
      data: serializedJob.toString("hex"),
    },
    aggregator.switchboardAddress
  );
  console.log(`Job Address (${name}): ${job.address}`);
  console.log(`Job Signature (${name}): ${jobSig}`);

  const addJobSig = await aggregator.addJob(authority, {
    job: job.address,
  });
  console.log(`Add Job Signature (${name}): ${addJobSig}`);

  saveAptosAccount(
    jobAccount,
    `job-${new Date().toJSON().slice(0, 10)}-${job.address}.json`
  );

  return job;
}

const FTX_COM_BTC_USD_JOB = OracleJob.create({
  tasks: [
    {
      websocketTask: {
        url: "wss://ftx.com/ws/",
        subscription:
          '{"op":"subscribe","channel":"ticker","market":"BTC/USD"}',
        maxDataAgeSeconds: 15,
        filter:
          "$[?(@.type == 'update' && @.channel == 'ticker' && @.market == 'BTC/USD')]",
      },
    },
    {
      medianTask: {
        tasks: [
          {
            jsonParseTask: {
              path: "$.data.bid",
            },
          },
          {
            jsonParseTask: {
              path: "$.data.ask",
            },
          },
          {
            jsonParseTask: {
              path: "$.data.last",
            },
          },
        ],
      },
    },
  ],
});

const COINBASE_BTC_USD_JOB = OracleJob.create({
  tasks: [
    {
      websocketTask: {
        url: "wss://ws-feed.pro.coinbase.com",
        subscription:
          '{"type":"subscribe","product_ids":["BTC-USD"],"channels":["ticker",{"name":"ticker","product_ids":["BTC-USD"]}]}',
        maxDataAgeSeconds: 15,
        filter: "$[?(@.type == 'ticker' && @.product_id == 'BTC-USD')]",
      },
    },
    {
      jsonParseTask: {
        path: "$.price",
      },
    },
  ],
});

const BINANCE_BTC_USD_JOB = OracleJob.create({
  tasks: [
    {
      httpTask: {
        url: "https://www.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
      },
    },
    {
      jsonParseTask: {
        path: "$.price",
      },
    },
    {
      multiplyTask: {
        aggregatorPubkey: "ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9",
      },
    },
  ],
});

const BITFINEX_BTC_USD_JOB = OracleJob.create({
  tasks: [
    {
      httpTask: {
        url: "https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD",
      },
    },
    {
      medianTask: {
        tasks: [
          {
            jsonParseTask: {
              path: "$[0][1]",
            },
          },
          {
            jsonParseTask: {
              path: "$[0][3]",
            },
          },
          {
            jsonParseTask: {
              path: "$[0][7]",
            },
          },
        ],
      },
    },
  ],
});

const HUOBI_BTC_USD_JOB = OracleJob.create({
  tasks: [
    {
      httpTask: {
        url: "https://api.huobi.pro/market/detail/merged?symbol=btcusdt",
      },
    },
    {
      medianTask: {
        tasks: [
          {
            jsonParseTask: {
              path: "$.tick.bid[0]",
            },
          },
          {
            jsonParseTask: {
              path: "$.tick.ask[0]",
            },
          },
        ],
      },
    },
    {
      multiplyTask: {
        aggregatorPubkey: "ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9",
      },
    },
  ],
});

const BITSTAMP_BTC_USD_JOB = OracleJob.create({
  tasks: [
    {
      httpTask: {
        url: "https://www.bitstamp.net/api/v2/ticker/btcusd",
      },
    },
    {
      medianTask: {
        tasks: [
          {
            jsonParseTask: {
              path: "$.ask",
            },
          },
          {
            jsonParseTask: {
              path: "$.bid",
            },
          },
          {
            jsonParseTask: {
              path: "$.last",
            },
          },
        ],
      },
    },
  ],
});

const KRAKEN_BTC_USD_JOB = OracleJob.create({
  tasks: [
    {
      httpTask: {
        url: "https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD",
      },
    },
    {
      medianTask: {
        tasks: [
          {
            jsonParseTask: {
              path: "$.result.XXBTZUSD.a[0]",
            },
          },
          {
            jsonParseTask: {
              path: "$.result.XXBTZUSD.b[0]",
            },
          },
          {
            jsonParseTask: {
              path: "$.result.XXBTZUSD.c[0]",
            },
          },
        ],
      },
    },
  ],
});

const OKEX_BTC_USD_JOB = OracleJob.create({
  tasks: [
    {
      websocketTask: {
        url: "wss://ws.okex.com:8443/ws/v5/public",
        subscription:
          '{"op":"subscribe","args":[{"channel":"tickers","instId":"BTC-USDT"}]}',
        maxDataAgeSeconds: 15,
        filter:
          "$[?(@.event != 'subscribe' && @.arg.channel == 'tickers' && @.arg.instId == 'BTC-USDT' && @.data[0].instType == 'SPOT' && @.data[0].instId == 'BTC-USDT')]",
      },
    },
    {
      medianTask: {
        tasks: [
          {
            jsonParseTask: {
              path: "$.data[0].bidPx",
            },
          },
          {
            jsonParseTask: {
              path: "$.data[0].askPx",
            },
          },
          {
            jsonParseTask: {
              path: "$.data[0].last",
            },
          },
        ],
      },
    },
    {
      multiplyTask: {
        aggregatorPubkey: "ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9",
      },
    },
 