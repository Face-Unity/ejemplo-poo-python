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

  toJS