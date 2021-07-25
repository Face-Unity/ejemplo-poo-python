import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleData {
  numRows: number;
  lastHeartbeat: BN;
}

export interface OracleDataJSON {
  numRows: number;
  lastHeartbeat: string;
}

export interface OracleDataMoveStruct {
  num_rows: number;
  last_heartbeat: string;
}

export class OracleData implements IOracleData {
  readonly numRows: number;
  readonly lastHeartbeat: BN;

  constructor(fields: IOracleData) {
    this.numRows = fields.numRows;
    this.lastHeartbeat = fields.lastHeartbeat;
  }

  toJSON(): OracleDataJSON {
    return {
      numRows: this.numRows,
      lastHeartbeat: this.lastHeartbeat.toString(),
    };
  }

  static fromJSO