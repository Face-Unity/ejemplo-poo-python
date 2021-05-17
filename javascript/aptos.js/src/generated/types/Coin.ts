
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICoin {
  value: BN;
}

export interface CoinJSON {
  value: string;
}

export interface CoinMoveStruct {
  value: string;
}

export class Coin implements ICoin {
  readonly value: BN;

  constructor(fields: ICoin) {
    this.value = fields.value;
  }

  toJSON(): CoinJSON {
    return {
      value: this.value.toString(),
    };
  }

  static fromJSON(obj: CoinJSON) {
    return new Coin({
      value: new BN(obj.value),
    });
  }

  toMoveStruct(): CoinMoveStruct {
    return {
      value: this.value.toString(),
    };
  }

  static fromMoveStruct(obj: CoinMoveStruct) {
    return new Coin({
      value: new BN(obj.value),
    });
  }
}