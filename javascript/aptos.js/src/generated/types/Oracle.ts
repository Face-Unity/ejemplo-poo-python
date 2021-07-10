
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracle {
  signerCap: types.SignerCapability;
  name: Uint8Array;
  metadata: Uint8Array;
  authority: HexString;
  lastHeartbeat: BN;
  queueAddr: HexString;
  numRows: number;
  createdAt: BN;
  metrics: types.OracleMetrics;
  features: Array<boolean>;
  _ebuf: Uint8Array;
}

export interface OracleJSON {
  signerCap: types.SignerCapabilityJSON;
  name: Array<number>;
  metadata: Array<number>;
  authority: string;
  lastHeartbeat: string;
  queueAddr: string;
  numRows: number;
  createdAt: string;
  metrics: types.OracleMetricsJSON;
  features: Array<boolean>;
  _ebuf: Array<number>;
}

export interface OracleMoveStruct {
  signer_cap: types.SignerCapabilityMoveStruct;
  name: string;
  metadata: string;
  authority: string;
  last_heartbeat: string;
  queue_addr: string;
  num_rows: number;
  created_at: string;
  metrics: types.OracleMetricsMoveStruct;
  features: Array<boolean>;
  _ebuf: string;
}

export class Oracle implements IOracle {
  readonly signerCap: types.SignerCapability;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly authority: HexString;
  readonly lastHeartbeat: BN;
  readonly queueAddr: HexString;
  readonly numRows: number;
  readonly createdAt: BN;
  readonly metrics: types.OracleMetrics;
  readonly features: Array<boolean>;
  readonly _ebuf: Uint8Array;

  constructor(fields: IOracle) {
    this.signerCap = fields.signerCap;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.authority = fields.authority;
    this.lastHeartbeat = fields.lastHeartbeat;
    this.queueAddr = fields.queueAddr;
    this.numRows = fields.numRows;
    this.createdAt = fields.createdAt;
    this.metrics = fields.metrics;
    this.features = fields.features;
    this._ebuf = fields._ebuf;
  }

  toJSON(): OracleJSON {
    return {
      signerCap: this.signerCap.toJSON(),
      name: [...this.name],
      metadata: [...this.metadata],
      authority: this.authority.toString(),
      lastHeartbeat: this.lastHeartbeat.toString(),
      queueAddr: this.queueAddr.toString(),
      numRows: this.numRows,
      createdAt: this.createdAt.toString(),
      metrics: this.metrics.toJSON(),
      features: this.features.map((item) => item),
      _ebuf: [...this._ebuf],
    };
  }

  static fromJSON(obj: OracleJSON) {
    return new Oracle({
      signerCap: types.SignerCapability.fromJSON(obj.signerCap),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      authority: HexString.ensure(obj.authority),
      lastHeartbeat: new BN(obj.lastHeartbeat),
      queueAddr: HexString.ensure(obj.queueAddr),
      numRows: obj.numRows,
      createdAt: new BN(obj.createdAt),
      metrics: types.OracleMetrics.fromJSON(obj.metrics),
      features: obj.features.map((item) => item),
      _ebuf: new Uint8Array(obj._ebuf),
    });
  }

  toMoveStruct(): OracleMoveStruct {
    return {
      signer_cap: this.signerCap.toMoveStruct(),
      name: Buffer.from(this.name).toString("hex"),
      metadata: Buffer.from(this.metadata).toString("hex"),
      authority: this.authority.toString(),
      last_heartbeat: this.lastHeartbeat.toString(),
      queue_addr: this.queueAddr.toString(),
      num_rows: this.numRows,
      created_at: this.createdAt.toString(),
      metrics: this.metrics.toMoveStruct(),
      features: this.features.map((item) => item),
      _ebuf: Buffer.from(this._ebuf).toString("hex"),
    };
  }

  static fromMoveStruct(obj: OracleMoveStruct) {
    return new Oracle({
      signerCap: types.SignerCapability.fromMoveStruct(obj.signer_cap),
      name:
        typeof obj.name === "string"
          ? new Uint8Array(Buffer.from(obj.name.slice(2), "hex"))
          : new Uint8Array(obj.name),
      metadata:
        typeof obj.metadata === "string"
          ? new Uint8Array(Buffer.from(obj.metadata.slice(2), "hex"))
          : new Uint8Array(obj.metadata),
      authority: HexString.ensure(obj.authority),
      lastHeartbeat: new BN(obj.last_heartbeat),
      queueAddr: HexString.ensure(obj.queue_addr),
      numRows: obj.num_rows,
      createdAt: new BN(obj.created_at),
      metrics: types.OracleMetrics.fromMoveStruct(obj.metrics),
      features: obj.features.map((item) => item),
      _ebuf:
        typeof obj._ebuf === "string"
          ? new Uint8Array(Buffer.from(obj._ebuf.slice(2), "hex"))
          : new Uint8Array(obj._ebuf),
    });
  }
}