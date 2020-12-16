
import { AptosClient, AptosAccount, HexString, CoinClient } from "aptos";
import { OracleQueueAccount, CrankAccount, sendAptosTx } from "../lib/cjs";
import * as YAML from "yaml";
import * as fs from "fs";

// const NODE_URL = "https://fullnode.mainnet.aptoslabs.com/v1";
const NODE_URL =
  "https://7023b384-9d18-4480-ba7a-bb629d724ae9:881b272ea3154b9dbb64b0bfe3878c9f@aptos-mainnet.nodereal.io/v1";
//const NODE_URL = "http://0.0.0.0:8080/v1";

// TODO: MAKE THIS THE DEPLOYER ADDRESS
const SWITCHBOARD_ADDRESS =
  "0x07d7e436f0b2aafde60774efb26ccc432cf881b677aca7faaf2a01879bd19fb8"; // (localnet)

// TODO: MAKE THIS THE AUTHORITY THAT WILL OWN THE QUEUES (authority of both permissioned and permissionless queues)
const QUEUE_AUTHORITY =
  "0xca62eccbbdb22b5de18165d0bdf2d7127569b91498f0a7f6944028793cef8137"; // (localnet)

const transfer = async (
  client: AptosClient,
  from: AptosAccount,
  to: AptosAccount,
  amount: number
) => {
  const payload = {
    type: "entry_function_payload",
    function: "0x1::aptos_account::transfer",
    type_arguments: [],
    arguments: [to.address().hex(), amount],
  };
  await sendAptosTx(
    client,
    from,
    payload.function,
    payload.arguments,
    payload.type_arguments
  );
};

