import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleConfig {
  authority: HexString;
  queueAddr: HexString;
}

export interface OracleConfigJSON {
  authority: string;
  queueAddr: string;
}

export interface OracleConfigMoveStruct {
  authority: string;
  queue_addr: string;
}

export class OracleConfig implements IOracleConfig {
  readonly authority: HexString;
  readonly queueAddr: HexString;

  constructor(fields: IOracleConfig) {
    this.authority = fields.authority