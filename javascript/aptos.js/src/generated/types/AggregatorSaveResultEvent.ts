import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorSaveResultEvent {
  aggregatorAddress: HexString;
  oracleKey: HexString;
  value: types.SwitchboardDecimal;
}

export interface AggregatorSaveResultEventJSON {
  aggregatorAddress: string;
  oracleKey: 