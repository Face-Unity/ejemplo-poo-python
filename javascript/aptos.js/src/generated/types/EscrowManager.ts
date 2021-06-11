
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IEscrowManager {
  escrows: types.EscrowManagerItem;
}

export interface EscrowManagerJSON {
  escrows: types.EscrowManagerItemJSON;
}

export interface EscrowManagerMoveStruct {
  escrows: types.EscrowManagerItemMoveStruct;
}

export class EscrowManager implements IEscrowManager {
  readonly escrows: types.EscrowManagerItem;

  constructor(fields: IEscrowManager) {
    this.escrows = fields.escrows;
  }

  toJSON(): EscrowManagerJSON {
    return {
      escrows: this.escrows.toJSON(),
    };
  }

  static fromJSON(obj: EscrowManagerJSON) {
    return new EscrowManager({
      escrows: types.EscrowManagerItem.fromJSON(obj.escrows),
    });
  }

  toMoveStruct(): EscrowManagerMoveStruct {
    return {
      escrows: this.escrows.toMoveStruct(),
    };
  }

  static fromMoveStruct(obj: EscrowManagerMoveStruct) {
    return new EscrowManager({
      escrows: types.EscrowManagerItem.fromMoveStruct(obj.escrows),
    });
  }
}