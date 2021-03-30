import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorInitEvent {
  aggregatorAddress: HexString;
}

export interface AggregatorInitEventJSON {
  aggregatorAddress: string;
}

export interface AggregatorInitEventMoveStruct {
  aggregator_address: string;
}

export class AggregatorInitEvent implements IAggregatorInitEvent {
  readonly aggregatorAddress: HexString;
