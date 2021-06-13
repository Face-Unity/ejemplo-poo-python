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