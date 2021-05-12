import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorRound {
  id: BN;
  roundOpenTimestamp: BN;
  roundOpenBlockHeight: BN;
  result: types.SwitchboardDecimal;
  stdDeviation: types.SwitchboardDecimal;
  minResponse: types.SwitchboardDecimal;
  maxResponse: types.SwitchboardDecimal;
  oracleKeys: Array<HexString>;
  medians: Array<types.SwitchboardDecimal | undefined>;
  currentPayout: Array<types.SwitchboardDecimal>;
  errorsFulfilled: Array<boolean>;
  numSuccess: BN;
  numError: BN;
  isClosed: boolean;
  roundConfirmedTimestamp: BN;
}

export interface AggregatorRoundJSON {
  id: string;
  roundOpenTimestamp: string;
  roundOpenBlockHeight: string;
  result: types.SwitchboardDecimalJSON;
  stdDeviation: types.SwitchboardDecimalJSON;
  minResponse: types.SwitchboardDecimalJSON;
  maxResponse: types.SwitchboardDecimalJSON;
  oracleKeys: Array<string>;
  medians: Array<types.SwitchboardDecimalJSON | undefined>;
  currentPayout: Array<types.SwitchboardDecimalJSON>;
  errorsFulfilled: Array<boolean>;
  numSuccess: string;
  numError: string;
  isClosed: boolean;
  roundConfirmedTimestamp: string;
}

export interface AggregatorRoundMoveStruct {
  id: string;
  round_open_timestamp: string;
  round_open_block_height: string;
  result: types.SwitchboardDecimalMoveStruct;
  std_deviation: types.SwitchboardDecimalMoveStruct;
  min_response: types.SwitchboardDecimalMoveStruct;
  max_response: types.SwitchboardDecimalMoveStruct;
  oracle_keys: Array<string>;
  medians: Array<types.OptionalMoveStruct<types.SwitchboardDecimalJSON>>;
  current_payout: Array<types.SwitchboardDecimalMoveStruct>;
  errors_fulfilled: Array<boolean>;
  num_success: string;
  num_error: string;
  is_closed: boolean;
  round_confirmed_timestamp: string;
}

export class AggregatorRound implements IAggregatorRound {
  readonly id: BN;
  readonly roundOpenTimestamp: BN;
  readonly roundOpenBlockHeight: BN;
  readonly result: types.SwitchboardDecimal;
  readonly stdDeviation: types.SwitchboardDecimal;
  readonly minResponse: types.SwitchboardDecimal;
  readonly maxResponse: types.SwitchboardDecimal;
  readonly oracleKeys: Array<HexString>;
  readonly medians: Array<types.SwitchboardDecimal | undefined>;
  readonly currentPayout: Array<types.SwitchboardDecimal>;
  readonly errorsFulfilled: Array<boolean>;
  readonly numSuccess: BN;
  readonly numError: BN;
  readonly isClosed: boolean;
  readonly roundConfirmedTimestamp: BN;

  constructor(fields: IAggregatorRound) {
    this.id = fields.id;
    this.roundOpenTimestamp = fields.roundOpenTimestamp;
    this.roundOpenBlockHeight = fields.roundOpenBlockHeight;
    this.result = fields.result;
    this.stdDeviation = fields.stdDeviation;
    this.minResponse = fields.minResponse;
    this.maxResponse = fields.maxResponse;
    this.oracleKeys = fields.oracleKeys;
    this.medians = fields.medians;
    this.currentPayout = fields.currentPayout;
    this.errorsFulfilled = fields.errorsFulfilled;
    this.numSuccess = fields.numSuccess;
    this.numError = fields.numError;
    this.isClosed = fields.isClosed;
    this.roundConfirmedTimestamp = fields.roundConfirmedTimestamp;
  }

