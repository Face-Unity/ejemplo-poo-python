
import { AptosClient, AptosAccount, FaucetClient, HexString } from "aptos";
import {
  generateResourceAccountAddress,
  bcsAddressToBytes,
  createFeed,
} from "../lib/cjs";
import * as YAML from "yaml";
import * as fs from "fs";
import Big from "big.js";
import {
  btcBinance,
  btcBitfinex,
  btcCoinbase,
  btcFtx,
  btcKraken,
} from "./job_data/btc";
import {
  ethBinance,
  ethBitfinex,
  ethCoinbase,
  ethFtx,
  ethKraken,
} from "./job_data/eth";
import {
  nearBinance,
  nearBitfinex,
  nearCoinbase,
  nearFtx,
} from "./job_data/near";
import { solBinance, solBitfinex, solFtx, solFtxus } from "./job_data/sol";
import {
  usdcBinance,
  usdcBitstamp,
  usdcBittrex,
  usdcKraken,
} from "./job_data/usdc";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const SWITCHBOARD_ADDRESS =
  "0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77";

const SWITCHBOARD_QUEUE_ADDRESS =
  "0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77";

const SWITCHBOARD_CRANK_ADDRESS =
  "0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77";

// run it all at once
(async () => {
  // INFRA ------
  const client = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

  let user: AptosAccount | null = null;

  // if file extension ends with yaml
  try {
    const parsedYaml = YAML.parse(
      fs.readFileSync("../.aptos/config.yaml", "utf8")
    );
    user = new AptosAccount(
      HexString.ensure(parsedYaml.profiles.default.private_key).toUint8Array()
    );
  } catch (e) {
    console.log(e);
  }

  if (user === null) {
    throw new Error("User not found!");
  }

  const FEED_KEY_1 = generateResourceAccountAddress(
    user.address(),
    bcsAddressToBytes(HexString.ensure("0x1"))
  );

  const FEED_KEY_2 = generateResourceAccountAddress(
    user.address(),
    bcsAddressToBytes(HexString.ensure("0x2"))
  );

  const FEED_KEY_3 = generateResourceAccountAddress(
    user.address(),
    bcsAddressToBytes(HexString.ensure("0x3"))
  );

  const FEED_KEY_4 = generateResourceAccountAddress(
    user.address(),
    bcsAddressToBytes(HexString.ensure("0x4"))
  );

  const FEED_KEY_5 = generateResourceAccountAddress(
    user.address(),
    bcsAddressToBytes(HexString.ensure("0x5"))
  );

  /**
   * BTC
   */

  try {
    const [aggregator, createFeedTx] = await createFeed(
      client,
      user,
      {
        name: "BTC/USD",
        authority: user.address(),
        queueAddress: SWITCHBOARD_QUEUE_ADDRESS,
        batchSize: 1,
        minJobResults: 2,
        minOracleResults: 1,
        minUpdateDelaySeconds: 10,
        varianceThreshold: new Big(0),
        coinType: "0x1::aptos_coin::AptosCoin",
        crankAddress: SWITCHBOARD_CRANK_ADDRESS,
        initialLoadAmount: 100_000,
        seed: "0x1",
        jobs: [
          {
            name: "BTC/USD binance",
            metadata: "binance",
            authority: user.address().hex(),
            data: btcBinance.toString("base64"),
            weight: 1,
          },
          {
            name: "BTC/USD bitfinex",
            metadata: "bitfinex",
            authority: user.address().hex(),
            data: btcBitfinex.toString("base64"),
            weight: 1,
          },
          {
            name: "BTC/USD coinbase",
            metadata: "coinbase",
            authority: user.address().hex(),
            data: btcCoinbase.toString("base64"),
            weight: 1,
          },
          {
            name: "BTC/USD ftx",
            metadata: "ftx",
            authority: user.address().hex(),
            data: btcFtx.toString("base64"),
            weight: 1,
          },
          {
            name: "BTC/USD kraken",
            metadata: "kraken",
            authority: user.address().hex(),
            data: btcKraken.toString("base64"),
            weight: 1,
          },
        ],
      },
      SWITCHBOARD_ADDRESS
    );
    console.log("made btc feed", aggregator.address);
  } catch (e) {
    console.log(`couldn't make btc feed`, e);
  }

  /**
   * ETH
   */
  try {
    const [aggregator, createFeedTx] = await createFeed(
      client,
      user,
      {
        name: "ETH/USD",
        authority: user.address(),
        queueAddress: SWITCHBOARD_QUEUE_ADDRESS,
        batchSize: 1,
        minJobResults: 2,
        minOracleResults: 1,
        minUpdateDelaySeconds: 10,
        varianceThreshold: new Big(0),
        coinType: "0x1::aptos_coin::AptosCoin",
        crankAddress: SWITCHBOARD_CRANK_ADDRESS,
        initialLoadAmount: 100_000,
        seed: "0x2",
        jobs: [
          {
            name: "ETH/USD binance",
            metadata: "binance",
            authority: user.address().hex(),
            data: ethBinance.toString("base64"),
            weight: 1,
          },
          {
            name: "ETH/USD bitfinex",
            metadata: "bitfinex",
            authority: user.address().hex(),
            data: ethBitfinex.toString("base64"),
            weight: 1,
          },
          {
            name: "ETH/USD coinbase",
            metadata: "coinbase",
            authority: user.address().hex(),
            data: ethCoinbase.toString("base64"),
            weight: 1,
          },
          {
            name: "ETH/USD ftx",
            metadata: "ftx",
            authority: user.address().hex(),
            data: ethFtx.toString("base64"),
            weight: 1,
          },
          {
            name: "ETH/USD Kraken",
            metadata: "kraken",
            authority: user.address().hex(),
            data: ethKraken.toString("base64"),
            weight: 1,
          },
        ],
      },
      SWITCHBOARD_ADDRESS
    );
    console.log("made eth feed", aggregator.address);
  } catch (e) {
    console.log(`couldn't make eth feed`, e);
  }

  /**
   * SOL
   */
  try {
    const [aggregator, createFeedTx] = await createFeed(
      client,
      user,
      {
        authority: user.address(),
        queueAddress: SWITCHBOARD_QUEUE_ADDRESS,
        batchSize: 1,
        minJobResults: 2,
        minOracleResults: 1,
        minUpdateDelaySeconds: 10,
        varianceThreshold: new Big(0),
        coinType: "0x1::aptos_coin::AptosCoin",
        crankAddress: SWITCHBOARD_CRANK_ADDRESS,
        initialLoadAmount: 100_000,
        seed: "0x3",
        jobs: [
          {
            name: "SOL/USD binance",
            metadata: "binance",
            authority: user.address().hex(),
            data: solBinance.toString("base64"),
            weight: 1,
          },
          {
            name: "SOL/USD bitfinex",
            metadata: "bitfinex",
            authority: user.address().hex(),
            data: solBitfinex.toString("base64"),
            weight: 1,
          },
          {
            name: "SOL/USD ftx",
            metadata: "ftx",
            authority: user.address().hex(),
            data: solFtx.toString("base64"),
            weight: 1,
          },
          {
            name: "SOL/USD ftx us",
            metadata: "ftx us",
            authority: user.address().hex(),
            data: solFtxus.toString("base64"),
            weight: 1,
          },
        ],
      },
      SWITCHBOARD_ADDRESS
    );
    console.log("made sol feed", aggregator.address);
  } catch (e) {
    console.log(`couldn't make sol feed`, e);
  }

  /**
   * USDC
   */
  try {
    const [aggregator, createFeedTx] = await createFeed(
      client,
      user,
      {
        authority: user.address(),
        queueAddress: SWITCHBOARD_QUEUE_ADDRESS,
        batchSize: 1,
        minJobResults: 2,
        minOracleResults: 1,
        minUpdateDelaySeconds: 10,
        varianceThreshold: new Big(0),
        coinType: "0x1::aptos_coin::AptosCoin",
        crankAddress: SWITCHBOARD_CRANK_ADDRESS,
        initialLoadAmount: 100_000,
        seed: "0x4",
        jobs: [
          {
            name: "USDC/USD binance",
            metadata: "binance",
            authority: user.address().hex(),
            data: usdcBinance.toString("base64"),
            weight: 1,
          },
          {
            name: "USDC/USD bitstamp",
            metadata: "bitstamp",
            authority: user.address().hex(),
            data: usdcBitstamp.toString("base64"),
            weight: 1,
          },
          {
            name: "USDC/USD bittrex",
            metadata: "bittrex",
            authority: user.address().hex(),
            data: usdcBittrex.toString("base64"),
            weight: 1,
          },
          {
            name: "USDC/USD kraken",
            metadata: "kraken",
            authority: user.address().hex(),
            data: usdcKraken.toString("base64"),
            weight: 1,
          },
        ],
      },
      SWITCHBOARD_ADDRESS
    );
    console.log("made usdc feed", aggregator.address);
  } catch (e) {
    console.log(`couldn't make usdc feed`, e);
  }

  /**
   * NEAR
   */
  try {
    const [aggregator, createFeedTx] = await createFeed(
      client,
      user,
      {
        authority: user.address(),
        queueAddress: SWITCHBOARD_QUEUE_ADDRESS,
        batchSize: 1,
        minJobResults: 2,
        minOracleResults: 1,
        minUpdateDelaySeconds: 10,
        varianceThreshold: new Big(0),
        coinType: "0x1::aptos_coin::AptosCoin",
        crankAddress: SWITCHBOARD_CRANK_ADDRESS,
        initialLoadAmount: 100_000,
        seed: "0x5",
        jobs: [
          {
            name: "NEAR/USD near",
            metadata: "near",
            authority: user.address().hex(),
            data: nearBinance.toString("base64"),
            weight: 1,
          },
          {
            name: "NEAR/USD bitfinex",
            metadata: "bitfinex",
            authority: user.address().hex(),
            data: nearBitfinex.toString("base64"),
            weight: 1,
          },
          {
            name: "NEAR/USD coinbase",
            metadata: "coinbase",
            authority: user.address().hex(),
            data: nearCoinbase.toString("base64"),
            weight: 1,
          },
          {
            name: "NEAR/USD ftx",
            metadata: "ftx",
            authority: user.address().hex(),
            data: nearFtx.toString("base64"),
            weight: 1,
          },
        ],
      },
      SWITCHBOARD_ADDRESS
    );
    console.log("made near feed", aggregator.address);
  } catch (e) {
    console.log(`couldn't make near feed`, e);
  }

  console.log("BTC / USD", FEED_KEY_1);
  console.log("ETH / USD", FEED_KEY_2);
  console.log("SOL / USD", FEED_KEY_3);
  console.log("USDC / USD", FEED_KEY_4);
  console.log("NEAR / USD", FEED_KEY_5);
})();