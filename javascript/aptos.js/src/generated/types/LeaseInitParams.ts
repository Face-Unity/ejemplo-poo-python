
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ILeaseInitParams {
  aggregatorAddr: HexString;
  queueAddr: HexString;
  withdrawAuthority: HexString;
  initialAmount: BN;
}

export interface LeaseInitParamsJSON {
  aggregatorAddr: string;
  queueAddr: string;
  withdrawAuthority: string;
  initialAmount: string;
}

export interface LeaseInitParamsMoveStruct {
  aggregator_addr: string;
  queue_addr: string;
  withdraw_authority: string;
  initial_amount: string;
}

export class LeaseInitParams implements ILeaseInitParams {
  readonly aggregatorAddr: HexString;
  readonly queueAddr: HexString;
  readonly withdrawAuthority: HexString;
  readonly initialAmount: BN;

  constructor(fields: ILeaseInitParams) {
    this.aggregatorAddr = fields.aggregatorAddr;
    this.queueAddr = fields.queueAddr;
    this.withdrawAuthority = fields.withdrawAuthority;
    this.initialAmount = fields.initialAmount;
  }

  toJSON(): LeaseInitParamsJSON {
    return {
      aggregatorAddr: this.aggregatorAddr.toString(),
      queueAddr: this.queueAddr.toString(),
      withdrawAuthority: this.withdrawAuthority.toString(),
      initialAmount: this.initialAmount.toString(),
    };
  }

  static fromJSON(obj: LeaseInitParamsJSON) {
    return new LeaseInitParams({
      aggregatorAddr: HexString.ensure(obj.aggregatorAddr),
      queueAddr: HexString.ensure(obj.queueAddr),
      withdrawAuthority: HexString.ensure(obj.withdrawAuthority),
      initialAmount: new BN(obj.initialAmount),
    });
  }

  toMoveStruct(): LeaseInitParamsMoveStruct {
    return {
      aggregator_addr: this.aggregatorAddr.toString(),
      queue_addr: this.queueAddr.toString(),
      withdraw_authority: this.withdrawAuthority.toString(),
      initial_amount: this.initialAmount.toString(),
    };
  }

  static fromMoveStruct(obj: LeaseInitParamsMoveStruct) {
    return new LeaseInitParams({
      aggregatorAddr: HexString.ensure(obj.aggregator_addr),
      queueAddr: HexString.ensure(obj.queue_addr),
      withdrawAuthority: HexString.ensure(obj.withdraw_authority),
      initialAmount: new BN(obj.initial_amount),
    });
  }
}