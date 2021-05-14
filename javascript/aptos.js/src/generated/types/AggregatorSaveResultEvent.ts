import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorSaveResultEvent {
  aggregatorAddress: HexString;
  oracleKey: HexString;
  value: types.SwitchboardDecimal;
}

export interface AggregatorSaveResultEventJSON {
  aggregatorAddress: string;
  oracleKey: string;
  value: types.SwitchboardDecimalJSON;
}

export interface AggregatorSaveResultEventMoveStruct {
  aggregator_address: string;
  oracle_key: string;
  value: types.SwitchboardDecimalMoveStruct;
}

export class AggregatorSaveResultEvent implements IAggregatorSaveResultEvent {
  readonly aggregatorAddress: HexString;
  readonly oracleKey: HexString;
  readonly value: types.SwitchboardDecimal;

  constructor(fields: IAggregatorSaveResultEvent) {
    this.aggregatorAddress = fields.aggregatorAddress;
    this.oracleKey = fields.oracleKey;
    this.value = fields.value;
  }

  toJSON(): AggregatorSaveResultEventJSON {
    return {
      aggregatorAddress: this.aggregatorAddress.toString(),
      oracleKey: this.oracleKey.toString(),
      value: this.value.toJSON(),
    };
  }

  static fromJSON(obj: AggregatorSaveResultEventJSON) {
    return new AggregatorSaveResultEvent({
      aggregatorAddress: HexString.ensure(obj.aggregatorAddress),
      oracleKey: HexString.ensure(obj.oracleKey),
      value: types.