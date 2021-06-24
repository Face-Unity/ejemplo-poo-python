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
  features: Array<boolean>;
  _ebuf: Array<number>;
}

export interface JobMoveStruct {
  addr: string;
  name: string;
  metadata: string;
  authority: string;
  expiration: string;
  hash: string;
  data: string;
  reference_count: string;
  total_spent: string;
  created_at: string;
  variables: Array<string>;
  features: Array<boolean>;
  _ebuf: string;
}

export class Job implements IJob {
  readonly addr: HexString;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly authority: HexString;
  readonly expiration: BN;
  readonly hash: Uint8Array;
  readonly data: Uint8Array;
  readonly referenceCount: BN;
  readonly totalSpent: BN;
  readonly createdAt: BN;
  readonly variables: Array<Uint8Array>;
  readonly features: Array<boolean>;
  readonly _ebuf: Uint8Array;

  constructor(fields: IJob) {
    this.addr = fields.addr;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.authority = fields.authority;
    this.expiration = fields.expiration;
    this.hash = fields.hash;
    this.data = fields.data;
    this.referenceCount = fields.referenceCount;
    this.totalSpent = fields.totalSpent;
    this.createdAt = fields.createdAt;
    this.variables = fields.variables;
    this.features = fields.features;
    this._ebuf = fields._ebuf;
  }

  toJSON(): JobJSON {
    return {
      addr: this.addr.toString(),
      name: [...this.name],
      metadata: [...this.metadata],
      authority: this.authority.toString(),
      expiration: this.expiration.toString(),
      hash: [...this.hash],
      data: [...this.data],
      referenceCount: this.referenceCount.toString(),
      totalSpent: this.totalSpent.toString(),
      createdAt: this.createdAt.toString(),
      variables: this.variables.map((item) => [...item]),
      features: this.features.map((item) => item),
      _ebuf: [...this._ebuf],
    };
  }

  static fromJSON(obj: JobJSON) {
    return new Job({
      addr: HexString.ensure(obj.addr),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      authority: HexString.ensure(obj.authority),
      expiration: new BN(obj.expiration),
      hash: new Uint8Array(obj.hash),
      data: new Uint8Array(obj.data),
      referenceCount: new BN(obj.referenceCount),
      totalSpent: new BN(obj.totalSpent),
      createdAt: new BN(obj.createdAt),
      variables: obj.variables.map((item) => new Uint8Array(item)),
      features: obj.features.map((item) => item),
      _ebuf: new Uint8Array(obj._ebuf),
    });
  }

  toMoveStruct(): JobMoveStruct {
    return {
   