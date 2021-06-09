import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankPushParams {
  crankAddr: HexString;
  aggregatorAddr: HexString;
}

export interface CrankPushParamsJSON {
  crankAddr: string;
  aggregatorAddr: string;
}

export interface CrankPushParamsMoveStruct {
  crank_addr: string;
  aggregator_addr: string;
}

export class CrankPushParams implements ICrankPushParams {
  readonly crankAddr: HexString;
  readonly aggregatorAddr: HexString;

  constructor(fields: ICrankPushParams) {
    this.crankAddr = fields.crankAddr;
    this.aggregatorAddr = fields.aggregatorAddr;
  }

  toJSON(): CrankPushParamsJSON {
    return {
      crankAddr: this.crankAddr.toString(),
      aggregatorAddr: this.aggregatorAddr.toString(),
    };
  }

  static fromJSON(obj: CrankPushParamsJSON) {
    return new CrankPushParams({
      crankAddr: HexString.ensure(obj.crankAddr),
      aggregatorAddr: HexString.ensure(obj.aggregatorAddr),
    });
  }

  toMoveStruct(): CrankPushParamsMoveStruct {
    return {
      crank_addr: this.crankAddr.toString(),
      aggregator_addr: this.aggregatorAddr.toString(),
    };