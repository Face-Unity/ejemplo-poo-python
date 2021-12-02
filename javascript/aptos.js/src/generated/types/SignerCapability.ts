import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ISignerCapability {
  account: HexString;
}

export interface SignerCapabilityJSON {
  account: string;
}

export interface SignerCapabilityMoveStruct {
  account: string;
}

export class SignerCapability implements ISignerCapability {
  readonly account: HexString;

  constructor(fields: ISignerCapability) {
    this.account = fields.account;
  }

  toJSON(): SignerCapabilityJSON {
    return {
      account: this.account.toString(),
    };
  }

  static fromJSON(obj: SignerCapabilityJSON) {
    return new SignerCapability({
      account: HexString.ensure(obj.account),
    });
  }

  toMoveStruct(): SignerCapabilityMoveStruct {
    return {
      account: this.account.toString(),
    };
  }

  static fromMoveStruct(obj: SignerCapabilityMoveStruct) {
    return new SignerCapability({
      account: HexString.ensure(obj.account),
    });
  }
}
