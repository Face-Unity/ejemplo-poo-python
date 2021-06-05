import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankLeaseInsufficientFundsEvent {
  aggregatorAddress: HexString;
}

export interface CrankLeaseInsufficientFundsEventJSON {
  aggregatorAddress: string;
}

export interface CrankLeaseInsufficientFundsEventMoveStruct {
  aggregator_address: string;
}

export class CrankLeaseInsufficientFundsEvent
  implements ICrankLeaseInsufficientFundsEvent
{
  readonly aggregatorAddress: HexString;

  constructor(fields: ICrankLeaseInsufficientFundsEvent) {
    this.aggregatorAddress = fields.aggregatorAddress;
  }

  toJSON(): CrankLeaseInsufficientFundsEventJSON {
    return {
      aggregatorAddress: this.aggregatorAddress.toString(),
    };
  }

  static fromJSON(obj: CrankLeaseInsufficientFundsEventJSON) {
    return new CrankLeaseInsufficientFundsEvent({
      aggregatorAddress: HexString.ensure(obj.aggregatorAddress),
    });
  }

  toMoveStruct(): CrankLeaseInsufficientFundsEventMoveStruct {
    return {
      aggregator_address: this.agg