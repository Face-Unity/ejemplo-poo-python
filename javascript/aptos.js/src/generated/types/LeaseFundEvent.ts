import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ILeaseFundEvent {
  leaseAddress: HexString;
  funder: HexString;
  amount: BN;
  timestamp: BN;
}

export interface LeaseFundEventJSON {
  leaseAddress: string;
  funder: string;
  amount: string;
  timestamp: string;
}

export interface LeaseFundEventMoveStruct {
  lease_address: string;
  funder: string;
  amount: string;
  timestamp: string;
}

export class LeaseFundEvent implemen