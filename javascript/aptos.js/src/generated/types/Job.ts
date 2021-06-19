import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IJob {
  addr: HexString;
  name: Uint8Array;
  metadata: Uint8Array;
  authority: HexString;
  expiration: BN;
  hash: Uint8Array;
  data: Uint8Array;
  referenceCount: BN;
  totalSpent: BN;
  createdAt: BN;
  variables: Array<Uint8Array>;
  features: Array<boolean>;
  _ebuf: Uint8Array;
}

export interface JobJSON {
  addr: string;
  name: Array<number>;
  metadata: Array<number>;
  authority: string;
  expiration: string;
  hash: Array<number>;
  data: Array<number>;
  referenceCount: string;
  totalSpent: string;
  createdAt: string;
  variables: Array<Array<number>>;
  f