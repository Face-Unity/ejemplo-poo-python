import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorHistoryRow {
  value: types.SwitchboardDecimal;
  timestamp: BN;
  roundId: BN;
}

export interface AggregatorHistoryRowJSON {
  value: types.SwitchboardDecimalJSON;
  timestamp: string;
  roundId: string;
}

export interface AggregatorHistoryRowMoveStruct {
  value: types.SwitchboardDecimalMoveStruct;
  timestamp: string;
  round_id: string;
}

export class AggregatorHistoryRow implements IAggregatorHistoryRow {
  readonly value: types.SwitchboardDecimal;
  readonly timestamp: BN;
  readonly roundId: BN;

  constructor(fields: IAggregatorHistoryRow) {
    this.value = fields.value;
    this.timestamp = fields.timestamp;
    this.roundId = fields.