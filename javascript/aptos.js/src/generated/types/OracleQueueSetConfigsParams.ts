import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleQueueSetConfigsParams {
  addr: HexString;
  name: Uint8Array;
  metadata: Uint8Array;
  authority: HexString;
  oracleTimeout: BN;
  reward: BN;
  minStake: BN;
  slashingEnabled: boolean;
  varianceToleranceMultiplier: types.SwitchboardDecimal;
  feedProbationPeriod: BN;
  consecutiveFeedFailureLimit: BN;
  consecutiveOracleFailureLimit: BN;
  unpermissionedFeedsEnabled: boolean;
  lockLeaseFunding: boolean;
  maxSize: BN;
  saveConfirmationReward: BN;
  saveReward: BN;
  openRoundReward: BN;
  slashingPenalty: BN;
}

export interface OracleQueueSetConfigsParamsJSON {
  addr: string;
  name: Array<number>;
  metadata: Array<number>;
  authority: string;
  oracleTimeout: string;
  reward: string;
  minStake: string;
  slashingEnabled: boolean;
  varianceToleranceMultiplier: types.SwitchboardDecimalJSON;
  feedProbationPeriod: string;
  consecutiveFeedFailureLimit: string;
  consecutiveOracleFailureLimit: string;
  unpermissionedFeedsEnabled: boolean;
  lockLeaseFunding: boolean;
  maxSize: string;
  saveConfirmationReward: string;
  saveReward: string;
  openRoundReward: string;
  slashingPenalty: string;
}

export interface OracleQueueSetConfigsParamsMoveStruct {
  addr: string;
  name: string;
  metadata: string;
  authority: string;
  oracle_timeout: string;
  reward: string;
  min_stake: string;
  slashing_enabled: boolean;
  variance_tolerance_multiplier: types.SwitchboardDecimalMoveStruct;
  feed_probation_period: string;
  consecutive_feed_failure_limit: string;
  consecutive_oracle_failure_limit: string;
  unpermissioned_feeds_enabled: boolean;
  lock_lease_funding: boolean;
  max_size: string;
  save_confirmation_reward: string;
  save_reward: string;
  open_round_reward: string;
  slashing_penalty: string;
}

