import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IFeedPermissionRevokedEvent {
  aggregatorAddress: HexString;
  timestamp: BN;
}

export interface FeedPermissionRevokedEventJSON {
  aggregatorAddress: string;
  timestamp: string;
}

export interface FeedPermissionRevokedEventMoveStruct {
  aggregator_address: string;
  timestamp: string;
}

export class FeedPermissionRevokedEvent implements IFeedPermissionRevokedEvent {
  readonly aggregatorAddress: HexString;
  readonly timestamp: BN;

  constructor(fields: IFeedPermissionRevokedEvent) {
    this.aggregatorAddress = fields.aggregatorAddress;
    this.timestamp = fields.timestamp;
  }

  toJSON(): FeedPermissionRevokedEventJSON {
    return {
      aggregatorAddress: this.aggregatorAddress.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  static fromJSON(obj: FeedPermissionRevokedEventJSON) {
    return new FeedPermissionRevokedEvent({
      aggregatorAddress: HexString.ensure(obj.aggregatorAddress),
      timestamp: new BN(obj.timestamp),
    });
  }

  toMoveStruct(): FeedPermissionRevokedEventMoveStruct {
    return {
      aggregator_address: this.aggregatorAddress.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  static fromMoveStruct(obj: FeedPermissionRevokedEventMoveStruct) {
    return new FeedPermissionRevok