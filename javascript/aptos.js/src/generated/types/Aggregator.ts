
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregator {
  signerCap: types.SignerCapability;
  authority: HexString;
  name: Uint8Array;
  metadata: Uint8Array;
  queueAddr: HexString;
  batchSize: BN;
  minOracleResults: BN;
  minJobResults: BN;
  minUpdateDelaySeconds: BN;
  startAfter: BN;
  varianceThreshold: types.SwitchboardDecimal;
  forceReportPeriod: BN;
  expiration: BN;
  readCharge: BN;
  rewardEscrow: HexString;
  readWhitelist: Array<HexString>;
  crankDisabled: boolean;
  historyLimit: BN;
  limitReadsToWhitelist: boolean;
  nextAllowedUpdateTime: BN;
  consecutiveFailureCount: BN;
  crankAddr: HexString;
  latestConfirmedRound: types.AggregatorRound;
  currentRound: types.AggregatorRound;
  jobKeys: Array<HexString>;
  jobWeights: Uint8Array;
  jobsChecksum: Uint8Array;
  history: Array<types.AggregatorHistoryRow>;
  historyWriteIdx: BN;
  createdAt: BN;
  isLocked: boolean;
  crankRowCount: BN;
  _ebuf: Uint8Array;
  features: Array<boolean>;
}

export interface AggregatorJSON {
  signerCap: types.SignerCapabilityJSON;
  authority: string;
  name: Array<number>;
  metadata: Array<number>;
  queueAddr: string;
  batchSize: string;
  minOracleResults: string;
  minJobResults: string;
  minUpdateDelaySeconds: string;
  startAfter: string;
  varianceThreshold: types.SwitchboardDecimalJSON;
  forceReportPeriod: string;
  expiration: string;
  readCharge: string;
  rewardEscrow: string;
  readWhitelist: Array<string>;
  crankDisabled: boolean;
  historyLimit: string;
  limitReadsToWhitelist: boolean;
  nextAllowedUpdateTime: string;
  consecutiveFailureCount: string;
  crankAddr: string;
  latestConfirmedRound: types.AggregatorRoundJSON;
  currentRound: types.AggregatorRoundJSON;
  jobKeys: Array<string>;
  jobWeights: Array<number>;
  jobsChecksum: Array<number>;
  history: Array<types.AggregatorHistoryRowJSON>;
  historyWriteIdx: string;
  createdAt: string;
  isLocked: boolean;
  crankRowCount: string;
  _ebuf: Array<number>;
  features: Array<boolean>;
}

export interface AggregatorMoveStruct {
  signer_cap: types.SignerCapabilityMoveStruct;
  authority: string;
  name: string;
  metadata: string;
  queue_addr: string;
  batch_size: string;
  min_oracle_results: string;
  min_job_results: string;
  min_update_delay_seconds: string;
  start_after: string;
  variance_threshold: types.SwitchboardDecimalMoveStruct;
  force_report_period: string;
  expiration: string;
  read_charge: string;
  reward_escrow: string;
  read_whitelist: Array<string>;
  crank_disabled: boolean;
  history_limit: string;
  limit_reads_to_whitelist: boolean;
  next_allowed_update_time: string;
  consecutive_failure_count: string;
  crank_addr: string;
  latest_confirmed_round: types.AggregatorRoundMoveStruct;
  current_round: types.AggregatorRoundMoveStruct;
  job_keys: Array<string>;
  job_weights: string;
  jobs_checksum: string;
  history: Array<types.AggregatorHistoryRowMoveStruct>;
  history_write_idx: string;
  created_at: string;
  is_locked: boolean;
  crank_row_count: string;
  _ebuf: string;
  features: Array<boolean>;
}

export class Aggregator implements IAggregator {
  readonly signerCap: types.SignerCapability;
  readonly authority: HexString;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly queueAddr: HexString;
  readonly batchSize: BN;
  readonly minOracleResults: BN;
  readonly minJobResults: BN;
  readonly minUpdateDelaySeconds: BN;
  readonly startAfter: BN;
  readonly varianceThreshold: types.SwitchboardDecimal;
  readonly forceReportPeriod: BN;
  readonly expiration: BN;
  readonly readCharge: BN;
  readonly rewardEscrow: HexString;
  readonly readWhitelist: Array<HexString>;
  readonly crankDisabled: boolean;
  readonly historyLimit: BN;
  readonly limitReadsToWhitelist: boolean;
  readonly nextAllowedUpdateTime: BN;
  readonly consecutiveFailureCount: BN;
  readonly crankAddr: HexString;
  readonly latestConfirmedRound: types.AggregatorRound;
  readonly currentRound: types.AggregatorRound;
  readonly jobKeys: Array<HexString>;
  readonly jobWeights: Uint8Array;
  readonly jobsChecksum: Uint8Array;
  readonly history: Array<types.AggregatorHistoryRow>;
  readonly historyWriteIdx: BN;
  readonly createdAt: BN;
  readonly isLocked: boolean;
  readonly crankRowCount: BN;
  readonly _ebuf: Uint8Array;
  readonly features: Array<boolean>;

