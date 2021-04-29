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
  min_job_results: string;
  expiration: string;
}

export class AggregatorResultsConfig implements IAggregatorResultsConfig {
  readonly varianceThreshold: types.SwitchboardDecimal;
  readonly forceReportPeriod: BN;
  readonly minJobResults: BN;
  readonly expiration: BN;

  constructor(fields: IAggregatorResultsConfig) {
    this.varianceThreshold = fields.varianceThreshold;
    this.forceReportPeriod = fields.forceReportPeriod;
    this.minJobResults = fields.minJobResults;
    this.expiration = fields.expiration;
  }

  toJSON(): AggregatorResultsConfigJSON {
    return {
      varianceThreshold: this.varianceThreshold.toJSON(),
      forceReportPeriod: this.forceReportPeriod.toString(),
      minJobResults: this.minJobResults.toString(),
      expiration: this.expiration.toString(),
    };
  }

  static fromJSON(obj: AggregatorResultsConfigJSON) {
    return new AggregatorResultsConfig({
      varianceThreshold: types.SwitchboardDecimal.fromJSON(
        obj.varianceThreshold
      ),
      forceReportPeriod: new BN(obj.forceReportPeriod