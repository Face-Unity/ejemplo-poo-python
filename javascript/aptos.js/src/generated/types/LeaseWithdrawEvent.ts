import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ILeaseWithdrawEvent {
  leaseAddress: HexString;
  destinationWallet: HexString;
  previousAmount: BN;
  newAmount: BN;
  timestamp: BN;
}

export interface LeaseWithdrawEventJSON {
  leaseAddress: string;
  destinationWallet: string;
  previousAmount: string;
  newAmount: string;
  timestamp: string;
}

export interface LeaseWithdrawEventMoveStruct {
  lease_address: string;
  destination_wallet: string;
  previous_amount: string;
  new_amount: string;
  timestamp: string;
}

export class LeaseWithdrawEvent implements ILeaseWithdrawEvent {
  readonly leaseAddress: HexString;
  readonly destinationWallet: HexString;
  readonly previousAmount: BN;
  readonly newAmount: BN;
  readonly timestamp: BN;

  constructor(fields: ILeaseWithdrawEvent) {
    this.leaseAddress = fields.leaseAddress;
    this.destinationWallet = fields.destinationWallet;
    this.previousAmount = fields.previousAmount;
    this.newAmount = fields.newAmount;
    this.timestamp = fields.timestamp;
  }

  toJSON(): LeaseWithdrawEventJSON {
    return {
      leaseAddress: this.leaseAddress.toString(),
      destinationWallet: this.destinationWallet.toString(),
      previousAmount: this.previousAmount.toString(),
      newAmount: this.newAmount.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  static fromJSON(obj: LeaseWithdr