  constructor(fields: IAggregator) {
    this.signerCap = fields.signerCap;
    this.authority = fields.authority;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.queueAddr = fields.queueAddr;
    this.batchSize = fields.batchSize;
    this.minOracleResults = fields.minOracleResults;
    this.minJobResults = fields.minJobResults;
    this.minUpdateDelaySeconds = fields.minUpdateDelaySeconds;
    this.startAfter = fields.startAfter;
    this.varianceThreshold = fields.varianceThreshold;
    this.forceReportPeriod = fields.forceReportPeriod;
    this.expiration = fields.expiration;
    this.readCharge = fields.readCharge;
    this.rewardEscrow = fields.rewardEscrow;
    this.readWhitelist = fields.readWhitelist;
    this.crankDisabled = fields.crankDisabled;
    this.historyLimit = fields.historyLimit;
    this.limitReadsToWhitelist = fields.limitReadsToWhitelist;
    this.nextAllowedUpdateTime = fields.nextAllowedUpdateTime;
    this.consecutiveFailureCount = fields.consecutiveFailureCount;
    this.crankAddr = fields.crankAddr;
    this.latestConfirmedRound = fields.latestConfirmedRound;
    this.currentRound = fields.currentRound;
    this.jobKeys = fields.jobKeys;
    this.jobWeights = fields.jobWeights;
    this.jobsChecksum = fields.jobsChecksum;
    this.history = fields.history;
    this.historyWriteIdx = fields.historyWriteIdx;
    this.createdAt = fields.createdAt;
    this.isLocked = fields.isLocked;
    this.crankRowCount = fields.crankRowCount;
    this._ebuf = fields._ebuf;
    this.features = fields.features;
  }

  toJSON(): AggregatorJSON {
    return {
      signerCap: this.signerCap.toJSON(),
      authority: this.authority.toString(),
      name: [...this.name],
      metadata: [...this.metadata],
      queueAddr: this.queueAddr.toString(),
      batchSize: this.batchSize.toString(),
      minOracleResults: this.minOracleResults.toString(),
      minJobResults: this.minJobResults.toString(),
      minUpdateDelaySeconds: this.minUpdateDelaySeconds.toString(),
      startAfter: this.startAfter.toString(),
      varianceThreshold: this.varianceThreshold.toJSON(),
      forceReportPeriod: this.forceReportPeriod.toString(),
      expiration: this.expiration.toString(),
      readCharge: this.readCharge.toString(),
      rewardEscrow: this.rewardEscrow.toString(),
      readWhitelist: this.readWhitelist.map((item) => item.toString()),
      crankDisabled: this.crankDisabled,
      historyLimit: this.historyLimit.toString(),
      limitReadsToWhitelist: this.limitReadsToWhitelist,
      nextAllowedUpdateTime: this.nextAllowedUpdateTime.toString(),
      consecutiveFailureCount: this.consecutiveFailureCount.toString(),
      crankAddr: this.crankAddr.toString(),
      latestConfirmedRound: this.latestConfirmedRound.toJSON(),
      currentRound: this.currentRound.toJSON(),
      jobKeys: this.jobKeys.map((item) => item.toString()),
      jobWeights: [...this.jobWeights],
      jobsChecksum: [...this.jobsChecksum],
      history: this.history.map((item) => item.toJSON()),
      historyWriteIdx: this.historyWriteIdx.toString(),
      createdAt: this.createdAt.toString(),
      isLocked: this.isLocked,
      crankRowCount: this.crankRowCount.toString(),
      _ebuf: [...this._ebuf],
      features: this.features.map((item) => item),
    };
  }

  static fromJSON(obj: AggregatorJSON) {
    return new Aggregator({
      signerCap: types.SignerCapability.fromJSON(obj.signerCap),
      authority: HexString.ensure(obj.authority),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      queueAddr: HexString.ensure(obj.queueAddr),
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
      readCharge: new BN(obj.readCharge),
      rewardEscrow: HexString.ensure(obj.rewardEscrow),
      readWhitelist: obj.readWhitelist.map((item) => HexString.ensure(item)),
      crankDisabled: obj.crankDisabled,
      historyLimit: new BN(obj.historyLimit),
      limitReadsToWhitelist: obj.limitReadsToWhitelist,
      nextAllowedUpdateTime: new BN(obj.nextAllowedUpdateTime),
      consecutiveFailureCount: new BN(obj.consecutiveFailureCount),
      crankAddr: HexString.ensure(obj.crankAddr),
      latestConfirmedRound: types.AggregatorRound.fromJSON(
        obj.latestConfirmedRound
      ),
      currentRound: types.AggregatorRound.fromJSON(obj.currentRound),
      jobKeys: obj.jobKeys.map((item) => HexString.ensure(item)),
      jobWeights: new Uint8Array(obj.jobWeights),
      jobsChecksum: new Uint8Array(obj.jobsChecksum),
      history: obj.history.map((item) =>
        types.AggregatorHistoryRow.fromJSON(item)
      ),
      historyWriteIdx: new BN(obj.historyWriteIdx),
      createdAt: new BN(obj.createdAt),
      isLocked: obj.isLocked,
      crankRowCount: new BN(obj.crankRowCount),
      _ebuf: new Uint8Array(obj._ebuf),
      features: obj.features.map((item) => item),
    });
  }

