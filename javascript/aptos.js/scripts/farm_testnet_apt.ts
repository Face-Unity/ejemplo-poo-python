
import { FaucetClient } from "aptos";

const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const SWITCHBOARD_ADDRESS =
  "0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77";

// run it all at once
(async () => {
  // INFRA ------
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
  setInterval(async () => {
    try {
      await faucetClient.fundAccount(SWITCHBOARD_ADDRESS, 500000000);
      console.log(`Account ${SWITCHBOARD_ADDRESS} funded.`);
    } catch (e) {
      console.log(e);
    }
  }, 5000);
})();