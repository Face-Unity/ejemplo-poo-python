import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleWithdrawEvent {
  oracleAddress: HexString;
  destinationWallet: HexString;
  previousAmount: BN;
  newAmount: BN;
  timestamp: BN;
}

export interface OracleWithdrawEventJSON {
  oracleAddress: string;
  destinationWallet: string;
  previousAmount: string;
  newAmount: string;
  timestamp: string;
}

export interface OracleWithdrawEventMoveStruct {
  oracle_address: string;
  destination_wallet: string;
  previous_amount: string;
  new_amount: string;
  timestamp: string;
}

export class OracleWithdrawEvent implements IOracleWithdrawEvent {
  readonly oracleAddress: HexString;
  readonly destinationWallet: HexString;
  readonly previousAmount: BN;
  readonly newAmount: BN;
  readonly timestamp: BN;

  constructor(fields: IOracleWithdrawEvent) {
    this.oracleAddress = fields.oracleAddress;
    this.destinationWallet = fields.destinationWallet;
    this.previousAmount = fields.previousAmount;
    this.newAmount = fields.newAmount;
    this.timestamp = fields.timestamp;
  }

  toJSON(): OracleWithdrawEventJSON {
    return {
      oracleAddress: this.oracleAddress.toString(),
      destinationWallet: this.destinationWallet.toString(),
      previousAmount: this.previousAmount.toString(),
      newAmount: this.newAmount.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  static fromJSON(obj: OracleWithdrawEventJSON) {
    return new OracleWithdrawEvent({
      oracleAddress: HexString.ensure(obj.oracleAddress),
      destinationWallet: HexString.ensure(obj.destinationWallet),
      previousAmount: new BN(obj.previousAmount),
      newAmount: new BN(obj.newAmount),
      timestamp: new BN(obj.timestamp),
    });
  }

  toMoveStruct(): OracleWithdrawEventMoveStruct {
    return {
      oracle_address: this.oracleAddress.toString(),
      des