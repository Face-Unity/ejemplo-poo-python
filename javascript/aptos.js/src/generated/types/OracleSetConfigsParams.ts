
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleSetConfigsParams {
  oracleAddr: HexString;
  name: Uint8Array;
  metadata: Uint8Array;
  oracleAuthority: HexString;
  queueAddr: HexString;
}

export interface OracleSetConfigsParamsJSON {
  oracleAddr: string;
  name: Array<number>;
  metadata: Array<number>;
  oracleAuthority: string;
  queueAddr: string;
}

export interface OracleSetConfigsParamsMoveStruct {
  oracle_addr: string;
  name: string;
  metadata: string;
  oracle_authority: string;
  queue_addr: string;
}

export class OracleSetConfigsParams implements IOracleSetConfigsParams {
  readonly oracleAddr: HexString;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly oracleAuthority: HexString;
  readonly queueAddr: HexString;

  constructor(fields: IOracleSetConfigsParams) {
    this.oracleAddr = fields.oracleAddr;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.oracleAuthority = fields.oracleAuthority;
    this.queueAddr = fields.queueAddr;
  }

  toJSON(): OracleSetConfigsParamsJSON {
    return {
      oracleAddr: this.oracleAddr.toString(),
      name: [...this.name],
      metadata: [...this.metadata],
      oracleAuthority: this.oracleAuthority.toString(),
      queueAddr: this.queueAddr.toString(),
    };
  }

  static fromJSON(obj: OracleSetConfigsParamsJSON) {
    return new OracleSetConfigsParams({
      oracleAddr: HexString.ensure(obj.oracleAddr),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      oracleAuthority: HexString.ensure(obj.oracleAuthority),
      queueAddr: HexString.ensure(obj.queueAddr),
    });
  }

  toMoveStruct(): OracleSetConfigsParamsMoveStruct {
    return {
      oracle_addr: this.oracleAddr.toString(),
      name: Buffer.from(this.name).toString("hex"),
      metadata: Buffer.from(this.metadata).toString("hex"),
      oracle_authority: this.oracleAuthority.toString(),
      queue_addr: this.queueAddr.toString(),
    };
  }

  static fromMoveStruct(obj: OracleSetConfigsParamsMoveStruct) {
    return new OracleSetConfigsParams({
      oracleAddr: HexString.ensure(obj.oracle_addr),
      name:
        typeof obj.name === "string"
          ? new Uint8Array(Buffer.from(obj.name.slice(2), "hex"))
          : new Uint8Array(obj.name),
      metadata:
        typeof obj.metadata === "string"
          ? new Uint8Array(Buffer.from(obj.metadata.slice(2), "hex"))
          : new Uint8Array(obj.metadata),
      oracleAuthority: HexString.ensure(obj.oracle_authority),
      queueAddr: HexString.ensure(obj.queue_addr),
    });
  }
}