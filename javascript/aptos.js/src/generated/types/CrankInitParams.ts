import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankInitParams {
  queueAddr: HexString;
}

export interface CrankInitParamsJSON {
  queueAddr: string;
}

export interface CrankInitParamsMoveStruct {
  queue_addr: string;
}

export class CrankInitParams implements ICrankInitParams {
  readonly queueAddr: HexString;

  constructor(fields: ICrankInitParams) {
    this.queueAddr = fields.queueAddr;
  }

  toJSON(): CrankInitParamsJSON {
    return {
      queueAddr: this.queueAddr.toString(),
    };
  }

  static fromJSON(obj: CrankInitParamsJSON) {
    return new CrankInitParams({
      queueAddr: HexString.ensure(obj.queueAddr),
    });
  }

  toMoveStruct(): CrankInitParamsMoveStruct {
    return {
      queue_addr: this.queueAddr.toString(),
    };
  }

  static fromMoveStruct(obj: CrankInitParamsMoveStruct) {
    return new CrankInitParams({
      queueAddr: HexString.ensure(obj.queue_addr),
    });
  }
}
