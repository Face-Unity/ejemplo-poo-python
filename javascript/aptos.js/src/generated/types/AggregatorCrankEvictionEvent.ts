
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorCrankEvictionEvent {
  crankAddress: HexString;
  aggregatorAddress: HexString;
  reason: BN;
  timestamp: BN;
}

export interface AggregatorCrankEvictionEventJSON {
  crankAddress: string;
  aggregatorAddress: string;
  reason: string;
  timestamp: string;
}

export interface AggregatorCrankEvictionEventMoveStruct {
  crank_address: string;
  aggregator_address: string;
  reason: string;
  timestamp: string;
}

export class AggregatorCrankEvictionEvent
  implements IAggregatorCrankEvictionEvent
{
  readonly crankAddress: HexString;
  readonly aggregatorAddress: HexString;
  readonly reason: BN;
  readonly timestamp: BN;

  constructor(fields: IAggregatorCrankEvictionEvent) {
    this.crankAddress = fields.crankAddress;
    this.aggregatorAddress = fields.aggregatorAddress;
    this.reason = fields.reason;
    this.timestamp = fields.timestamp;
  }

  toJSON(): AggregatorCrankEvictionEventJSON {
    return {
      crankAddress: this.crankAddress.toString(),
      aggregatorAddress: this.aggregatorAddress.toString(),
      reason: this.reason.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  static fromJSON(obj: AggregatorCrankEvictionEventJSON) {
    return new AggregatorCrankEvictionEvent({
      crankAddress: HexString.ensure(obj.crankAddress),
      aggregatorAddress: HexString.ensure(obj.aggregatorAddress),
      reason: new BN(obj.reason),
      timestamp: new BN(obj.timestamp),
    });
  }

  toMoveStruct(): AggregatorCrankEvictionEventMoveStruct {
    return {
      crank_address: this.crankAddress.toString(),
      aggregator_address: this.aggregatorAddress.toString(),
      reason: this.reason.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  static fromMoveStruct(obj: AggregatorCrankEvictionEventMoveStruct) {
    return new AggregatorCrankEvictionEvent({
      crankAddress: HexString.ensure(obj.crank_address),
      aggregatorAddress: HexString.ensure(obj.aggregator_address),
      reason: new BN(obj.reason),
      timestamp: new BN(obj.timestamp),
    });
  }
}