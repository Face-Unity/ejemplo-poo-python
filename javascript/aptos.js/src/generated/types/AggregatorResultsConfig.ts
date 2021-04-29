import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorResultsConfig {
  varianceThreshold: types.SwitchboardDecimal;
  forceReportPeriod: BN;
  minJobResults: BN;
  expiration: BN;
}

export interface AggregatorResultsConfigJSON {
  varianceThreshold: types.SwitchboardDecimalJSON;
  forceReportPeriod: string;
  minJobResults: string;
  expiration: string;
}

export interface AggregatorResultsConfigMoveStruct {
  variance_threshold: types.SwitchboardDecimalMoveStruct;
  force_report_period: string;
  min_job_results: