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
    this.name