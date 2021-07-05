import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ILeaseWithdrawEvent {
  leaseAddress: HexString;
  destinationWallet: HexString;
  previousAmount: BN;
  newAmount: BN;
  timestamp: BN;
}

export interface LeaseWithdrawEventJSON {
  leaseAddress: string;
  destinationWallet: string;
  previousAmount: string;
  newAmount: string;
  timestamp: