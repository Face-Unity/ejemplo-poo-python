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
    const