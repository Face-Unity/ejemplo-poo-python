import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleWalletWithdrawParams {
  oracleAddr: HexString;
  queueAddr: HexString;
  amount: BN;
}

export interface OracleWalletWithdrawParamsJSON {
  oracleAddr: string;
  queueAddr: string;
  amount: string;
}

export interface OracleWalletWithdrawParamsMoveStruct {
  oracle_addr: string;
  queue_addr: string;
  amount: string;
}

export class OracleWalletWithdrawParams implements IOracleWalletWithdrawParams {
  readonly oracleAddr: HexString;
  readonly queueAddr: HexString;
  readonly amount: BN;

  constructor(fields: IOracleWalletWithdrawParams) {
    this.oracleAddr = fields.oracleAddr;
    this.queueAddr = fields.queueAddr;
    this.amount = fields.amount;
  }

  toJSON(): OracleWalletWithdrawParamsJSON {
    return {
      oracleAddr: this.oracleAddr.toString(),
      queueAddr: this.queueAddr.toString(),
      amount: this.amount.toString(),
    };
  }

  static fromJSON(obj: OracleWalletWithdrawParamsJSON) {
    return new OracleWalletWithdrawParams({
      oracleAddr: HexString.ensure(obj.oracleAddr),
      queueAddr: HexStri