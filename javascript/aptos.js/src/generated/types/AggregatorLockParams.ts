import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorLockParams {
  aggregatorAddr: HexString;
}

export interface AggregatorLockParamsJSON {
  aggregatorAddr: string;
}

export interface AggregatorLockParamsMoveStruct {
  aggregator_addr: string;
}

export class AggregatorLockParams implements IAggregatorLockParams {
  readonly aggregatorAddr: HexString;

  constructor(fields: IAggregatorLockParams) {
    this.aggregatorAddr = fields.aggregatorAddr;
  }

 