import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IProbationBrokenEvent {
  aggregatorAddress: HexString;
  queueAddress: HexString;
  timestamp: BN;
}

export interface ProbationBrokenEventJSON {
  aggregatorAddress: string;
  queueAddress: string;
  timestamp: string;
}

export interface ProbationBrokenEventMoveStruct {
  aggregator_address: string;
  queue_address: string;
  timestamp: string;
}

export class ProbationBrokenEvent implements IProbationBrokenEvent {
  readonly aggregatorAddress: HexString;
  readonly queueAddress: HexString;
  readonly timestamp: BN;

  constructor(fields: IProbationBrokenEvent) {
    this.aggregatorAddress = fields.aggregatorAddress;
    this.queueAddress = fields.queueAddress;
    this.timestamp = fields.timestamp;
  }

  toJSON(): ProbationBrokenEventJSON {
    return {
      aggregatorAddress: this.aggregatorAddress.toString(),
      queueAddress: this.queueAddress.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  static fromJSON(obj: ProbationBrokenEventJSON) {
    return new ProbationBrokenEvent({
      aggregatorAddress: HexString.ensure(obj.a