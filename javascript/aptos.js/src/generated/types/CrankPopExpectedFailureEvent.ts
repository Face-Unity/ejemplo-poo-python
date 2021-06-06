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
    this.aggregatorAddress = fields.aggregatorAddress;
  }

  toJSON(): CrankPopExpectedFailureEventJSON {
    return {
      aggregatorAddress: this.aggregatorAddress.toString(),
    };
  }

  static fromJSON(obj: CrankPopExpectedFailureEventJSON) {
    return new CrankPopExpectedFailureEvent({
      aggregatorAddress: HexString.ensure(obj.aggregatorAddress),
    });
  }

  toMoveStruct(): CrankPopExpectedFailureEventMoveStruct {
    return {
      aggregator_address: this.aggregatorAddress.toString(),
    };
  }

  static fro