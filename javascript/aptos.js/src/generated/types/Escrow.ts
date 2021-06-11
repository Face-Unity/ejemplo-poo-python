
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IEscrow {
  createdAt: BN;
  authority: HexString;
  escrow: types.Coin;
  features: Array<boolean>;
  _ebuf: Uint8Array;
}

export interface EscrowJSON {
  createdAt: string;
  authority: string;
  escrow: types.CoinJSON;
  features: Array<boolean>;
  _ebuf: Array<number>;
}

export interface EscrowMoveStruct {
  created_at: string;
  authority: string;
  escrow: types.CoinMoveStruct;
  features: Array<boolean>;
  _ebuf: string;
}

export class Escrow implements IEscrow {
  readonly createdAt: BN;
  readonly authority: HexString;
  readonly escrow: types.Coin;
  readonly features: Array<boolean>;
  readonly _ebuf: Uint8Array;

  constructor(fields: IEscrow) {
    this.createdAt = fields.createdAt;
    this.authority = fields.authority;
    this.escrow = fields.escrow;
    this.features = fields.features;
    this._ebuf = fields._ebuf;
  }

  toJSON(): EscrowJSON {
    return {
      createdAt: this.createdAt.toString(),
      authority: this.authority.toString(),
      escrow: this.escrow.toJSON(),
      features: this.features.map((item) => item),
      _ebuf: [...this._ebuf],
    };
  }

  static fromJSON(obj: EscrowJSON) {
    return new Escrow({
      createdAt: new BN(obj.createdAt),
      authority: HexString.ensure(obj.authority),
      escrow: types.Coin.fromJSON(obj.escrow),
      features: obj.features.map((item) => item),
      _ebuf: new Uint8Array(obj._ebuf),
    });
  }

  toMoveStruct(): EscrowMoveStruct {
    return {
      created_at: this.createdAt.toString(),
      authority: this.authority.toString(),
      escrow: this.escrow.toMoveStruct(),
      features: this.features.map((item) => item),
      _ebuf: Buffer.from(this._ebuf).toString("hex"),
    };
  }

  static fromMoveStruct(obj: EscrowMoveStruct) {
    return new Escrow({
      createdAt: new BN(obj.created_at),
      authority: HexString.ensure(obj.authority),
      escrow: types.Coin.fromMoveStruct(obj.escrow),
      features: obj.features.map((item) => item),
      _ebuf:
        typeof obj._ebuf === "string"
          ? new Uint8Array(Buffer.from(obj._ebuf.slice(2), "hex"))
          : new Uint8Array(obj._ebuf),
    });
  }
}