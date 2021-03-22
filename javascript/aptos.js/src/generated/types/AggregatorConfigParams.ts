
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorConfigParams {
  addr: HexString;
  name: Uint8Array;
  metadata: Uint8Array;
  queueAddr: HexString;
  crankAddr: HexString;
  batchSize: BN;
  minOracleResults: BN;
  minJobResults: BN;
  minUpdateDelaySeconds: BN;
  startAfter: BN;
  varianceThreshold: types.SwitchboardDecimal;
  forceReportPeriod: BN;
  expiration: BN;
  disableCrank: boolean;
  historyLimit: BN;
  readCharge: BN;
  rewardEscrow: HexString;
  readWhitelist: Array<HexString>;
  limitReadsToWhitelist: boolean;
  authority: HexString;
}

export interface AggregatorConfigParamsJSON {
  addr: string;
  name: Array<number>;
  metadata: Array<number>;
  queueAddr: string;
  crankAddr: string;
  batchSize: string;
  minOracleResults: string;
  minJobResults: string;
  minUpdateDelaySeconds: string;
  startAfter: string;
  varianceThreshold: types.SwitchboardDecimalJSON;
  forceReportPeriod: string;
  expiration: string;
  disableCrank: boolean;
  historyLimit: string;
  readCharge: string;
  rewardEscrow: string;
  readWhitelist: Array<string>;
  limitReadsToWhitelist: boolean;
  authority: string;
}

export interface AggregatorConfigParamsMoveStruct {
  addr: string;
  name: string;
  metadata: string;
  queue_addr: string;
  crank_addr: string;
  batch_size: string;
  min_oracle_results: string;
  min_job_results: string;
  min_update_delay_seconds: string;
  start_after: string;
  variance_threshold: types.SwitchboardDecimalMoveStruct;
  force_report_period: string;
  expiration: string;
  disable_crank: boolean;
  history_limit: string;
  read_charge: string;
  reward_escrow: string;
  read_whitelist: Array<string>;
  limit_reads_to_whitelist: boolean;
  authority: string;
}

export class AggregatorConfigParams implements IAggregatorConfigParams {
  readonly addr: HexString;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly queueAddr: HexString;
  readonly crankAddr: HexString;
  readonly batchSize: BN;
  readonly minOracleResults: BN;
  readonly minJobResults: BN;
  readonly minUpdateDelaySeconds: BN;
  readonly startAfter: BN;
  readonly varianceThreshold: types.SwitchboardDecimal;
  readonly forceReportPeriod: BN;
  readonly expiration: BN;
  readonly disableCrank: boolean;
  readonly historyLimit: BN;
  readonly readCharge: BN;
  readonly rewardEscrow: HexString;
  readonly readWhitelist: Array<HexString>;
  readonly limitReadsToWhitelist: boolean;
  readonly authority: HexString;

  constructor(fields: IAggregatorConfigParams) {
    this.addr = fields.addr;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.queueAddr = fields.queueAddr;
    this.crankAddr = fields.crankAddr;
    this.batchSize = fields.batchSize;
    this.minOracleResults = fields.minOracleResults;
    this.minJobResults = fields.minJobResults;
    this.minUpdateDelaySeconds = fields.minUpdateDelaySeconds;
    this.startAfter = fields.startAfter;
    this.varianceThreshold = fields.varianceThreshold;
    this.forceReportPeriod = fields.forceReportPeriod;
    this.expiration = fields.expiration;
    this.disableCrank = fields.disableCrank;
    this.historyLimit = fields.historyLimit;
    this.readCharge = fields.readCharge;
    this.rewardEscrow = fields.rewardEscrow;
    this.readWhitelist = fields.readWhitelist;
    this.limitReadsToWhitelist = fields.limitReadsToWhitelist;
    this.authority = fields.authority;
  }

  toJSON(): AggregatorConfigParamsJSON {
    return {
      addr: this.addr.toString(),
      name: [...this.name],
      metadata: [...this.metadata],
      queueAddr: this.queueAddr.toString(),
      crankAddr: this.crankAddr.toString(),
      batchSize: this.batchSize.toString(),
      minOracleResults: this.minOracleResults.toString(),
      minJobResults: this.minJobResults.toString(),
      minUpdateDelaySeconds: this.minUpdateDelaySeconds.toString(),
      startAfter: this.startAfter.toString(),
      varianceThreshold: this.varianceThreshold.toJSON(),
      forceReportPeriod: this.forceReportPeriod.toString(),
      expiration: this.expiration.toString(),
      disableCrank: this.disableCrank,
      historyLimit: this.historyLimit.toString(),
      readCharge: this.readCharge.toString(),
      rewardEscrow: this.rewardEscrow.toString(),
      readWhitelist: this.readWhitelist.map((item) => item.toString()),
      limitReadsToWhitelist: this.limitReadsToWhitelist,
      authority: this.authority.toString(),
    };
  }

