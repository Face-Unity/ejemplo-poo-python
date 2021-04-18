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
    this.j