import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorHistoryData {
  history: Array<types.AggregatorHistoryRow>;
  historyWriteIdx: BN;
}

export interface AggregatorHistoryDataJSON {
  history: Array<types.AggregatorHistoryRowJSON>;
  historyWriteIdx: string;
}

export interface AggregatorHistoryDataMoveStruct {
  history: Array<types.AggregatorHistoryRowMoveStruct>;
  history_write_idx: string;
}

export class AggregatorHistoryData implements IAggregatorHistoryData {
  readonly history: 