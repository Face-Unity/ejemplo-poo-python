
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankPopParams {
  crankAddr: HexString;
  popIdx: BN;
}

export interface CrankPopParamsJSON {
  crankAddr: string;
  popIdx: string;
}

export interface CrankPopParamsMoveStruct {
  crank_addr: string;
  pop_idx: string;
}

export class CrankPopParams implements ICrankPopParams {
  readonly crankAddr: HexString;
  readonly popIdx: BN;

  constructor(fields: ICrankPopParams) {
    this.crankAddr = fields.crankAddr;
    this.popIdx = fields.popIdx;
  }

  toJSON(): CrankPopParamsJSON {
    return {
      crankAddr: this.crankAddr.toString(),
      popIdx: this.popIdx.toString(),
    };
  }

  static fromJSON(obj: CrankPopParamsJSON) {
    return new CrankPopParams({
      crankAddr: HexString.ensure(obj.crankAddr),
      popIdx: new BN(obj.popIdx),
    });
  }

  toMoveStruct(): CrankPopParamsMoveStruct {
    return {
      crank_addr: this.crankAddr.toString(),
      pop_idx: this.popIdx.toString(),
    };
  }

  static fromMoveStruct(obj: CrankPopParamsMoveStruct) {
    return new CrankPopParams({
      crankAddr: HexString.ensure(obj.crank_addr),
      popIdx: new BN(obj.pop_idx),
    });
  }
}