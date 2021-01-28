
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
      HexString.ensure(parsedYaml.profiles.default.private_key).toUint8Array()
    );
  } catch (e) {
    console.log(e);
  }

  //await faucetClient.fundAccount(user.address(), 5000);

  console.log(`User account ${user.address().hex()} funded.`);

  // // user will be authority
  // await faucetClient.fundAccount(
  //   HexString.ensure(SWITCHBOARD_ADDRESS),
  //   5000000000
  // );

  let queue: any;
  try {
    const [q, queueTxSig] = await OracleQueueAccount.init(
      client,
      user,
      {
        name: "queue",
        metadata: "",
        authority: user.address(),
        oracleTimeout: 30000,
        reward: 1100 * 1000, // base reward
        // everything else is added on top
        save_confirmation_reward: 2000 * 1000,
        save_reward: 850 * 1000,
        open_round_reward: 200 * 1000,
        minStake: 0,
        slashingEnabled: false,
        varianceToleranceMultiplierValue: 0,
        varianceToleranceMultiplierScale: 0,
        feedProbationPeriod: 0,
        consecutiveFeedFailureLimit: 0,
        consecutiveOracleFailureLimit: 0,
        unpermissionedFeedsEnabled: true,
        unpermissionedVrfEnabled: true,
        lockLeaseFunding: false,
        enableBufferRelayers: false,
        maxSize: 1000,
        coinType: "0x1::aptos_coin::AptosCoin",
      },
      SWITCHBOARD_ADDRESS
    );
    console.log(`Queue: ${q.address}, tx: ${queueTxSig}`);
    queue = q;
  } catch (e) {
    console.log(e);
    queue = new OracleQueueAccount(
      client,
      user.address().hex(),
      SWITCHBOARD_ADDRESS
    );

    /**
     *
     *
     */
    try {
      await queue.setConfigs(user, {
        name: "queue",
        metadata: "nothing to see here",
        authority: user.address().hex(),
        oracleTimeout: 30000,
        reward: 1100 * 1000, // base reward
        // everything else is added on top
        save_confirmation_reward: 2000 * 1000,
        save_reward: 850 * 1000,
        open_round_reward: 200 * 1000,
        minStake: 0,
        slashingEnabled: false,
        varianceToleranceMultiplierValue: 0,
        varianceToleranceMultiplierScale: 0,
        feedProbationPeriod: 0,
        consecutiveFeedFailureLimit: 0,
        consecutiveOracleFailureLimit: 0,
        unpermissionedFeedsEnabled: true,
        unpermissionedVrfEnabled: true,
        lockLeaseFunding: false,
        enableBufferRelayers: false,
        maxSize: 1000,
        coinType: "0x1::aptos_coin::AptosCoin",
      });
    } catch (e) {
      console.log(e);
    }
  }
  return;
  let oracle;
  try {
    const [o, oracleTxHash] = await createOracle(
      client,
      user,
      {
        name: "Switchboard OracleAccount",
        authority: user.address(),
        metadata: "metadata",
        queue: queue.address,
        coinType: "0x1::aptos_coin::AptosCoin",
      },
      SWITCHBOARD_ADDRESS
    );
    oracle = o;
    console.log(`Oracle ${oracle.address} created. tx hash: ${oracleTxHash}`);
  } catch (e) {
    console.log(e);
    queue = new OracleQueueAccount(
      client,
      user.address().hex(),
      SWITCHBOARD_ADDRESS
    );
  }

  try {
    // trigger the oracle heartbeat
    const heartbeatTxSig = await oracle.heartbeat(user);
    console.log("Heartbeat Tx Hash:", heartbeatTxSig);
  } catch (e) {
    console.log("could not heartbeat");
  }

  let crank: any;

  try {
    const [c, txhash] = await CrankAccount.init(
      client,
      user,
      {
        queueAddress: queue.address,
        coinType: "0x1::aptos_coin::AptosCoin",
      },
      SWITCHBOARD_ADDRESS
    );
    console.log(`Created crank at ${crank.address}, tx hash ${txhash}`);
    crank = c;
  } catch (e) {
    console.log("Crank already created.");
    crank = new CrankAccount(client, SWITCHBOARD_ADDRESS, SWITCHBOARD_ADDRESS);
  }

  console.log("\n\n\n\n\n");

  console.log("Oracle", oracle.address);
  console.log("Crank", crank.address);
  console.log("OracleQueue", queue.address);
})();