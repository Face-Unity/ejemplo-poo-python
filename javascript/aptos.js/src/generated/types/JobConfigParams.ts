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
  data: Array