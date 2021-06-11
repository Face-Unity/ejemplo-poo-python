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
      handle: this.handle.toString(),
    };
  }

  static fromJSON(obj: EscrowManagerItemJSON) {
    return new EscrowManagerItem({
      handle: HexString.ensure(obj.handle),
    });
  }

  toMoveStruct(): EscrowManagerItemMoveStruct {
    return {
      handle: this.handle.toString(),
    };
  }

  static fromMoveStruct(obj: EscrowManagerItemMoveStruct) {
    return new EscrowManagerItem({
      handle: HexString.ensure(obj.handle),
    });
  }
}