  toJSON(): AggregatorRoundJSON {
    return {
      id: this.id.toString(),
      roundOpenTimestamp: this.roundOpenTimestamp.toString(),
      roundOpenBlockHeight: this.roundOpenBlockHeight.toString(),
      result: this.result.toJSON(),
      stdDeviation: this.stdDeviation.toJSON(),
      minResponse: this.minResponse.toJSON(),
      maxResponse: this.maxResponse.toJSON(),
      oracleKeys: this.oracleKeys.map((item) => item.toString()),
      medians: this.medians.map((item) => (item ? item.toJSON() : undefined)),
      currentPayout: this.currentPayout.map((item) => item.toJSON()),
      errorsFulfilled: this.errorsFulfilled.map((item) => item),
      numSuccess: this.numSuccess.toString(),
      numError: this.numError.toString(),
      isClosed: this.isClosed,
      roundConfirmedTimestamp: this.roundConfirmedTimestamp.toString(),
    };
  }

  static fromJSON(obj: AggregatorRoundJSON) {
    return new AggregatorRound({
      id: new BN(obj.id),
      roundOpenTimestamp: new BN(obj.roundOpenTimestamp),
      roundOpenBlockHeight: new BN(obj.roundOpenBlockHeight),
      result: types.SwitchboardDecimal.fromJSON(obj.result),
      stdDeviation: types.SwitchboardDecimal.fromJSON(obj.stdDeviation),
      minResponse: types.SwitchboardDecimal.fromJSON(obj.minResponse),
      maxResponse: types.SwitchboardDecimal.fromJSON(obj.maxResponse),
      oracleKeys: obj.oracleKeys.map((item) => HexString.ensure(item)),
      medians: Array.from(
        obj.medians.map((item) =>
          item ? types.SwitchboardDecimal.fromJSON(item) : undefined
        )
      ),
      currentPayout: obj.currentPayout.map((item) =>
        types.SwitchboardDecimal.fromJSON(item)
      ),
      errorsFulfilled: obj.errorsFulfilled.map((item) => item),
      numSuccess: new BN(obj.numSuccess),
      numError: new BN(obj.numError),
      isClosed: obj.isClosed,
      roundConfirmedTimestamp: new BN(obj.roundConfirmedTimestamp),
    });
  }

  toMoveStruct(): AggregatorRoundMoveStruct {
    return {
      id: this.id.toString(),
      round_open_timestamp: this.roundOpenTimestamp.toString(),
      round_open_block_height: this.roundOpenBlockHeight.toString(),
      result: this.result.toMoveStruct(),
      std_deviation: this.stdDeviation.toMoveStruct(),
      min_response: this.minResponse.toMoveStruct(),
      max_response: this.maxResponse.toMoveStruct(),
      oracle_keys: this.oracleKeys.map((item) => item.toString()),
      medians: this.medians.map((item) =>
        item ? { vec: [item.toMoveStruct()] } : null
      ),
      current_payout: this.currentPayout.map((item) => item.toMoveStruct()),
      errors_fulfilled: this.errorsFulfilled.map((item) => item),
      num_success: this.numSuccess.toString(),
      num_error: this.numError.toString(),
      is_closed: this.isClosed,
      round_confirmed_timestamp: this.roundConfirmedTimestamp.toString(),
    };
  }

  static fromMoveStruct(obj: AggregatorRoundMoveStruct) {
    return new AggregatorRound({
      id: new BN(obj.id),
      roundOpenTimestamp: new BN(obj.round_open_timestamp),
      roundOpenBlockHeight: new BN(obj.round_open_block_height),
      result: types.SwitchboardDecimal.fromMoveStruct(obj.result),
      stdDeviation: types.SwitchboardDecimal.fromMoveStruct(obj.std_deviation),
      minResponse: types.SwitchboardDecimal.fromMoveStruct(obj.min_response),
      maxResponse: types.SwitchboardDecimal.fromMoveStruct(obj.max_response),
      oracleKeys: obj.oracle_keys.map((item) => HexString.ensure(item)),
      medians: Array.from(
        obj.medians.map((item) =>
          item.vec.length > 0
            ? types.SwitchboardDecimal.fromMoveStruct(item.vec[0])
            : null
        )
      ),
      currentPayout: obj.current_payout.map((item) =>
        types.SwitchboardDecimal.fromMoveStruct(item)
      ),
      errorsFulfilled: obj.errors_fulfilled.map((item) => item),
      numSuccess: new BN(obj.num_success),
      numError: new BN(obj.num_error),
      isClosed: obj.is_closed,
      roundConfirmedTimestamp: new BN(obj.round_confirmed_timestamp),
    });
  }
}
