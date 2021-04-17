import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorOpenRoundActuateParams {
  openRoundParams: types.AggregatorOpenRoundParams;
  queueAddr: HexString;
  batchSize: BN;
  jobKeys: Array<HexString>;
  reward: BN;
  openR