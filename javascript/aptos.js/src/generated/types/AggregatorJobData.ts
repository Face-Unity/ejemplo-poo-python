import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorJobData {
  jobKeys: Array<HexString>;
  jobWeights: Uint8Array;
  jobsChecksum: Uint8Array;
}

export interface AggregatorJobDataJSON {
  jobKeys: Array<string>;
  jobWeights: Array<number>;
  jobsChecksum: Array<number>;
}

export interface AggregatorJobDataMoveStruct {
  job_keys: Array<string>;
  job_weights: string;
  jobs_checksum: string;
}

export class AggregatorJobData implements IAggregatorJobData {
  readonly jobKeys: Array<HexString>;
  readonly jobWeights: Uint8Array;
  readonly jobsChecksum: Uint8Array;

  constructor(fields: IAggregatorJobData) {
    this.j