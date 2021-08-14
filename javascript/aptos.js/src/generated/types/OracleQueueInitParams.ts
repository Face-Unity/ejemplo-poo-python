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
  feed_probation_per