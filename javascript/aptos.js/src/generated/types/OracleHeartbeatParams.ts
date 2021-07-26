import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleHeartbeatParams {
  oracleAddr: HexString;
}

export interface OracleHeartbeatParamsJSON {
  oracleAddr: string;
}

export interface OracleHeartbeatParamsMoveStruct {
  oracle_addr: string;
}

export class OracleHeartbeatParams implements IOracleHeartbeatParams {
  readonly oracleAddr: HexString;

  constructor(fields: IOracleHeartbeatParams) {
    this.oracleAddr = fields.oracleAddr;
  }

  toJSON(): OracleHeartbeatParamsJSON {
    return {
      oracleAddr: this.oracleAddr.toString(),
    };
  }

  static fromJSON(obj: OracleHeartbeatParamsJSON) {
    return new OracleHeartbeatParams({
      oracleAddr: HexString.ensure(obj.oracleAddr),
    });
  }

  toMoveStruct(): OracleHeartbeatParamsMoveStruct {
    return {
      oracle_addr: this.oracleAddr.toString(),
    };
  }

  static fromMoveStruct(obj: OracleHeartbeatParamsMoveStruct) {
    return new OracleHeartbeat