import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleQueueInitParams {
  authority: HexString;
  name: Uint8Array;
  metadata: Uint8Array;
  oracleTimeout: BN;
  reward: BN;
  minStake: BN;
  slashingEnabled: boolean;
  varianceToleranceMultiplier: types.SwitchboardDecimal;
  feedProbationPeriod: BN;
  consecutiveFeedFailureLimit: BN;
  consecutiveOracleFailureLimit: BN;
  unpermissionedFeedsEnabled: boolean;
  unpermissionedVrfEnabled: boolean;
  lockLeaseFunding: boolean;
  enableBufferRelayers: boolean;
  maxSize: BN;
  data: Array<HexString>;
  saveConfirmationReward: BN;
  saveReward: BN;
  openRoundReward: BN;
  slashingPenalty: BN;
}

export interface OracleQueueInitParamsJSON {
  authority: string;
  name: Array<number>;
  metadata: Array<number>;
  oracleTimeout: string;
  reward: string;
  minStake: string;
  slashingEnabled: boolean;
  varianceToleranceMultiplier: types.SwitchboardDecimalJSON;
  feedProbationPeriod: string;
  consecutiveFeedFailureLimit: string;
  consecutiveOracleFailureLimit: string;
  unpermissionedFeedsEnabled: boolean;
  unpermissionedVrfEnabled: boolean;
  lockLeaseFunding: boolean;
  enableBufferRelayers: boolean;
  maxSize: string;
  data: Array<string>;
  saveConfirmationReward: string;
  saveReward: string;
  openRoundReward: string;
  slashingPenalty: string;
}

export interface OracleQueueInitParamsMoveStruct {
  authority: string;
  name: string;
  metadata: string;
  oracle_timeout: string;
  reward: string;
  min_stake: string;
  slashing_enabled: boolean;
  variance_tolerance_multiplier: types.SwitchboardDecimalMoveStruct;
  feed_probation_period: string;
  consecutive_feed_failure_limit: string;
  consecutive_oracle_failure_limit: string;
  unpermissioned_feeds_enabled: boolean;
  unpermissioned_vrf_enabled: boolean;
  lock_lease_funding: boolean;
  enable_buffer_relayers: boolean;
  max_size: string;
  data: Array<string>;
  save_confirmation_reward: string;
  save_reward: string;
  open_round_reward: string;
  slashing_penalty: string;
}

export class OracleQueueInitParams implements IOracleQueueInitParams {
  readonly authority: HexString;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly oracleTimeout: BN;
  readonly reward: BN;
  readonly minStake: BN;
  readonly slashingEnabled: boolean;
  readonly varianceToleranceMultiplier: types.SwitchboardDecimal;
  readonly feedProbationPeriod: BN;
  readonly consecutiveFeedFailureLimit: BN;
  readonly consecutiveOracleFailureLimit: BN;
  readonly unpermissionedFeedsEnabled: boolean;
  readonly unpermissionedVrfEnabled: boolean;
  readonly lockLeaseFunding: boolean;
  readonly enableBufferRelayers: boolean;
  readonly maxSize: BN;
  readonly data: Array<HexString>;
  readonly saveConfirmationReward: BN;
  readonly saveReward: BN;
  readonly openRoundReward: BN;
  readonly slashingPenalty: BN;

  constructor(fields: IOracleQueueInitParams) {
    this.authority = fields.authority;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.oracleTimeout = fields.oracleTimeout;
    this.reward = fields.reward;
    this.minStake = fiel