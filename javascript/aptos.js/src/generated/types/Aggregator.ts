
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