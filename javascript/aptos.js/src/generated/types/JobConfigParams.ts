import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IJobConfigParams {
  name: Uint8Array;
  metadata: Uint8Array;
  authority: HexString;
  data: Uint8Array;
}

export interface JobConfigParamsJSON {
  name: Array<number>;
  metadata: Array<number>;
  authority: string;
  data: Array<number>;
}

export interface JobConfigParamsMoveStruct {
  name: string;
  metadata: string;
  authority: string;
  data: string;
}

export class JobConfigParams implements IJobConfigParams {
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly authority: HexString;
  readonly data: Uint8Array;

  constructor(fields: IJobConfigParams) {
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.authority = fields.authority;
    this.data = fields.data;
  }

  toJSON(): JobConfigParamsJSON {
    return {
      name: [...this.name],
      metadata: [...this.metadata],
      authority: this.authority.toString(),
      data: [...this.data],
    };
  }

  static fromJSON(obj: JobConfigParamsJSON) {
    return new JobConfigParams({
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      authority: HexString.ensure(obj.authority),
      data: new Uint8Array(obj.data),
    });
  }

  toMoveStruct(): JobConfigParamsMoveStruct {
    return {
      name: Buffer.from(this.name).toString("hex"),
      metadata: Buffer.from(this.metadata).toString("hex"),
      authority: this.authority.toString(),
      data: Buffer.from(this.data).toString("hex"),
    };
  }

  static fromMoveStruct(obj: JobConfigParamsMoveStruct) {
    return new JobConfigParams({
      name:
        typeof obj.name === "string"
          ? new Uint8Array(Buffer.from(obj.name.slice(2), "hex"))
          : new Uint8Array(obj.name),
      metadata:
        typeof obj.metadata === "string"
          ? new Uint8Array(Buffer.from(obj.metadata.slice(2), "hex"))
          : new Uint8Array(obj.metadata),
      authority: HexString.ensure(obj.authority),
      data:
        typeof obj.data === "string"
          ? new Uint8Array(Buffer.from(obj.data.slice(2), "hex"))
          : new Uint8Array(obj.data),
    });
  }
}
