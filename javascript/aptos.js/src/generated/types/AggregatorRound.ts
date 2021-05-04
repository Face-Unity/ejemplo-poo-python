import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorRound {
  id: BN;
  roundOpenTimestamp: BN;
  roundOpenBlockHeight: BN;
  result: types.SwitchboardDecimal;
  stdDeviation: types.SwitchboardDecimal;
  minResponse: types.SwitchboardDecimal;
  maxResponse: types.SwitchboardDecimal;
  oracleKeys: Array<HexString>;
  medians: Array<types.SwitchboardDecimal | undefined>;
  currentPayout: Array<types.SwitchboardDecimal>;
  errorsFulfilled: Array<boolean>;
  numSuccess: BN;
  numError: BN;
  isClosed: boolean;
  roundConfirmedTimestamp: BN;
}

export interface AggregatorRoundJSON {
  id: string;
  roundOpenTimestamp: string;
  roundOpenBlockHeight: string;
  result: types.SwitchboardDecimalJSON;
  stdDeviation: types.SwitchboardDecimalJSON;
  minResponse: types.SwitchboardDecimalJSON;
  maxResponse: types.SwitchboardDecimalJSON;
  oracleKeys: Array<string>;
  medians: Array<types.SwitchboardDecimalJSON | undefined>;
  currentPayout: Array<types.SwitchboardDecimalJSON>;
  e