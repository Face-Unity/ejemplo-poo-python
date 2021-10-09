import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleSlashEvent {
  aggregatorAddress: HexString;
  oracleAddress: HexString;
  amount: BN;
  timestamp: BN;
}

export interface OracleSlashEventJSON {
  aggregatorAddress: string;
  oracleAddress: string;
  amount: string;
  timestamp: string;
}

export interface OracleSlashEventMoveStruct {
  aggregator_address: string;
  oracle_address: string;
  amount: string;
  timestamp: string;
}

export class OracleSlashEvent implements IOracleSlashEvent {
  readonly aggregatorAddress: HexString;
  readonly oracleAddress: HexString;
  readonly amount: BN;
  readonly timestamp: BN;

  constructor(fields: IOracleSlashEvent) {
    this.aggregatorAddress = fields.aggregatorAddress;
    this.oracleAddress = fields.oracleAddress;
    this.amount = fields.amount;
    this.timestamp = fields.timestamp;
  }

  toJSON(): OracleSlashEventJSON {
    return {
      aggregatorAddress: this.aggregatorAddress.toString(),
      oracleAddress: this.oracleAddress.toString(),
      amount: this.amount.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  static fromJSON(obj: OracleSlashEventJSON) {
    return new OracleSlashEvent({
      aggregatorAddress: HexString.ensure(obj.aggregatorAddress),
      oracleAddress: HexString.ensure(obj.oracleAddress),
      amount: new BN(obj.amount),
      timestamp: new BN(obj.timestamp),
    });
  }

  toMoveStruct(): OracleSlashEventMoveStruct {
    return {
      aggregator_address: this.aggregatorAddress.toString(),
      oracle_address: this.oracleAddress.toString(),
      amount: this.amount.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  static fromMoveStruct(obj: OracleSlashEventMoveStruct) {
    return new OracleSlashEvent({
      aggregatorAddress: HexString.ensure(obj.aggregator_address),
      oracleAddress: HexString.ensure(obj.oracle_address),
      amount: new BN(obj.amount),
      timestamp: new BN(obj.timestamp),
    });
  }
}
