
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ILeaseWithdrawParams {
  aggregatorAddr: HexString;
  queueAddr: HexString;
  amount: BN;
}

export interface LeaseWithdrawParamsJSON {
  aggregatorAddr: string;
  queueAddr: string;
  amount: string;
}

export interface LeaseWithdrawParamsMoveStruct {
  aggregator_addr: string;
  queue_addr: string;
  amount: string;
}

export class LeaseWithdrawParams implements ILeaseWithdrawParams {
  readonly aggregatorAddr: HexString;
  readonly queueAddr: HexString;
  readonly amount: BN;

  constructor(fields: ILeaseWithdrawParams) {
    this.aggregatorAddr = fields.aggregatorAddr;
    this.queueAddr = fields.queueAddr;
    this.amount = fields.amount;
  }

  toJSON(): LeaseWithdrawParamsJSON {
    return {
      aggregatorAddr: this.aggregatorAddr.toString(),
      queueAddr: this.queueAddr.toString(),
      amount: this.amount.toString(),
    };
  }

  static fromJSON(obj: LeaseWithdrawParamsJSON) {
    return new LeaseWithdrawParams({
      aggregatorAddr: HexString.ensure(obj.aggregatorAddr),
      queueAddr: HexString.ensure(obj.queueAddr),
      amount: new BN(obj.amount),
    });
  }

  toMoveStruct(): LeaseWithdrawParamsMoveStruct {
    return {
      aggregator_addr: this.aggregatorAddr.toString(),
      queue_addr: this.queueAddr.toString(),
      amount: this.amount.toString(),
    };
  }

  static fromMoveStruct(obj: LeaseWithdrawParamsMoveStruct) {
    return new LeaseWithdrawParams({
      aggregatorAddr: HexString.ensure(obj.aggregator_addr),
      queueAddr: HexString.ensure(obj.queue_addr),
      amount: new BN(obj.amount),
    });
  }
}