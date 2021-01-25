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
  "0x11fbd91e4a718066891f37958f0b68d10e720f2edf8d57854fb20c299a119a8c";
// TODO: SET THIS PROPERLY
const accounts = [
  "0xf92bc956b9e25f38a2e4829b58f03ca9724233985cdda3f818bc3e62d6ed7d9c",
  "0x1ac99ac3f4050a68dd37a7af88d9337893235ee3da7135e454258e86b44393c9",
  "0xbe628dafb5f30cb7bc7f5994b998741151fddbb48264cd2e040d92f83b1be3fd",
  // CRANK TURNER
  // "0xca62eccbbdb22b5de18165d0bdf2d7127569b91498f0a7f6944028793cef8137",
];
const transfer = async (
  client: AptosClient,
  from: AptosAccount,
  to: string,
  amount: number
) => {
  const payload = {
    type: "entry_function_payload",
    function: "0x1::aptos_account::transfer",
    type_arguments: [],
    arguments: [to, amount],
  };
  await sendAptosTx(
    client,
    from,
    payload.function,
    payload.arguments,
    payload.type_arguments
  );
};
/*
  CREATE 1 ORACLE AND WRITE OUT THE KEY
 */
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
  const coinClient = new CoinClient(client);
  for (let account of accounts) {
    try {
      console.log(`checking ${account}`);
      const balance = await coinClient.checkBalance(
        new AptosAccount(undefined, account)
      );
      // if (Number(balance) < 20_000_000) {
      console.log(`funding ${account}`);
    