
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleQueueConfig {
  authority: HexString;
  reward: BN;
  openRoundReward: BN;
  saveReward: BN;
  saveConfirmationReward: BN;
  slashingPenalty: BN;
  slashingEnabled: boolean;
  unpermissionedFeedsEnabled: boolean;
  varianceToleranceMultiplier: types.SwitchboardDecimal;
  oracleTimeout: BN;
}

export interface OracleQueueConfigJSON {
  authority: string;
  reward: string;
  openRoundReward: string;
  saveReward: string;
  saveConfirmationReward: string;
  slashingPenalty: string;
  slashingEnabled: boolean;
  unpermissionedFeedsEnabled: boolean;
  varianceToleranceMultiplier: types.SwitchboardDecimalJSON;
  oracleTimeout: string;
}

export interface OracleQueueConfigMoveStruct {
  authority: string;
  reward: string;
  open_round_reward: string;
  save_reward: string;
  save_confirmation_reward: string;
  slashing_penalty: string;
  slashing_enabled: boolean;
  unpermissioned_feeds_enabled: boolean;
  variance_tolerance_multiplier: types.SwitchboardDecimalMoveStruct;
  oracle_timeout: string;
}

export class OracleQueueConfig implements IOracleQueueConfig {
  readonly authority: HexString;
  readonly reward: BN;
  readonly openRoundReward: BN;
  readonly saveReward: BN;
  readonly saveConfirmationReward: BN;
  readonly slashingPenalty: BN;
  readonly slashingEnabled: boolean;
  readonly unpermissionedFeedsEnabled: boolean;
  readonly varianceToleranceMultiplier: types.SwitchboardDecimal;
  readonly oracleTimeout: BN;

  constructor(fields: IOracleQueueConfig) {
    this.authority = fields.authority;
    this.reward = fields.reward;
    this.openRoundReward = fields.openRoundReward;
    this.saveReward = fields.saveReward;
    this.saveConfirmationReward = fields.saveConfirmationReward;
    this.slashingPenalty = fields.slashingPenalty;
    this.slashingEnabled = fields.slashingEnabled;
    this.unpermissionedFeedsEnabled = fields.unpermissionedFeedsEnabled;
    this.varianceToleranceMultiplier = fields.varianceToleranceMultiplier;
    this.oracleTimeout = fields.oracleTimeout;
  }

  toJSON(): OracleQueueConfigJSON {
    return {
      authority: this.authority.toString(),
      reward: this.reward.toString(),
      openRoundReward: this.openRoundReward.toString(),
      saveReward: this.saveReward.toString(),
      saveConfirmationReward: this.saveConfirmationReward.toString(),
      slashingPenalty: this.slashingPenalty.toString(),
      slashingEnabled: this.slashingEnabled,
      unpermissionedFeedsEnabled: this.unpermissionedFeedsEnabled,
      varianceToleranceMultiplier: this.varianceToleranceMultiplier.toJSON(),
      oracleTimeout: this.oracleTimeout.toString(),
    };
  }

  static fromJSON(obj: OracleQueueConfigJSON) {
    return new OracleQueueConfig({
      authority: HexString.ensure(obj.authority),
      reward: new BN(obj.reward),
      openRoundReward: new BN(obj.openRoundReward),
      saveReward: new BN(obj.saveReward),