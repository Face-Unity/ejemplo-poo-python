import { AptosClient, AptosAccount, HexString } from "aptos";
import {
  Permission,
  SwitchboardPermission,
  AggregatorAccount,
  CrankAccount,
  LeaseAccount,
} from "../lib/cjs";
import * as YAML from "yaml";
import * as fs from "fs";
import Big from "big.js";

const NODE_URL = "https