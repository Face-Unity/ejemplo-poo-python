
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorSaveResultParams {
  oracleAddr: HexString;
  aggregatorAddr: HexString;
  oracleIdx: BN;
  error: boolean;
  value: types.SwitchboardDecimal;
  jobsChecksum: Uint8Array;
  minResponse: types.SwitchboardDecimal;
  maxResponse: types.SwitchboardDecimal;
}

export interface AggregatorSaveResultParamsJSON {
  oracleAddr: string;
  aggregatorAddr: string;
  oracleIdx: string;
  error: boolean;
  value: types.SwitchboardDecimalJSON;
  jobsChecksum: Array<number>;
  minResponse: types.SwitchboardDecimalJSON;
  maxResponse: types.SwitchboardDecimalJSON;
}

export interface AggregatorSaveResultParamsMoveStruct {
  oracle_addr: string;
  aggregator_addr: string;
  oracle_idx: string;
  error: boolean;
  value: types.SwitchboardDecimalMoveStruct;
  jobs_checksum: string;
  min_response: types.SwitchboardDecimalMoveStruct;
  max_response: types.SwitchboardDecimalMoveStruct;
}

export class AggregatorSaveResultParams implements IAggregatorSaveResultParams {
  readonly oracleAddr: HexString;
  readonly aggregatorAddr: HexString;
  readonly oracleIdx: BN;
  readonly error: boolean;
  readonly value: types.SwitchboardDecimal;
  readonly jobsChecksum: Uint8Array;
  readonly minResponse: types.SwitchboardDecimal;
  readonly maxResponse: types.SwitchboardDecimal;

  constructor(fields: IAggregatorSaveResultParams) {
    this.oracleAddr = fields.oracleAddr;
    this.aggregatorAddr = fields.aggregatorAddr;
    this.oracleIdx = fields.oracleIdx;
    this.error = fields.error;
    this.value = fields.value;
    this.jobsChecksum = fields.jobsChecksum;
    this.minResponse = fields.minResponse;
    this.maxResponse = fields.maxResponse;
  }

  toJSON(): AggregatorSaveResultParamsJSON {
    return {
      oracleAddr: this.oracleAddr.toString(),
      aggregatorAddr: this.aggregatorAddr.toString(),
      oracleIdx: this.oracleIdx.toString(),
      error: this.error,
      value: this.value.toJSON(),
      jobsChecksum: [...this.jobsChecksum],
      minResponse: this.minResponse.toJSON(),
      maxResponse: this.maxResponse.toJSON(),
    };
  }

  static fromJSON(obj: AggregatorSaveResultParamsJSON) {
    return new AggregatorSaveResultParams({
      oracleAddr: HexString.ensure(obj.oracleAddr),
      aggregatorAddr: HexString.ensure(obj.aggregatorAddr),
      oracleIdx: new BN(obj.oracleIdx),
      error: obj.error,
      value: types.SwitchboardDecimal.fromJSON(obj.value),
      jobsChecksum: new Uint8Array(obj.jobsChecksum),
      minResponse: types.SwitchboardDecimal.fromJSON(obj.minResponse),
      maxResponse: types.SwitchboardDecimal.fromJSON(obj.maxResponse),
    });
  }

  toMoveStruct(): AggregatorSaveResultParamsMoveStruct {
    return {
      oracle_addr: this.oracleAddr.toString(),
      aggregator_addr: this.aggregatorAddr.toString(),
      oracle_idx: this.oracleIdx.toString(),
      error: this.error,
      value: this.value.toMoveStruct(),
      jobs_checksum: Buffer.from(this.jobsChecksum).toString("hex"),
      min_response: this.minResponse.toMoveStruct(),
      max_response: this.maxResponse.toMoveStruct(),
    };
  }

  static fromMoveStruct(obj: AggregatorSaveResultParamsMoveStruct) {
    return new AggregatorSaveResultParams({
      oracleAddr: HexString.ensure(obj.oracle_addr),
      aggregatorAddr: HexString.ensure(obj.aggregator_addr),
      oracleIdx: new BN(obj.oracle_idx),
      error: obj.error,
      value: types.SwitchboardDecimal.fromMoveStruct(obj.value),
      jobsChecksum:
        typeof obj.jobs_checksum === "string"
          ? new Uint8Array(Buffer.from(obj.jobs_checksum.slice(2), "hex"))
          : new Uint8Array(obj.jobs_checksum),
      minResponse: types.SwitchboardDecimal.fromMoveStruct(obj.min_response),
      maxResponse: types.SwitchboardDecimal.fromMoveStruct(obj.max_response),
    });
  }
}