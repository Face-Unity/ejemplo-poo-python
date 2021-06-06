import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankPopExpectedFailureEvent {
  aggregatorAddress: HexString;
}

export interface CrankPopExpectedFailureEventJSON {
  aggregatorAddress: string;
}

export interface CrankPopExpectedFailureEventMoveStruct {
  aggregator_address: string;
}

export class CrankPopExpectedFailureEvent
  implements ICrankPopExpectedFailureEvent
{
  readonly aggregatorAddress: HexString;

  constructor(fields: ICrankPopExpectedFailureEvent) {
    this.aggregatorAddress = fields.aggre