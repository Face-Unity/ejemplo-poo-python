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
  errorsFulfilled: Array<boolean>;
  numSuccess: string;
  numError: string;
  isClosed: boolean;
  roundConfirmedTimestamp: string;
}

export interface AggregatorRoundMoveStruct {
  id: string;
  round_open_timestamp: string;
  round_open_block_height: string;
  result: types.SwitchboardDecimalMoveStruct;
  std_deviation: types.SwitchboardDecimalMoveStruct;
  min_response: types.SwitchboardDecimalMoveStruct;
  max_response: types.SwitchboardDecimalMoveStruct;
  oracle_keys: Array<string>;
  medians: Array<types.OptionalMoveStruct<types.SwitchboardDecimalJSON>>;
  current_payout: Array<types.SwitchboardDecimalMoveStruct>;
  errors_fulfilled: Array<boolean>;
  num_success: string;
  num_error: string;
  is_closed: boolean;
  round_confirmed_timestamp: string;
}

export class AggregatorRound implements IAggregatorRound {
  readonly id: BN;
  readonly roundOpenTimestamp: BN;
  readonly roundOpenBlockHeight: BN;
  readonly result: types.SwitchboardDecimal;
  readonly stdDeviation: types.SwitchboardDecimal;
  re