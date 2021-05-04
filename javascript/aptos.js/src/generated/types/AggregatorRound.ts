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
  isC