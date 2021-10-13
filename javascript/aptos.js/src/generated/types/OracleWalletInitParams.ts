import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleWalletInitParams {
  oracleAddr: HexString;
  queueAddr: HexString;
  withdrawAuthority: HexString;
}

export interface OracleWalletInitParamsJSON {
  oracleAddr: string;
  queueAddr: string;
  withdrawAuthority: string;
}

export interface OracleWalletInitParamsMoveStruct {
  oracle_addr: string;
  queue_addr: string;
  withdraw_authority: string;
}

export class OracleWalletInitParams implements IOracleWalletInitParams {
  readonly oracleAddr: HexString;
  readonly queueAddr: HexString;
  readonly withdrawAuthority: HexString;

  constructor(fields: IOracleWalletInitParams) {
    this.oracleAddr = fields.oracleAddr;
    this.queueAddr = fields.queueAddr;
    this.withdrawAuthority = fields.withdrawAuthority;
  }

  toJSON(): OracleWalletInitParamsJSON {
    return {
      oracleAddr: this.oracleAddr.toString(),
      queueAddr: this.queueAddr.toString(),
      withdrawAuthority: this.withdrawAuthority.toString(),
    };
  }

  static fromJSON(obj: OracleWalletInitParamsJSON) {
    return new OracleWalletInitParams({
      oracleAddr: HexString.ensu