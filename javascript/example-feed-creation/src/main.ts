
/**
 * Creates a new account, inititalizes a Switchboard Resource Account on it
 *
 * Using that it should:
 *
 * DEMO --
 * Creates a new Aggregator
 * Creates a new Job (ftx btc/usd),
 * Adds Job to Aggregator
 * Push Aggregator to Crank
 */
import {
  AggregatorAccount,
  AptosEvent,
  createFeed,
  EventCallback,
  LeaseAccount,
  OracleJob,
  SWITCHBOARD_TESTNET_ADDRESS,
} from "@switchboard-xyz/aptos.js";
import { AptosAccount, AptosClient, FaucetClient } from "aptos";
import Big from "big.js";
import { Buffer } from "buffer";

const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
const FAUCET_URL = "https://faucet.testnet.aptoslabs.com";