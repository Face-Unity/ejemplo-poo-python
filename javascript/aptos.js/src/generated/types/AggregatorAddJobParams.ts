
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorAddJobParams {
  aggregatorAddr: HexString;
  jobAddr: HexString;
  weight: number;
}

export interface AggregatorAddJobParamsJSON {
  aggregatorAddr: string;
  jobAddr: string;
  weight: number;
}

export interface AggregatorAddJobParamsMoveStruct {
  aggregator_addr: string;
  job_addr: string;
  weight: number;
}

export class AggregatorAddJobParams implements IAggregatorAddJobParams {
  readonly aggregatorAddr: HexString;
  readonly jobAddr: HexString;
  readonly weight: number;

  constructor(fields: IAggregatorAddJobParams) {
    this.aggregatorAddr = fields.aggregatorAddr;
    this.jobAddr = fields.jobAddr;
    this.weight = fields.weight;
  }

  toJSON(): AggregatorAddJobParamsJSON {
    return {
      aggregatorAddr: this.aggregatorAddr.toString(),
      jobAddr: this.jobAddr.toString(),
      weight: this.weight,
    };
  }

  static fromJSON(obj: AggregatorAddJobParamsJSON) {
    return new AggregatorAddJobParams({
      aggregatorAddr: HexString.ensure(obj.aggregatorAddr),
      jobAddr: HexString.ensure(obj.jobAddr),
      weight: obj.weight,
    });
  }

  toMoveStruct(): AggregatorAddJobParamsMoveStruct {
    return {
      aggregator_addr: this.aggregatorAddr.toString(),
      job_addr: this.jobAddr.toString(),
      weight: this.weight,
    };
  }

  static fromMoveStruct(obj: AggregatorAddJobParamsMoveStruct) {
    return new AggregatorAddJobParams({
      aggregatorAddr: HexString.ensure(obj.aggregator_addr),
      jobAddr: HexString.ensure(obj.job_addr),
      weight: obj.weight,
    });
  }
}