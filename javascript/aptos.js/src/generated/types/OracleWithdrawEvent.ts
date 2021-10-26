import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleWithdrawEvent {
  oracleAddress: HexString;
  destinationWallet: HexString;
  previousAmount: BN;
  newAmount: BN;
  timestamp: BN;
}

export interface OracleWithdrawEventJSON {
  or