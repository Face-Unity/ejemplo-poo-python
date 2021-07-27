import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleInitParams {
  name: Uint8Array;
  metadata: Uint8Array;
  oracleAuthority: HexString;
  queueAddr: HexString;
}

export interface OracleIn