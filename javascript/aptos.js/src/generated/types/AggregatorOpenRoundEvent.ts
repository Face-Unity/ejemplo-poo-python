import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorOpenRoundEvent {
  aggregatorAddress: HexString;
  oracleKeys: Array<HexString>;
  jobKeys: Array<HexString>;
}

export interface AggregatorOpenRoundEventJSON {
  aggregatorAddress: string;
  oracleKeys: Array<string>;
  jobKeys: Array<string>;
}

export interface AggregatorOpenRoundEventMoveStruct {
  aggregator_address: string;
  oracle_keys: Array<string>;
  job_keys: Array<string>;
}

export class AggregatorOpenRoundEvent implements IAggregatorOpenRoundEvent {
  readonly aggregatorAddress: HexString;
  readonly oracleKeys: Array<HexString>;
  readonly jobKeys: Array<HexString>;

  constructor(fields: IAggregatorOpenRoundEvent) {
    this.aggregatorAddress = fields.aggregatorAddress;
    this.oracleKeys = fields.oracleKeys;
    this.jobKeys = fields.jobKeys;
  }

  toJSON(): AggregatorOpenRoundEventJSON {
    return {
      aggregatorAddress: this.aggregatorAddress.toString(),
      oracleKeys: this.oracleKeys.map((item) => item.toString()),
      jobKeys: this.jobKeys.map((item) => item.toString()),
    };
  }

  static fromJSON(obj: AggregatorOpenRoundEventJSON) {
    return new AggregatorOpenRoundEvent({
      aggregatorAddress: HexString.ensure(obj.aggregatorAddress),
      oracleKeys: obj.oracleKeys.map((item) => HexString.ensure(item)),
      jobKeys: obj.jobKeys.map((item) => HexString.ensure(item)),
    });
  }

  toMoveStruct(): AggregatorOpenRoundEventMoveStruct {
    return {
      aggregator_address: this.aggregatorAddress.toString(),
      oracle_keys: this.oracleKeys.map((item) => item.toString()),
      job_keys: this.jobKeys.map((item) => item.toString()),
    };
  }

  static fromMoveStruct(obj: AggregatorOpenRoundEventMoveStruct) {
    return new AggregatorOpenRoundEvent({
      aggregatorAddress: HexString.ensure(obj.aggregator_address),
      oracleKeys: obj.oracle_keys.map((item) => HexString.ensure(item)),
      jobKeys: obj.job_keys.map((item) => HexString.ensure(item)),
    });
  }
}
