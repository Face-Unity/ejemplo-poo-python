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
  