  static fromJSON(obj: AggregatorConfigParamsJSON) {
    return new AggregatorConfigParams({
      addr: HexString.ensure(obj.addr),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      queueAddr: HexString.ensure(obj.queueAddr),
      crankAddr: HexString.ensure(obj.crankAddr),
      batchSize: new BN(obj.batchSize),
      minOracleResults: new BN(obj.minOracleResults),
      minJobResults: new BN(obj.minJobResults),
      minUpdateDelaySeconds: new BN(obj.minUpdateDelaySeconds),
      startAfter: new BN(obj.startAfter),
      varianceThreshold: types.SwitchboardDecimal.fromJSON(
        obj.varianceThreshold
      ),
      forceReportPeriod: new BN(obj.forceReportPeriod),
      expiration: new BN(obj.expiration),
      disableCrank: obj.disableCrank,
      historyLimit: new BN(obj.historyLimit),
      readCharge: new BN(obj.readCharge),
      rewardEscrow: HexString.ensure(obj.rewardEscrow),
      readWhitelist: obj.readWhitelist.map((item) => HexString.ensure(item)),
      limitReadsToWhitelist: obj.limitReadsToWhitelist,
      authority: HexString.ensure(obj.authority),
    });
  }

  toMoveStruct(): AggregatorConfigParamsMoveStruct {
    return {
      addr: this.addr.toString(),
      name: Buffer.from(this.name).toString("hex"),
      metadata: Buffer.from(this.metadata).toString("hex"),
      queue_addr: this.queueAddr.toString(),
      crank_addr: this.crankAddr.toString(),
      batch_size: this.batchSize.toString(),
      min_oracle_results: this.minOracleResults.toString(),
      min_job_results: this.minJobResults.toString(),
      min_update_delay_seconds: this.minUpdateDelaySeconds.toString(),
      start_after: this.startAfter.toString(),
      variance_threshold: this.varianceThreshold.toMoveStruct(),
      force_report_period: this.forceReportPeriod.toString(),
      expiration: this.expiration.toString(),
      disable_crank: this.disableCrank,
      history_limit: this.historyLimit.toString(),
      read_charge: this.readCharge.toString(),
      reward_escrow: this.rewardEscrow.toString(),
      read_whitelist: this.readWhitelist.map((item) => item.toString()),
      limit_reads_to_whitelist: this.limitReadsToWhitelist,
      authority: this.authority.toString(),
    };
  }

  static fromMoveStruct(obj: AggregatorConfigParamsMoveStruct) {
    return new AggregatorConfigParams({
      addr: HexString.ensure(obj.addr),
      name:
        typeof obj.name === "string"
          ? new Uint8Array(Buffer.from(obj.name.slice(2), "hex"))
          : new Uint8Array(obj.name),
      metadata:
        typeof obj.metadata === "string"
          ? new Uint8Array(Buffer.from(obj.metadata.slice(2), "hex"))
          : new Uint8Array(obj.metadata),
      queueAddr: HexString.ensure(obj.queue_addr),
      crankAddr: HexString.ensure(obj.crank_addr),
      batchSize: new BN(obj.batch_size),
      minOracleResults: new BN(obj.min_oracle_results),
      minJobResults: new BN(obj.min_job_results),
      minUpdateDelaySeconds: new BN(obj.min_update_delay_seconds),
      startAfter: new BN(obj.start_after),
      varianceThreshold: types.SwitchboardDecimal.fromMoveStruct(
        obj.variance_threshold
      ),
      forceReportPeriod: new BN(obj.force_report_period),
      expiration: new BN(obj.expiration),
      disableCrank: obj.disable_crank,
      historyLimit: new BN(obj.history_limit),
      readCharge: new BN(obj.read_charge),
      rewardEscrow: HexString.ensure(obj.reward_escrow),
      readWhitelist: obj.read_whitelist.map((item) => HexString.ensure(item)),
      limitReadsToWhitelist: obj.limit_reads_to_whitelist,
      authority: HexString.ensure(obj.authority),
    });
  }
}