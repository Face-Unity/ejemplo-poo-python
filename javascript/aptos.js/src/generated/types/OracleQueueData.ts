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

export interface OracleQu