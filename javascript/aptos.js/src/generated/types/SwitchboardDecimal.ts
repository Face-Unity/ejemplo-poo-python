import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import Big from "big.js";
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ISwitchboardDecimal {
  value: BN;
  dec: number;
  neg: boolean;
}

export interface SwitchboardDecimalJSON {
  value: string;
  dec: number;
  neg: boolean;
}

export interface SwitchboardDecimalMoveStruct {
  value: string;
  dec: number;
  neg: boolean;
}

export class SwitchboardDecimal implements ISwitchboardDecimal {
  readonly value: BN;
  readonly dec: number;
  readonly neg: boolean;

  constructor(fields: ISwitchboardDecimal) {
    this.value = fields.value;
    this.dec = fields.dec;
    this.neg = fields.neg;
  }

  toJSON(): SwitchboardDecimalJSON {
    return {
      value: this.value.toString(),
      dec: this.dec,
      neg: this.neg,
    };
  }

  static fromJSON(obj: SwitchboardDecimalJSON) {
    return new SwitchboardDecimal({
      value: new BN(obj.value),
      dec: obj.dec,
      neg: obj.neg,
    });
  }

  toMoveStruct(): SwitchboardDecimalMoveStruct {
    return {
      value: this.value.toString(),
      dec: this.dec,
      neg: this.neg,
    };
  }

  static fromMoveStruct(obj: SwitchboardDecimalMoveStruct) {
    return new SwitchboardDecimal({
      value: new BN(obj.value),
      dec: obj.dec,
      neg: obj.neg,
    });
  }

  toBig(): Big {
    const oldDp = Big.DP;
    Big.DP = 18;
    let result = new Big(this.value.toString());
    if (this.neg === true) {
      result = result.mul(-1);
    }
    const TEN = new Big(10);
    result = safeDiv(result, TEN.pow(this.dec));
    Big.DP = oldDp;
    return result;
  }

  static fromBig(val: Big): SwitchboardDecimal {
    const