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
export