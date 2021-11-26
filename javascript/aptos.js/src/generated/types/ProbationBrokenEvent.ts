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

  constructor(fields: