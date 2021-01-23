import { AptosClient, AptosAccount, HexString, CoinClient } from "aptos";
import { Permission, SwitchboardPermission, sendAptosTx } from "../lib/cjs";
import * as YAML from "yaml";
import * as fs from "fs";
// const NODE_URL = "https://fullnode.mainnet.aptoslabs.com/v1";
// const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
const NODE_URL =
  "https://aptos-mainnet.nodereal.io/v1/74fd755ce23849fdb8562acf424d38cb/v1";
// TODO: MAKE THIS THE DEPLOYER ADDRESS
const SWITCHBOARD_ADDRESS =
  "0x7d7e436f0b2aafde60774efb26ccc432cf881b677aca7faaf2a01879bd19fb8";
// TODO: MAKE THIS THE AUTHORITY THAT WILL OWN THE ORACLE
const QUEUE_ADDRESS =
  "0x11fbd91e4a718066891f37958f0b68d10e720f2edf8d57854fb20c299a119