  toMoveStruct(): AggregatorMoveStruct {
    return {
      signer_cap: this.signerCap.toMoveStruct(),
      authority: this.authority.toString(),
      name: Buffer.from(this.name).toString("hex"),
      metadata: Buffer.from(this.metadata).toString("hex"),
      queue_addr: this.queueAddr.toString(),
      batch_size: this.batchSize.toString(),
      min_oracle_results: this.minOracleResults.toString(),
      min_job_results: this.minJobResults.toString(),
      min_update_delay_seconds: this.minUpdateDelaySeconds.toString(),
      start_after: this.startAfter.toString(),
      variance_threshold: this.varianceThreshold.toMoveStruct(),
      force_report_period: this.forceReportPeriod.toString(),
      expiration: this.expiration.toString(),
      read_charge: this.readCharge.toString(),
      reward_escrow: this.rewardEscrow.toString(),
      read_whitelist: this.readWhitelist.map((item) => item.toString()),
      crank_disabled: this.crankDisabled,
      history_limit: this.historyLimit.toString(),
      limit_reads_to_whitelist: this.limitReadsToWhitelist,
      next_allowed_update_time: this.nextAllowedUpdateTime.toString(),
      consecutive_failure_count: this.consecutiveFailureCount.toString(),
      crank_addr: this.crankAddr.toString(),
      latest_confirmed_round: this.latestConfirmedRound.toMoveStruct(),
      current_round: this.currentRound.toMoveStruct(),
      job_keys: this.jobKeys.map((item) => item.toString()),
      job_weights: Buffer.from(this.jobWeights).toString("hex"),
      jobs_checksum: Buffer.from(this.jobsChecksum).toString("hex"),
      history: this.history.map((item) => item.toMoveStruct()),
      history_write_idx: this.historyWriteIdx.toString(),
      created_at: this.createdAt.toString(),
      is_locked: this.isLocked,
      crank_row_count: this.crankRowCount.toString(),
      _ebuf: Buffer.from(this._ebuf).toString("hex"),
      features: this.features.map((item) => item),
    };
  }

  static fromMoveStruct(obj: AggregatorMoveStruct) {
    return new Aggregator({
      signerCap: types.SignerCapability.fromMoveStruct(obj.signer_cap),
      authority: HexString.ensure(obj.authority),
      name:
        typeof obj.name === "string"
          ? new Uint8Array(Buffer.from(obj.name.slice(2), "hex"))
          : new Uint8Array(obj.name),
      metadata:
        typeof obj.metadata === "string"
          ? new Uint8Array(Buffer.from(obj.metadata.slice(2), "hex"))
          : new Uint8Array(obj.metadata),
      queueAddr: HexString.ensure(obj.queue_addr),
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
      readCharge: new BN(obj.read_charge),
      rewardEscrow: HexString.ensure(obj.reward_escrow),
      readWhitelist: obj.read_whitelist.map((item) => HexString.ensure(item)),
      crankDisabled: obj.crank_disabled,
      historyLimit: new BN(obj.history_limit),
      limitReadsToWhitelist: obj.limit_reads_to_whitelist,
      nextAllowedUpdateTime: new BN(obj.next_allowed_update_time),
      consecutiveFailureCount: new BN(obj.consecutive_failure_count),
      crankAddr: HexString.ensure(obj.crank_addr),
      latestConfirmedRound: types.AggregatorRound.fromMoveStruct(
        obj.latest_confirmed_round
      ),
      currentRound: types.AggregatorRound.fromMoveStruct(obj.current_round),
      jobKeys: obj.job_keys.map((item) => HexString.ensure(item)),
      jobWeights:
        typeof obj.job_weights === "string"
          ? new Uint8Array(Buffer.from(obj.job_weights.slice(2), "hex"))
          : new Uint8Array(obj.job_weights),
      jobsChecksum:
        typeof obj.jobs_checksum === "string"
          ? new Uint8Array(Buffer.from(obj.jobs_checksum.slice(2), "hex"))
          : new Uint8Array(obj.jobs_checksum),
      history: obj.history.map((item) =>
        types.AggregatorHistoryRow.fromMoveStruct(item)
      ),
      historyWriteIdx: new BN(obj.history_write_idx),
      createdAt: new BN(obj.created_at),
      isLocked: obj.is_locked,
      crankRowCount: new BN(obj.crank_row_count),
      _ebuf:
        typeof obj._ebuf === "string"
          ? new Uint8Array(Buffer.from(obj._ebuf.slice(2), "hex"))
          : new Uint8Array(obj._ebuf),
      features: obj.features.map((item) => item),
    });
  }
}