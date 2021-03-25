import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorHistoryRow {
  value: types.SwitchboardDecimal;
  timestamp: BN;
  roundId: BN;
}

export interface AggregatorHistoryRowJSON {
  value: t