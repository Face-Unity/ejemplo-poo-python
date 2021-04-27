import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorOpenRoundParams {
  aggregatorAddr: HexString;
  jitter: BN;
}

export interface AggregatorOpenRoundParamsJSON {
  aggregatorAddr: string;
  jitter: string;
}

export interface AggregatorOpenRoundParamsMoveStruct {
  aggregator_addr: string;
  jitter: string;
}

export class AggregatorOpenRoundParams implements IAggregatorOpenRoundParams {
  readonly aggregatorAddr: HexString;
  readonly jitter: BN;

  constructor(fields: IAggregatorOpenRoundParams) {
    this.aggregatorAddr = fields.aggregatorAddr;
    this.jitter = fields.jitter;
  }

  toJSON(): AggregatorOpenRoundParamsJSON {
    return {
      aggregatorAddr: this.aggregatorAddr.toString(),
      jitter: this.jitter.toString(),
    };
  }

  static fromJSON(obj: AggregatorOpenRoundParamsJSON) {
    return new AggregatorOpenRoundParams({
      aggregatorAddr: HexString.ensure(obj.aggregatorAddr),
      jitter: new BN(obj.jitter),
    });
  }

  toMoveStruct(): AggregatorOpenRoundParamsMoveStruct {
    return {
      aggregator_addr: this.aggregatorAddr.toString(),
      jitter: this.jitter.toString(),
    };
  }

  static fromMoveStruct(obj: AggregatorOpenRoundParamsMoveStruct) {
    return new AggregatorOpenRoundParams({
      aggregatorAddr: HexStri