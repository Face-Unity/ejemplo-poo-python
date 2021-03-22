
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorConfig {
  queueAddr: HexString;
  batchSize: BN;
  minOracleResults: BN;
  minUpdateDelaySeconds: BN;
  historyLimit: BN;
  varianceThreshold: types.SwitchboardDecimal;
  forceReportPeriod: BN;
  minJobResults: BN;
  expiration: BN;
  crankAddr: HexString;
  crankDisabled: boolean;
  crankRowCount: BN;
  nextAllowedUpdateTime: BN;
  consecutiveFailureCount: BN;
  startAfter: BN;
}

export interface AggregatorConfigJSON {
  queueAddr: string;
  batchSize: string;
  minOracleResults: string;
  minUpdateDelaySeconds: string;
  historyLimit: string;
  varianceThreshold: types.SwitchboardDecimalJSON;
  forceReportPeriod: string;
  minJobResults: string;
  expiration: string;
  crankAddr: string;
  crankDisabled: boolean;
  crankRowCount: string;
  nextAllowedUpdateTime: string;
  consecutiveFailureCount: string;
  startAfter: string;
}

export interface AggregatorConfigMoveStruct {
  queue_addr: string;
  batch_size: string;
  min_oracle_results: string;
  min_update_delay_seconds: string;
  history_limit: string;
  variance_threshold: types.SwitchboardDecimalMoveStruct;
  force_report_period: string;
  min_job_results: string;
  expiration: string;
  crank_addr: string;
  crank_disabled: boolean;
  crank_row_count: string;
  next_allowed_update_time: string;
  consecutive_failure_count: string;
  start_after: string;
}

export class AggregatorConfig implements IAggregatorConfig {
  readonly queueAddr: HexString;
  readonly batchSize: BN;
  readonly minOracleResults: BN;
  readonly minUpdateDelaySeconds: BN;
  readonly historyLimit: BN;
  readonly varianceThreshold: types.SwitchboardDecimal;
  readonly forceReportPeriod: BN;
  readonly minJobResults: BN;
  readonly expiration: BN;
  readonly crankAddr: HexString;
  readonly crankDisabled: boolean;
  readonly crankRowCount: BN;
  readonly nextAllowedUpdateTime: BN;
  readonly consecutiveFailureCount: BN;
  readonly startAfter: BN;

  constructor(fields: IAggregatorConfig) {
    this.queueAddr = fields.queueAddr;
    this.batchSize = fields.batchSize;
    this.minOracleResults = fields.minOracleResults;
    this.minUpdateDelaySeconds = fields.minUpdateDelaySeconds;
    this.historyLimit = fields.historyLimit;
    this.varianceThreshold = fields.varianceThreshold;
    this.forceReportPeriod = fields.forceReportPeriod;
    this.minJobResults = fields.minJobResults;
    this.expiration = fields.expiration;
    this.crankAddr = fields.crankAddr;
    this.crankDisabled = fields.crankDisabled;
    this.crankRowCount = fields.crankRowCount;
    this.nextAllowedUpdateTime = fields.nextAllowedUpdateTime;
    this.consecutiveFailureCount = fields.consecutiveFailureCount;
    this.startAfter = fields.startAfter;
  }

  toJSON(): AggregatorConfigJSON {
    return {
      queueAddr: this.queueAddr.toString(),
      batchSize: this.batchSize.toString(),
      minOracleResults: this.minOracleResults.toString(),
      minUpdateDelaySeconds: this.minUpdateDelaySeconds.toString(),
      historyLimit: this.historyLimit.toString(),
      varianceThreshold: this.varianceThreshold.toJSON(),
      forceReportPeriod: this.forceReportPeriod.toString(),
      minJobResults: this.minJobResults.toString(),
      expiration: this.expiration.toString(),
      crankAddr: this.crankAddr.toString(),
      crankDisabled: this.crankDisabled,
      crankRowCount: this.crankRowCount.toString(),
      nextAllowedUpdateTime: this.nextAllowedUpdateTime.toString(),
      consecutiveFailureCount: this.consecutiveFailureCount.toString(),
      startAfter: this.startAfter.toString(),
    };
  }

  static fromJSON(obj: AggregatorConfigJSON) {
    return new AggregatorConfig({
      queueAddr: HexString.ensure(obj.queueAddr),
      batchSize: new BN(obj.batchSize),
      minOracleResults: new BN(obj.minOracleResults),
      minUpdateDelaySeconds: new BN(obj.minUpdateDelaySeconds),
      historyLimit: new BN(obj.historyLimit),
      varianceThreshold: types.SwitchboardDecimal.fromJSON(
        obj.varianceThreshold
      ),
      forceReportPeriod: new BN(obj.forceReportPeriod),
      minJobResults: new BN(obj.minJobResults),
      expiration: new BN(obj.expiration),
      crankAddr: HexString.ensure(obj.crankAddr),
      crankDisabled: obj.crankDisabled,
      crankRowCount: new BN(obj.crankRowCount),
      nextAllowedUpdateTime: new BN(obj.nextAllowedUpdateTime),
      consecutiveFailureCount: new BN(obj.consecutiveFailureCount),
      startAfter: new BN(obj.startAfter),
    });
  }

  toMoveStruct(): AggregatorConfigMoveStruct {
    return {
      queue_addr: this.queueAddr.toString(),
      batch_size: this.batchSize.toString(),
      min_oracle_results: this.minOracleResults.toString(),
      min_update_delay_seconds: this.minUpdateDelaySeconds.toString(),
      history_limit: this.historyLimit.toString(),
      variance_threshold: this.varianceThreshold.toMoveStruct(),
      force_report_period: this.forceReportPeriod.toString(),
      min_job_results: this.minJobResults.toString(),
      expiration: this.expiration.toString(),
      crank_addr: this.crankAddr.toString(),
      crank_disabled: this.crankDisabled,
      crank_row_count: this.crankRowCount.toString(),
      next_allowed_update_time: this.nextAllowedUpdateTime.toString(),
      consecutive_failure_count: this.consecutiveFailureCount.toString(),
      start_after: this.startAfter.toString(),
    };
  }

  static fromMoveStruct(obj: AggregatorConfigMoveStruct) {
    return new AggregatorConfig({
      queueAddr: HexString.ensure(obj.queue_addr),
      batchSize: new BN(obj.batch_size),
      minOracleResults: new BN(obj.min_oracle_results),
      minUpdateDelaySeconds: new BN(obj.min_update_delay_seconds),
      historyLimit: new BN(obj.history_limit),
      varianceThreshold: types.SwitchboardDecimal.fromMoveStruct(
        obj.variance_threshold
      ),
      forceReportPeriod: new BN(obj.force_report_period),
      minJobResults: new BN(obj.min_job_results),
      expiration: new BN(obj.expiration),
      crankAddr: HexString.ensure(obj.crank_addr),
      crankDisabled: obj.crank_disabled,
      crankRowCount: new BN(obj.crank_row_count),
      nextAllowedUpdateTime: new BN(obj.next_allowed_update_time),
      consecutiveFailureCount: new BN(obj.consecutive_failure_count),
      startAfter: new BN(obj.start_after),
    });
  }
}