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
  "0x11fb