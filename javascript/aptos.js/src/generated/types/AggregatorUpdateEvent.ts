
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorUpdateEvent {
  aggregatorAddress: HexString;
  oldValue: types.SwitchboardDecimal;
  newValue: types.SwitchboardDecimal;
}

export interface AggregatorUpdateEventJSON {
  aggregatorAddress: string;
  oldValue: types.SwitchboardDecimalJSON;
  newValue: types.SwitchboardDecimalJSON;
}

export interface AggregatorUpdateEventMoveStruct {
  aggregator_address: string;
  old_value: types.SwitchboardDecimalMoveStruct;
  new_value: types.SwitchboardDecimalMoveStruct;
}

export class AggregatorUpdateEvent implements IAggregatorUpdateEvent {
  readonly aggregatorAddress: HexString;
  readonly oldValue: types.SwitchboardDecimal;
  readonly newValue: types.SwitchboardDecimal;

  constructor(fields: IAggregatorUpdateEvent) {
    this.aggregatorAddress = fields.aggregatorAddress;
    this.oldValue = fields.oldValue;
    this.newValue = fields.newValue;
  }

  toJSON(): AggregatorUpdateEventJSON {
    return {
      aggregatorAddress: this.aggregatorAddress.toString(),
      oldValue: this.oldValue.toJSON(),
      newValue: this.newValue.toJSON(),
    };
  }

  static fromJSON(obj: AggregatorUpdateEventJSON) {
    return new AggregatorUpdateEvent({
      aggregatorAddress: HexString.ensure(obj.aggregatorAddress),
      oldValue: types.SwitchboardDecimal.fromJSON(obj.oldValue),
      newValue: types.SwitchboardDecimal.fromJSON(obj.newValue),
    });
  }

  toMoveStruct(): AggregatorUpdateEventMoveStruct {
    return {
      aggregator_address: this.aggregatorAddress.toString(),
      old_value: this.oldValue.toMoveStruct(),
      new_value: this.newValue.toMoveStruct(),
    };
  }

  static fromMoveStruct(obj: AggregatorUpdateEventMoveStruct) {
    return new AggregatorUpdateEvent({
      aggregatorAddress: HexString.ensure(obj.aggregator_address),
      oldValue: types.SwitchboardDecimal.fromMoveStruct(obj.old_value),
      newValue: types.SwitchboardDecimal.fromMoveStruct(obj.new_value),
    });
  }
}