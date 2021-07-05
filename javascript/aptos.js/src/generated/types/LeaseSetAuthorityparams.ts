
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ILeaseSetAuthorityparams {
  aggregatorAddr: HexString;
  queueAddr: HexString;
  authority: HexString;
}

export interface LeaseSetAuthorityparamsJSON {
  aggregatorAddr: string;
  queueAddr: string;
  authority: string;
}

export interface LeaseSetAuthorityparamsMoveStruct {
  aggregator_addr: string;
  queue_addr: string;
  authority: string;
}

export class LeaseSetAuthorityparams implements ILeaseSetAuthorityparams {
  readonly aggregatorAddr: HexString;
  readonly queueAddr: HexString;
  readonly authority: HexString;

  constructor(fields: ILeaseSetAuthorityparams) {
    this.aggregatorAddr = fields.aggregatorAddr;
    this.queueAddr = fields.queueAddr;
    this.authority = fields.authority;
  }

  toJSON(): LeaseSetAuthorityparamsJSON {
    return {
      aggregatorAddr: this.aggregatorAddr.toString(),
      queueAddr: this.queueAddr.toString(),
      authority: this.authority.toString(),
    };
  }

  static fromJSON(obj: LeaseSetAuthorityparamsJSON) {
    return new LeaseSetAuthorityparams({
      aggregatorAddr: HexString.ensure(obj.aggregatorAddr),
      queueAddr: HexString.ensure(obj.queueAddr),
      authority: HexString.ensure(obj.authority),
    });
  }

  toMoveStruct(): LeaseSetAuthorityparamsMoveStruct {
    return {
      aggregator_addr: this.aggregatorAddr.toString(),
      queue_addr: this.queueAddr.toString(),
      authority: this.authority.toString(),
    };
  }

  static fromMoveStruct(obj: LeaseSetAuthorityparamsMoveStruct) {
    return new LeaseSetAuthorityparams({
      aggregatorAddr: HexString.ensure(obj.aggregator_addr),
      queueAddr: HexString.ensure(obj.queue_addr),
      authority: HexString.ensure(obj.authority),
    });
  }
}