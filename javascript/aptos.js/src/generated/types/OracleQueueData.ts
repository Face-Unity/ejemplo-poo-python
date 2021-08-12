import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleQueueData {
  data: Array<HexString>;
  currIdx: BN;
  gcIdx: BN;
}

export interface OracleQueueDataJSON {
  data: Array<string>;
  currIdx: string;
  gcIdx: string;
}

export interface OracleQueueDataMoveStruct {
  data: Array<string>;
  curr_idx: string;
  gc_idx: string;
}

export class OracleQueueData implements IOracleQueueData {
  readonly data: Array<HexString>;
  readonly currIdx: BN;
  readonly gcIdx: BN;

  constructor(fields: IOracleQueueData) {
    this.data = fields.data;
    this.currIdx = fields.currIdx;
    this.gcIdx = fields.gcIdx;
  }

  toJSON(): OracleQueueDataJSON {
    return {
      data: this.data.map((item) => item.toString()),
      currIdx: this.currIdx.toString(),
      gcIdx: this.gcIdx.toString(),
    };
  }

  static fromJSON(obj: OracleQueueDataJSON) {
    return new OracleQueueData({
      data: obj.data.map((item) => HexString.ensure(item)),
      currIdx: new BN(obj.currIdx),
      gcIdx: new BN(obj.gcIdx),
    });
  }

  toMoveStruct(): OracleQueueDataMoveStruct {
    return {
      data: this.data.map((item) => item.toString()),
      curr_idx: this.currIdx.toString(),
      gc_idx: this.gcIdx.toString(),
    };
  }

  static fromMoveStruct(obj: OracleQueueDataMoveStruct) {
    return new OracleQueueData({
      data: obj.data.map((item) => HexString.ensure(item)),
      currIdx: new BN(obj.curr_idx),
      gcIdx: new BN(obj.gc_idx),
    });
  }
}
