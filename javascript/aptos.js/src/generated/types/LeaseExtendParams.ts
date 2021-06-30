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
  readonly loadAmount: BN;

  constructor(fields: ILeaseExtendParams) {
    this.aggregatorAddr = fields.aggregatorAddr;
    this.loadAmount = fields.loadAmount;
  }

  toJSON(): LeaseExtendParamsJSON {
    return {
      aggregatorAddr: this.aggregatorAddr.toString(),
      loadAmount: this.loadAmount.toString(),
    };
  }

  static fromJSON(obj: LeaseExtendParamsJSON) {
    return new LeaseExtendParams({
      aggregatorAddr: HexString.ensure(obj.aggregatorAddr),
      loadAmount: new BN(obj.loadAmount),
    });
  }

  toMoveStruct(): LeaseExtendParamsMoveStruct {
    return {
      aggregator_addr: this.aggregatorAddr.toString(),
      load_amount: this.loadAmount.toString(),
    };
  }

  static fromMoveStruct(obj: LeaseExtendParamsMoveStruct) {
    return new LeaseExtendParams({
      aggregatorAddr: HexString.ensure(obj.aggregator_addr),
      loadAmount: new BN(obj.load_amount),
    });
  }
}
