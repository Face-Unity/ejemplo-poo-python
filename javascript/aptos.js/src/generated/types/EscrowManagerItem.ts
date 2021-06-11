import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IEscrowManagerItem {
  handle: HexString;
}

export interface EscrowManagerItemJSON {
  handle: string;
}

export interface EscrowManagerItemMoveStruct {
  handle: string;
}

export class EscrowManagerItem implements IEscrowManagerItem {
  readonly handle: HexString;

  constructor(fields: IEscrowManagerItem) {
    this.handle = fields.handle;
  }

  toJSON(): EscrowManagerItemJSON {
    return {
      handl