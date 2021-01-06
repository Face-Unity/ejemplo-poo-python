import { AptosClient, AptosAccount, FaucetClient, HexString } from "aptos";
import {
  generateResourceAccountAddress,
  bcsAddressToBytes,
  createFeed,
} from "../lib/cjs";
import * as YAML from "yaml";
import * as fs from "fs";
import Big from "big.js";
import { aptBinance } from "./job_data/apt";
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

const NODE_URL = "https://aptos-mainnet.nodereal.io/v1/baee52f0ce4f4dd0893fd6466659bd04/v1";

const SWITCHBOARD_ADDRESS =
  "0x7d7e436f0b2aafde60774efb26ccc432cf881b677aca7faaf2a01879bd19fb8";

const SWITCHBOARD_QUEUE_ADDRESS =
  "0x11fbd91e4a718066891f37958f0b68d10e720f2edf8d57854fb20c299a119a8c";

const SWITCHBOARD_CRANK_ADDRESS =
  "0xbc9576fedda51d33e8129b5f122ef4707c2079dfb11cd836e86adcb168cbd473";

// run it all at once
(async () => {
  // INFRA ------
  const client = new AptosClient(NODE_URL);

  // if file extension ends with yaml
  const parsedYaml = YAML.parse(
    fs.readFileSync("../.aptos/config.yaml", "utf8")
  );
  const user = new AptosAccount(
    HexString.ensure(parsedYaml.profiles.default.private_key).toUint8Array()
  );
  const program = new AptosAccount(
    HexString.ensure(parsedYaml.profiles.default.private_key).toUint8Array()
  );
  // const permissioned = new AptosAccount(
  // HexString.ensure(
  // parsedYaml.profiles.permissioned.private_key
  // ).toUint8Array()
  // );
  // const permissionless = new AptosAccount(
  // HexString.ensure(
  // parsedYaml.profiles.permissioned.private_key
  // ).toUint8Array()
  // );

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
        batchSize: 3,
        minJobResults: 2,
        minOracleResults: 3,
        minUpdateDelaySeconds: 10,
        varianceThreshold: new Big(1),
        forceReportPeriod: 180,
        coinType: "0x1::aptos_coin::AptosCoin",
        crankAddress: SWITCHBOARD_CRANK_ADDRESS,
        initialLoadAmount: 0,
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
        batchSize: 3,
        minJobResults: 2,
        minOracleResults: 3,
        minUpdateDelaySeconds: 10,
        varianceThreshold: new Big(1),
        forceReportPeriod: 180,
        coinType: "0x1::aptos_coin::AptosCoin",
        crankAddress: SWITCHBOARD_CRANK_ADDRESS,
        initialLoadAmount: 0,
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
        batchSize: 3,
        minJobResults: 2,
        minOracleResults: 3,
        minUpdateDelaySeconds: 10,
        varianceThreshold: new Big(1),
        forceReportPeriod: 180,
        coinType: "0x1::aptos_coin::AptosCoin",
        crankAddress: SWITCHBOARD_CRANK_ADDRESS,
        initialLoadAmount: 0,
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
        batchSize: 3,
        minJobResults: 2,
        minOracleResults: 3,
        minUpdateDelaySeconds: 10,
        varianceThreshold: new Big(1),
        forceReportPeriod: 180,
        coinType: "0x1::aptos_coin::AptosCoin",
        crankAddress: SWITCHBOARD_CRANK_ADDRESS,
        initialLoadAmount: 0,
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
