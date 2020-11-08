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
     