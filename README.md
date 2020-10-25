<div align="center">
  <a href="#">
    <img height="170" src="https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.svg" />
  </a>

  <h1>Switchboard V2</h1>

  <p>A collection of libraries and examples for interacting with Switchboard V2 on Aptos.</p>

  <p>
	  <a href="https://www.npmjs.com/package/@switchboard-xyz/aptos.js">
      <img alt="NPM Badge" src="https://img.shields.io/github/package-json/v/switchboard-xyz/sbv2-aptos?color=red&filename=javascript%2Faptos.js%2Fpackage.json&label=%40switchboard-xyz%2Faptos.js&logo=npm">
    </a>
  </p>

  <p>
    <a href="https://discord.gg/switchboardxyz">
      <img alt="Discord" src="https://img.shields.io/discord/841525135311634443?color=blueviolet&logo=discord&logoColor=white">
    </a>
    <a href="https://twitter.com/switchboardxyz">
      <img alt="Twitter" src="https://img.shields.io/twitter/follow/switchboardxyz?label=Follow+Switchboard" />
    </a>
  </p>

  <h4>
    <strong>Documentation: </strong><a href="https://docs.switchboard.xyz">docs.switchboard.xyz</a>
  </h4>
</div>

## Getting Started

To get started, clone the
[sbv2-aptos](https://github.com/switchboard-xyz/sbv2-aptos) repository.

```bash
git clone https://github.com/switchboard-xyz/sbv2-aptos
```

Then install the dependencies

```bash
cd sbv2-aptos
pnpm install
```

## Program IDs

| **Network** | **Program ID**                                                       |
| ----------- | -------------------------------------------------------------------- |
| Mainnet     | `0x7d7e436f0b2aafde60774efb26ccc432cf881b677aca7faaf2a01879bd19fb8`  |
| Testnet     | `0xb91d3fef0eeb4e685dc85e739c7d3e2968784945be4424e92e2f86e2418bf271` |

See [switchboard.xyz/explorer](https://switchboard.xyz/explorer) for a list of
feeds deployed on Aptos.

See [app.switchboard.xyz](https://app.switchboard.xyz) to create your own Aptos
feeds.

## Libraries

| **Lang** | **Name**                                                                                                                                                                                            | **Description**                                            |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Move     | [switchboard](/move/switchboard/)                                                                                                                                                                   | Move module to deserialize and read Switchboard data feeds |
| JS       | [@switchboard-xyz/aptos.js](/javascript/aptos.js/) <br />[[npmjs](https://www.npmjs.com/package/@switchboard-xyz/aptos.js), [Typedocs](https://docs.switchboard.xyz/api/@switchboard-xyz/aptos.js)] | Typescript package to interact with Switchboard V2         |

## Example Programs

- [feed-parser](/programs/feed-parser/): Read a Switchboard feed on Aptos

## Troubleshooting

1. File a
   [GitHub Issue](https://github.com/switchboard-xyz/sbv2-aptos/issues/new)
2. Ask a question in
   [Discord #dev-support](https://discord.com/channels/841525135311634443/984343400377647144)

<!--


## Live Deployment:

We're currently on Aptos Testnet and Devnet at address `0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77`. For the simplest way to create and manage Switchboard feeds on Aptos, check out our [publisher](https://app.switchboard.xyz).

Our automated updates will be live again by Monday (Oct 3).

## Install

```
npm i --save @switchboard-xyz/aptos.js
```

## Creating Feeds

```ts
import { Buffer } from "buffer";
import { AptosClient, AptosAccount, FaucetClient, HexString } from "aptos";
import {
  AptosEvent,
  EventCallback,
  OracleJob,
  createFeed,
} from "@switchboard-xyz/aptos.js";
import Big from "big.js";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const SWITCHBOARD_ADDRESS =
  "0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77";

const SWITCHBOARD_QUEUE_ADDRESS =
  "0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77";

const SWITCHBOARD_CRANK_ADDRESS =
  "0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77";

const client = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

// create new user
let user = new AptosAccount();

await faucetClient.fundAccount(user.address(), 50000);
console.log(`User account ${user.address().hex()} created + funded.`);

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
    queueAddress: SWITCHBOARD_QUEUE_ADDRESS, // account with OracleQueue resource
    crankAddress: SWITCHBOARD_CRANK_ADDRESS, // account with Crank resource
    batchSize: 1, // number of oracles to respond to each round
    minJobResults: 1, // minimum # of jobs that need to return a result
    minOracleResults: 1, // minumum # of oracles that need to respond for a result
    minUpdateDelaySeconds: 5, // minimum delay between rounds
    coinType: "0x1::aptos_coin::AptosCoin", // CoinType of the queue (now only AptosCoin)
    initialLoadAmount: 1000, // load of the lease
    jobs: [
      {
        name: "BTC/USD",
        metadata: "binance",
        authority: user.address().hex(),
        data: serializedJob.toString("base64"), // jobs need to be base64 encoded strings
        weight: 1,
      },
    ],
  },
  SWITCHBOARD_ADDRESS
);

console.log(
  `Created Aggregator and Lease resources at account address ${aggregator.address}. Tx hash ${createFeedTx}`
);

// Manually trigger an update
await aggregator.openRound(user);
```

### Listening to Updates

```ts
/**
 * Listen to Aggregator Updates Off-Chain
 */

// create event listener
const onAggregatorUpdate = (
  client: AptosClient,
  callback: EventCallback,
  pollIntervalMs: number = 1000
) Promise<AptosEvent> => {
  return AggregatorAccount.watch(
    client,
    SWITCHBOARD_ADDRESS,
    callback,Yeah
    pollIntervalMs
  );
};

// initialize event listener
const updatePoller = await onAggreg