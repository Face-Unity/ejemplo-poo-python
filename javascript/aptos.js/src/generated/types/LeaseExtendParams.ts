import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ILeaseExtendParams {
  aggregatorAddr: HexString;
  loadAmount: BN;
}

export interface LeaseExtendParamsJSON {
  aggregatorAddr: string;
  loadAmount: string;
}

export interface LeaseExtendParamsMoveStruct {
  aggregator_addr: string;
  load_amount: string;
}

export class LeaseExtendParams implements ILeaseExtendParams {
  readonly aggregatorAddr: HexString;
  readonly loadAmount: BN