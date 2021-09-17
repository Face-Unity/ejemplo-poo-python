import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleSlashEvent {
  aggregatorAddress: HexString;
  oracleAddress: HexString;
  amount: BN;
  timestamp: BN;
}

export interface OracleSlashEventJSON {
  aggregatorAddress: string;
  oracleAddress: string;
  amount: string;
  timestamp: string;
}

export interface OracleSlashEventMoveStruct {
  aggregator_address: string;
  oracle_ad