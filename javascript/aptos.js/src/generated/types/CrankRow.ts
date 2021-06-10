import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankRow {
  aggregatorAddr: HexString;
  timestamp: BN;
}

export interface CrankRowJSON {
  aggregatorAddr: string;
  timestamp: string;
}

export interface CrankRowMoveStruct {
  aggregator_addr: string;
  timestamp: string;
}

export class CrankRow implements ICrankRow {
  readonly aggregatorAddr: HexString;
  readonly timestamp: BN;

  constructor(fields: ICrankRow) {
    this.aggregatorAddr = fields.aggregatorAddr;
    this.timestamp = fields.timestamp;
  }

  toJSON(): CrankRo