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

  constructor(f