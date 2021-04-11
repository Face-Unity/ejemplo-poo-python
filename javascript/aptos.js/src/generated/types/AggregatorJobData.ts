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
    this.jobKeys = fields.jobKeys;
    this.jobWeights = fields.jobWeights;
    this.jobsChecksum = fields.jobsChecksum;
  }

  toJSON(): AggregatorJobDataJSON {
    return {
      jobKeys: this.jobKeys.map((item) => item.toString()),
      jobWeights: [...this.jobWeights],
      jobsChecksum: [...this.jobsChecksum],
    };
  }

  static fromJSON(obj: AggregatorJobDataJSON) {
    return new AggregatorJobData({
      jobKeys: obj.jobKeys.map((item) => HexString.ensure(item)),
      jobWeights: new Uint8Array(obj.jobWeights),
      jobsChecksum: new Uint8Array(obj.jobsChecksum),
    });
  }

  toMoveStruct(): AggregatorJobDataMoveStruct {
    return {
      job_keys: this.jobKeys.map((item) => item.toString()),
      job_weights: Buffer.from(this.jobWeights).toString("hex"),
      jobs_checksum: Buffer.from(this.jobsChecksum).toString("hex"),
    };
  }

  static fromMoveStruct(obj: AggregatorJobDataMoveStruct) {
    return new AggregatorJobData({
      jobKeys: obj.job_keys.map((item) => HexString.ensure(item)),
      jobWeights:
        typeof obj.job_weights === "string"
          ? new Uint8Array(Buffer.from(obj.job_weights.slice(2), "hex"))
          : new Uint8Array(obj.job_weights),
      jobsChecksum:
        typeof obj.jobs_checksum === "string"
          ? new Uint8Array(Buffer.from(obj.jobs_checksum.slice(2), "hex"))
          : new Uint8Array(obj.jobs_checksum),
    });
  }
}