(async () => {
  const client = new AptosClient(NODE_URL);

  let funder;

  // if file extension ends with yaml
  try {
    const parsedYaml = YAML.parse(
      fs.readFileSync("../.aptos/config.yaml", "utf8")
    );
    funder = new AptosAccount(
      HexString.ensure(parsedYaml.profiles.default.private_key).toUint8Array()
    );
  } catch (e) {
    console.log(e);
  }

  if (!funder) {
    throw new Error("Could not get funder account.");
  }

  const QUEUE_COST = 100_000_000; // octas per APT
  const CRANK_COST = 100_000_000; // octas per APT

  /*
    PERMISSIONLESS QUEUE 
  */
  let permissionless_queue: any;
  try {
    // CREATE QUEUE OWNER AND FUND 1 APT
    const queue_owner = new AptosAccount();
    fs.writeFileSync(
      `permissionless-queue-owner-keys-${queue_owner.address().hex()}`,
      JSON.stringify(queue_owner.toPrivateKeyObject())
    );
    await transfer(client, funder, queue_owner, QUEUE_COST);
    console.log(
      `Authority account ${queue_owner.address().hex()} funded for queue`
    );

    // Fallback in case we want to drop in a queue owner
    // const queue_owner = AptosAccount.fromAptosAccountObject({
    //     address: "0xe8012714cd17606cee7188a2a365eef3fe760be598750678c8c5954eb548a591",
    //     publicKeyHex: "0xf56d8524faf79fbc0f48c13aeed3b0ce5dd376b4db93b8130a107c0a5e04ba04",
    //     privateKeyHex: `0x009c9f7c992a06cfafe916f125d8adb7a395fca243e264a8e56a4b3e6accf940
    //     d2b11e9ece3049ce60e3c7b4a1c58aebfa9298e29a30a58a67f1998646135204`
    // });

    // TODO: Confirm correct queue settings
    const [q, queueTxSig] = await OracleQueueAccount.init(
      client,
      queue_owner,
      {
        name: "switchboard permissionless queue",
        metadata: "",
        authority: QUEUE_AUTHORITY || queue_owner.address().hex(),
        oracleTimeout: 180,
        reward: 0,
        // everything else is added on top
        minStake: 0,
        slashingEnabled: false,
        varianceToleranceMultiplierValue: 0,
        varianceToleranceMultiplierScale: 0,
        feedProbationPeriod: 0,
        consecutiveFeedFailureLimit: 0,
        consecutiveOracleFailureLimit: 0,
        unpermissionedFeedsEnabled: true,
        unpermissionedVrfEnabled: false,
        lockLeaseFunding: false,
        enableBufferRelayers: false,
        maxSize: 1000,
        coinType: "0x1::aptos_coin::AptosCoin",
      },
      SWITCHBOARD_ADDRESS
    );
    console.log(`Queue: ${q.address}, tx: ${queueTxSig}`);
    permissionless_queue = q;
  } catch (e) {
    console.log(e);
  }

  /*
    PERMISSIONED QUEUE
  */
  let permissioned_queue: any;
  try {
    // CREATE QUEUE OWNER AND FUND 1 APT
    const queue_owner = new AptosAccount();
    fs.writeFileSync(
      `permissioned-queue-owner-keys-${queue_owner.address().hex()}`,
      JSON.stringify(queue_owner.toPrivateKeyObject())
    );
    await transfer(client, funder, queue_owner, QUEUE_COST);
    console.log(
      `Authority account ${queue_owner.address().hex()} funded for queue`
    );

    // Fallback in case we want to drop in a queue owner
    // const queue_owner = AptosAccount.fromAptosAccountObject({
    //     address: "0xe8012714cd17606cee7188a2a365eef3fe760be598750678c8c5954eb548a591",
    //     publicKeyHex: "0xf56d8524faf79fbc0f48c13aeed3b0ce5dd376b4db93b8130a107c0a5e04ba04",
    //     privateKeyHex: `0x009c9f7c992a06cfafe916f125d8adb7a395fca243e264a8e56a4b3e6accf940
    //     d2b11e9ece3049ce60e3c7b4a1c58aebfa9298e29a30a58a67f1998646135204`
    // });

    const [q, queueTxSig] = await OracleQueueAccount.init(
      client,
      queue_owner,
      {
        name: "switchboard permissioned queue",
        metadata: "",
        authority: QUEUE_AUTHORITY || queue_owner.address().hex(),
        oracleTimeout: 180,
        reward: 0, // base reward
        // everything else is added on top
        minStake: 0,
        slashingEnabled: false,
        varianceToleranceMultiplierValue: 0,
        varianceToleranceMultiplierScale: 0,
        feedProbationPeriod: 0,
        consecutiveFeedFailureLimit: 0,
        consecutiveOracleFailureLimit: 0,
        unpermissionedFeedsEnabled: false,
        unpermissionedVrfEnabled: false,
        lockLeaseFunding: false,
        enableBufferRelayers: false,
        maxSize: 1000,
        coinType: "0x1::aptos_coin::AptosCoin",
      },
      SWITCHBOARD_ADDRESS
    );
    console.log(`Permissioned Queue: ${q.address}, tx: ${queueTxSig}`);
    permissioned_queue = q;
  } catch (e) {
    console.log(e);
  }

  /*
    PERMISSIONED CRANK
   */
  let permissioned_crank: any;
  try {
    // CREATE CRANK OWNER AND FUND 1 APT
    const crank_owner = new AptosAccount();
    fs.writeFileSync(
      `permissioned-crank-owner-keys-${crank_owner.address().hex()}`,
      JSON.stringify(crank_owner.toPrivateKeyObject())
    );
    await transfer(client, funder, crank_owner, CRANK_COST);
    console.log(
      `Authority account ${crank_owner.address().hex()} funded for crank`
    );

    // Fallback in case we want to drop in a crank owner
    // const crank_owner = AptosAccount.fromAptosAccountObject({
    //     address: "0xe8012714cd17606cee7188a2a365eef3fe760be598750678c8c5954eb548a591",
    //     publicKeyHex: "0xf56d8524faf79fbc0f48c13aeed3b0ce5dd376b4db93b8130a107c0a5e04ba04",
    //     privateKeyHex: `0x009c9f7c992a06cfafe916f125d8adb7a395fca243e264a8e56a4b3e6accf940
    //     d2b11e9ece3049ce60e3c7b4a1c58aebfa9298e29a30a58a67f1998646135204`
    // });

    const [c, txhash] = await CrankAccount.init(
      client,
      crank_owner,
      {
        queueAddress: permissioned_queue.address,
        coinType: "0x1::aptos_coin::AptosCoin",
      },
      SWITCHBOARD_ADDRESS
    );
    console.log(
      `Created permissioned crank at ${c.address}, tx hash ${txhash}`
    );
    permissioned_crank = c;
  } catch (e) {
    console.log(e);
  }

  /*
    PERMISSIONLESS CRANK
   */
  let permissionless_crank: any;
  try {
    // CREATE CRANK OWNER AND FUND 1 APT
    const crank_owner = new AptosAccount();
    fs.writeFileSync(
      `permissionless-crank-owner-keys-${crank_owner.address().hex()}`,
      JSON.stringify(crank_owner.toPrivateKeyObject())
    );

    await transfer(client, funder, crank_owner, CRANK_COST);
    console.log(
      `Authority account ${crank_owner.address().hex()} funded for crank`
    );

    // Fallback in case we want to drop in a crank owner
    // const crank_owner = AptosAccount.fromAptosAccountObject({
    //     address: "0xe8012714cd17606cee7188a2a365eef3fe760be598750678c8c5954eb548a591",
    //     publicKeyHex: "0xf56d8524faf79fbc0f48c13aeed3b0ce5dd376b4db93b8130a107c0a5e04ba04",
    //     privateKeyHex: `0x009c9f7c992a06cfafe916f125d8adb7a395fca243e264a8e56a4b3e6accf940
    //     d2b11e9ece3049ce60e3c7b4a1c58aebfa9298e29a30a58a67f1998646135204`
    // });

    const [c, txhash] = await CrankAccount.init(
      client,
      crank_owner,
      {
        queueAddress: permissionless_queue.address,
        coinType: "0x1::aptos_coin::AptosCoin",
      },
      SWITCHBOARD_ADDRESS
    );
    console.log(
      `Created permissionless crank at ${c.address}, tx hash ${txhash}`
    );
    permissionless_crank = c;
  } catch (e) {
    console.log(e);
  }

  console.log("\n\n\n\n\n");

  console.log("Permissionless Queue", permissionless_queue.address);
  console.log("Permissionless Crank", permissionless_crank.address);
  console.log("\n");
  console.log("Permissioned Queue", permissioned_queue.address);
  console.log("Permissioned Crank", permissioned_crank.address);
})();