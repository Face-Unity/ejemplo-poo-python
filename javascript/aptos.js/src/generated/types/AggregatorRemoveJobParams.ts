
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorRemoveJobParams {
  aggregatorAddr: HexString;
  jobAddr: HexString;
}

export interface AggregatorRemoveJobParamsJSON {
  aggregatorAddr: string;
  jobAddr: string;
}

export interface AggregatorRemoveJobParamsMoveStruct {
  aggregator_addr: string;
  job_addr: string;
}

export class AggregatorRemoveJobParams implements IAggregatorRemoveJobParams {
  readonly aggregatorAddr: HexString;
  readonly jobAddr: HexString;

  constructor(fields: IAggregatorRemoveJobParams) {
    this.aggregatorAddr = fields.aggregatorAddr;
    this.jobAddr = fields.jobAddr;
  }

  toJSON(): AggregatorRemoveJobParamsJSON {
    return {
      aggregatorAddr: this.aggregatorAddr.toString(),
      jobAddr: this.jobAddr.toString(),
    };
  }

  static fromJSON(obj: AggregatorRemoveJobParamsJSON) {
    return new AggregatorRemoveJobParams({
      aggregatorAddr: HexString.ensure(obj.aggregatorAddr),
      jobAddr: HexString.ensure(obj.jobAddr),
    });
  }

  toMoveStruct(): AggregatorRemoveJobParamsMoveStruct {
    return {
      aggregator_addr: this.aggregatorAddr.toString(),
      job_addr: this.jobAddr.toString(),
    };
  }

  static fromMoveStruct(obj: AggregatorRemoveJobParamsMoveStruct) {
    return new AggregatorRemoveJobParams({
      aggregatorAddr: HexString.ensure(obj.aggregator_addr),
      jobAddr: HexString.ensure(obj.job_addr),
    });
  }
}