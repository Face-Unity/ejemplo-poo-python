import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleInitParams {
  name: Uint8Array;
  metadata: Uint8Array;
  oracleAuthority: HexString;
  queueAddr: HexString;
}

export interface OracleInitParamsJSON {
  name: Array<number>;
  metadata: Array<number>;
  oracleAuthority: string;
  queueAddr: string;
}

export interface OracleInitParamsMoveStruct {
  name: string;
  metadata: string;
  oracle_authority: string;
  queue_addr: string;
}

export class OracleInitParams implements IOracleInitParams {
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly oracleAuthority: HexString;
  readonly queueAddr: HexString;

  constructor(fields: IOracleInitParams) {
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.oracleAuthority = fields.oracleAuthority;
    this.queueAddr = fields.queueAddr;
  }

  toJSON(): OracleInitParamsJSON {
    return {
      name: [...this.name],
      metadata: [...this.metadata],
      oracleAuthority: this.oracleAuthority.toString(),
      queueAddr: this.queueAddr.toString(),
    };
  }

  static fromJSON(obj: OracleInitParamsJSON) {
    return new OracleInitParams({
      name: n