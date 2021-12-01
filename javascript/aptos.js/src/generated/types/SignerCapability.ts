import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ISignerCapability {
  account: HexString;
}

export interface SignerCapabilityJSON {
  account: string;
}

export interface SignerCapabilityMoveStruct {
  account: string