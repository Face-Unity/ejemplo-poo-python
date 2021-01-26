
import { AptosClient, AptosAccount, FaucetClient, HexString } from "aptos";
import {
  OracleQueueAccount,
  CrankAccount,
  generateResourceAccountAddress,
  createOracle,
} from "../lib/cjs";
import * as YAML from "yaml";
import * as fs from "fs";

const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
const FAUCET_URL = "https://faucet.testnet.aptoslabs.com";

// const NODE_URL = "http://0.0.0.0:8080/v1";
// const FAUCET_URL = "0.0.0.0:8081/";

const SWITCHBOARD_ADDRESS =
  "0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77";

// run it all at once
(async () => {
  // INFRA ------
  const client = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

  let user;

  // if file extension ends with yaml
  try {
    const parsedYaml = YAML.parse(
      fs.readFileSync("../.aptos/config.yaml", "utf8")
    );
    user = new AptosAccount(