
import { AptosClient, AptosAccount, HexString } from "aptos";
import {
  Permission,
  SwitchboardPermission,
  AggregatorAccount,
} from "../lib/cjs";
import * as YAML from "yaml";
import * as fs from "fs";
import Big from "big.js";

const NODE_URL = "https://fullnode.mainnet.aptoslabs.com/v1";
// const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
// const NODE_URL = "http://0.0.0.0:8080/v1";

// TODO: MAKE THIS THE DEPLOYER ADDRESS
const SWITCHBOARD_ADDRESS =
  "0x7d7e436f0b2aafde60774efb26ccc432cf881b677aca7faaf2a01879bd19fb8";

// TODO: MAKE THIS THE AUTHORITY THAT WILL OWN THE ORACLE
// const QUEUE_ADDRESS =
// "0x11fbd91e4a718066891f37958f0b68d10e720f2edf8d57854fb20c299a119a8c";
const QUEUE_ADDRESS =
  "0xc887072e37f17f9cc7afc0a00e2b283775d703c610acca3997cb26e74bc53f3b";

// TODO: SET THIS PROPERLY
// const oracles = [
// "0xd7d2baef5dc653c2c84715b3d4ac7463446387c7d21c41e306bf4ec201454abb",
// "0x935ae73d4176dc45ca5cf4daad8c8abe0295e5d332ba78de6312a1411374c347",
// "0xd5d5ad988fedce6b2465496e978a1e828f91b6a82a67158e595fecbfa1cd5479",
// ];
const oracles = [
  "0xe708597ca28ebc3d3ca417494c1b428d3e8f69589faea86c5d81a6afe47cfa52",
  "0xc23ce1f171bf0331a9200c2b89c7bf0087004d388c7b73f89aa3f97c305da9bc",
  "0x31f14a5f190f48c213c01d60c235aed54f17ce72f07bb467dd9c6ad88070ecc1",
];

const feeds = [
  "0xdc7f6fbc4efe2995e1e37b9f73d113085e4ee3597d47210a2933ad3bf5b78774",
  "0x7b5f536d201280a10d33d8c2202a1892b1dd8247aecfef7762ea8e7565eac7b6",
  "0x5af65afeeab555f8b742ce7fc2c539a5cb6a6fb2a6e6d96bc1b075fb28067808",
  "0xdc1045b4d9fd1f4221fc2f91b2090d88483ba9745f29cf2d96574611204659a5",
  "0xb8f20223af69dcbc33d29e8555e46d031915fc38cb1a4fff5d5167a1e08e8367",
];

// const feeds = [
//   "0xdc7f6fbc4efe2995e1e37b9f73d113085e4ee3597d47210a2933ad3bf5b78774",
//   "0x7b5f536d201280a10d33d8c2202a1892b1dd8247aecfef7762ea8e7565eac7b6",
//   "0x5af65afeeab555f8b742ce7fc2c539a5cb6a6fb2a6e6d96bc1b075fb28067808",
//   "0xdc1045b4d9fd1f4221fc2f91b2090d88483ba9745f29cf2d96574611204659a5",
// ];

// const oracles = [
//   "0xd7d2baef5dc653c2c84715b3d4ac7463446387c7d21c41e306bf4ec201454abb",
//   "0x935ae73d4176dc45ca5cf4daad8c8abe0295e5d332ba78de6312a1411374c347",
//   "0xd5d5ad988fedce6b2465496e978a1e828f91b6a82a67158e595fecbfa1cd5479",
// ];

/*
  CREATE 1 ORACLE AND WRITE OUT THE KEY
 */

(async () => {
  const client = new AptosClient(NODE_URL);
  console.log(await client.estimateGasPrice());
  return;

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
  // const out = await client.getAccountResource("0xf92bc956b9e25f38a2e4829b58f03ca9724233985cdda3f818bc3e62d6ed7d9c", "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
  //
  // console.log(Number((out.data as any).coin.value) / 100000000);
  // return;

  if (!funder) {
    throw new Error("Could not get funder account.");
  }
  for (let feed of feeds) {
    /*
      ORACLE CREATION
    */
    try {
      const feedAccount = new AggregatorAccount(
        client,
        feed,
        SWITCHBOARD_ADDRESS
      );
      console.log(JSON.stringify(await feedAccount.loadData(), null, 2));
      // enable heartbeat on oracle
      await feedAccount.setConfig(funder, {
        varianceThreshold: new Big(1),
        minUpdateDelaySeconds: 30,
        forceReportPeriod: 900,
        minJobResults: 1,
        minOracleResults: 1,
        batchSize: 1,
      });
    } catch (e) {
      console.log(e);
    }

    if (!funder) {
      throw new Error("Could not get funder account.");
    }

    // for (let oracle of oracles) {
    // [>
    // ORACLE CREATION
    // */
    // try {
    // const oraclePermission = new Permission(client, SWITCHBOARD_ADDRESS);
    //
    // // enable heartbeat on oracle
    // await oraclePermission.set(funder, {
    // authority: funder.address().hex(),
    // granter: QUEUE_ADDRESS,
    // grantee: oracle,
    // permission: SwitchboardPermission.PERMIT_ORACLE_HEARTBEAT,
    // enable: true,
    // });
    // } catch (e) {
    // console.log(e);
    // }
    // }
  }
  // for (let oracle of oracles) {
  // [>
  // ORACLE CREATION
  // */
  // try {
  // const oraclePermission = new Permission(client, SWITCHBOARD_ADDRESS);
  //
  // // enable heartbeat on oracle
  // await oraclePermission.set(funder, {
  // authority: funder.address().hex(),
  // granter: QUEUE_ADDRESS,
  // grantee: oracle,
  // permission: SwitchboardPermission.PERMIT_ORACLE_HEARTBEAT,
  // enable: true,
  // });
  // } catch (e) {
  // console.log(e);
  // }
  // }
})();