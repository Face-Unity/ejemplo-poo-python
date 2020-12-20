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
} from "./job_data/e