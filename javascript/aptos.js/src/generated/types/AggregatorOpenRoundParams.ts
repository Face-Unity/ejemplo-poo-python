import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorOpenRoundParams {
  aggregatorAddr: HexString;
  jitter: BN;
}

export interface AggregatorOpenRoundParamsJSON {
  aggregatorAddr: string;
  jitter: string;
}

export interface AggregatorOpenRoundParamsMov