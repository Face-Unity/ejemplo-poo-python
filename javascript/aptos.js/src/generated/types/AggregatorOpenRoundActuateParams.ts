import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorOpenRoundActuateParams {
  openRoundParams: types.AggregatorOpenRoundParams;
  queueAddr: HexString;
  batchSize: BN;
  jobKeys: Array<HexString>;
  reward: BN;
  openRoundReward: BN;
}

export interface AggregatorOpenRoundActuateParamsJSON {
  openRoundParams: types.AggregatorOpenRoundParamsJSON;
  queueAddr: string;
  batchSize: string;
  jobKeys: Array<string>;
  reward: string;
  openRoundReward: string;
}

export interface AggregatorOpenRoundActuateParamsMoveStruct {
  open_round_params: types.AggregatorOpenRoundParamsMoveStruct;
  queue_addr: string;
  batch_size: string;
  job_keys: Array<string>;
  reward: string;
  open_round_reward: string;
}

export class AggregatorOpenRoundActuateParams
  implements IAggregatorOpenRoundActuateParams
{
  readonly openRoundParams: types.AggregatorOpenRoundParams;
  readonly queueAddr: HexString;
  readonly batchSize: BN;
  readonly jobKeys: Array<HexString>;
  readonly reward: BN;
  readonly openRoundReward: BN;

  constructor(fields: IAggregatorOpenRoundActuateParams) {
    this.openRoundParams = fields.openRoundParams;
    this.queueAddr = fields.queueAddr;
    this.batchSize = fields.batchSize;
    this.jobKeys = fields.jobKeys;
    this.reward = fields.reward;
    this.openRoundReward = fields.openRoundReward;
  }

  toJSON(): AggregatorOpenRoundActuateParamsJSON {
    return {
      openRoundParams: this.openRoundParams.toJSON(),
      queueAddr: this.queueAddr.toString(),
      batchSize: this.batchSize.toString(),
      jobKeys: this.jobKeys.map((item) => item.toString()),
      reward: this.reward.toString(),
      openRoundReward: this.openRoundReward.toString(),
    };
  }

  static fromJSON(obj: AggregatorOpenRoundActuateParamsJSON) {
    return new AggregatorOpenRoundActuateParams({
      openRoundParams: types.AggregatorOpenRoundParams.fromJSON(
        obj.openRoundParams
      ),
      queueAddr: HexString.ensure(obj.queueAddr),
      batchSize: new BN(obj.batchSize),
      jobKeys: obj.jobKeys.map((item) => HexString.ensure(item)),
      reward: new BN(obj.reward),
      openRoundReward: new BN(obj.openRoundReward),
    });
  }

  toMoveStruct(): AggregatorOpenRoundActuateParamsMoveStruct {
    return {
      open_round_params: this.openRoundParams.toMoveStruct(),
      queue_addr: this.queueAddr.toString(),
      batch_size: this.batchSize.toString(),
      job_keys: this.jobKeys.map((item) => item.toString()),
      reward: this.reward.toString(),
      open_round_reward: this.openRoundReward.toString(),
    };
  }

  static fromMoveStruct(obj: AggregatorOpenRoundActuateParamsMoveStruct) {
    return new AggregatorOpenRoundActuateParams({
      openRoundParams: types.Aggregator