export class OracleQueueSetConfigsParams
  implements IOracleQueueSetConfigsParams
{
  readonly addr: HexString;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly authority: HexString;
  readonly oracleTimeout: BN;
  readonly reward: BN;
  readonly minStake: BN;
  readonly slashingEnabled: boolean;
  readonly varianceToleranceMultiplier: types.SwitchboardDecimal;
  readonly feedProbationPeriod: BN;
  readonly consecutiveFeedFailureLimit: BN;
  readonly consecutiveOracleFailureLimit: BN;
  readonly unpermissionedFeedsEnabled: boolean;
  readonly lockLeaseFunding: boolean;
  readonly maxSize: BN;
  readonly saveConfirmationReward: BN;
  readonly saveReward: BN;
  readonly openRoundReward: BN;
  readonly slashingPenalty: BN;

  constructor(fields: IOracleQueueSetConfigsParams) {
    this.addr = fields.addr;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.authority = fields.authority;
    this.oracleTimeout = fields.oracleTimeout;
    this.reward = fields.reward;
    this.minStake = fields.minStake;
    this.slashingEnabled = fields.slashingEnabled;
    this.varianceToleranceMultiplier = fields.varianceToleranceMultiplier;
    this.feedProbationPeriod = fields.feedProbationPeriod;
    this.consecutiveFeedFailureLimit = fields.consecutiveFeedFailureLimit;
    this.consecutiveOracleFailureLimit = fields.consecutiveOracleFailureLimit;
    this.unpermissionedFeedsEnabled = fields.unpermissionedFeedsEnabled;
    this.lockLeaseFunding = fields.lockLeaseFunding;
    this.maxSize = fields.maxSize;
    this.saveConfirmationReward = fields.saveConfirmationReward;
    this.saveReward = fields.saveReward;
    this.openRoundReward = fields.openRoundReward;
    this.slashingPenalty = fields.slashingPenalty;
  }

  toJSON(): OracleQueueSetConfigsParamsJSON {
    return {
      addr: this.addr.toString(),
      name: [...this.name],
      metadata: [...this.metadata],
      authority: this.authority.toString(),
      oracleTimeout: this.oracleTimeout.toString(),
      reward: this.reward.toString(),
      minStake: this.minStake.toString(),
      slashingEnabled: this.slashingEnabled,
      varianceToleranceMultiplier: this.varianceToleranceMultiplier.toJSON(),
      feedProbationPeriod: this.feedProbationPeriod.toString(),
      consecutiveFeedFailureLimit: this.consecutiveFeedFailureLimit.toString(),
      consecutiveOracleFailureLimit:
        this.consecutiveOracleFailureLimit.toString(),
      unpermissionedFeedsEnabled: this.unpermissionedFeedsEnabled,
      lockLeaseFunding: this.lockLeaseFunding,
      maxSize: this.maxSize.toString(),
      saveConfirmationReward: this.saveConfirmationReward.toString(),
      saveReward: this.saveReward.toString(),
      openRoundReward: this.openRoundReward.toString(),
      slashingPenalty: this.slashingPenalty.toString(),
    };
  }

  static fromJSON(obj: OracleQueueSetConfigsParamsJSON) {
    return new OracleQueueSetConfigsParams({
      addr: HexString.ensure(obj.addr),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      authority: HexString.ensure(obj.authority),
      oracleTimeout: new BN(obj.oracleTimeout),
      reward: new BN(obj.reward),
      minStake: new BN(obj.minStake),
      slashingEnabled: obj.slashingEnabled,
      varianceToleranceMultiplier: types.SwitchboardDecimal.fromJSON(
        obj.varianceToleranceMultiplier
      ),
      feedProbationPeriod: new BN(obj.feedProbationPeriod),
      consecutiveFeedFailureLimit: new BN(obj.consecutiveFeedFailureLimit),
      consecutiveOracleFailureLimit: new BN(obj.consecutiveOracleFailureLimit),
      unpermissionedFeedsEnabled: obj.unpermissionedFeedsEnabled,
      lockLeaseFunding: obj.lockLeaseFunding,
      maxSize: new BN(obj.maxSize),
      saveConfirmationReward: new BN(obj.saveConfirmationReward),
      saveReward: new BN(obj.saveReward),
      openRoundReward: new BN(obj.openRoundReward),
      slashingPenalty: new BN(obj.slashingPenalty),
    });
  }

  toMoveStruct(): OracleQueueSetConfigsParamsMoveStruct {
    return {
      addr: this.addr.toString(),
      name: Buffer.from(this.name).toString("hex"),
      metadata: Buffer.from(this.metadata).toString("hex"),
      authority: this.authority.toString(),
      oracle_timeout: this.oracleTimeout.toString(),
      reward: this.reward.toString(),
      min_stake: this.minStake.toString(),
      slashing_enabled: this.slashingEnabled,
      variance_tolerance_multiplier:
        this.varianceToleranceMultiplier.toMoveStruct(),
      feed_probation_period: this.feedProbationPeriod.toString(),
      consecutive_feed_failure_limit:
        this.consecutiveFeedFailureLimit.toString(),
      consecutive_oracle_failure_limit:
        this.consecutiveOracleFailureLimit.toString(),
      unpermissioned_feeds_enabled: this.unpermissionedFeedsEnabled,
      lock_lease_funding: this.lockLeaseFunding,
      max_size: this.maxSize.toString(),
      save_confirmation_reward: this.saveConfirmationReward.toString(),
      save_reward: this.saveReward.toString(),
      open_round_reward: this.openRoundReward.toString(),
      slashing_penalty: this.slashingPenalty.toString(),
    };
  }

  static fromMoveStruct(obj: OracleQueueSetConfigsParamsMoveStruct) {
    return new OracleQueueSetConfigsParams({
      addr: HexString.ensure(obj.addr),
      name:
        typeof obj.name === "string"
          ? new Uint8Array(Buffer.from(obj.name.slice(2), "hex"))
          : new Uint8Array(obj.name),
      metadata:
        typeof obj.metadata === "string"
          ? new Uint8Array(Buffer.from(obj.metadata.slice(2), "hex"))
          : new Uint8Array(obj.metadata),
      authority: HexString.ensure(obj.authority),
      oracleTimeout: new BN(obj.oracle_timeout),
      reward: new BN(obj.reward),
      minStake: new BN(obj.min_stake),
      slashingEnabled: obj.slashing_enabled,
      varianceToleranceMultiplier: types.SwitchboardDecimal.fromMoveStruct(
        obj.variance_tolerance_multiplier
      ),
      feedProbationPeriod: new BN(obj.feed_probation_period),
      consecutiveFeedFailureLimit: new BN(obj.consecutive_feed_failure_limit),
      consecutiveOracleFailureLimit: new BN(
        obj.consecutive_oracle_failure_limit
      ),
      unpermissionedFeedsEnabled: obj.unpermissioned_feeds_enabled,
      lockLeaseFunding: obj.lock_lease_funding,
      maxSize: new BN(obj.max_size),
      saveConfirmationReward: new BN(obj.save_confirmation_reward),
      saveReward: new BN(obj.save_reward),
      openRoundReward: new BN(obj.open_round_reward),
      slashingPenalty: new BN(obj.slashing_penalty),
    });
  }
}
