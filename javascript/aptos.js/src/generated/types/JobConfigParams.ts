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
    this.data 