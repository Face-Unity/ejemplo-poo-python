
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IPermission {
  authority: HexString;
  permissions: BN;
  granter: HexString;
  grantee: HexString;
  createdAt: BN;
  updatedAt: BN;
  features: Array<boolean>;
  _ebuf: Uint8Array;
}

export interface PermissionJSON {
  authority: string;
  permissions: string;
  granter: string;
  grantee: string;
  createdAt: string;
  updatedAt: string;
  features: Array<boolean>;
  _ebuf: Array<number>;
}

export interface PermissionMoveStruct {
  authority: string;
  permissions: string;
  granter: string;
  grantee: string;
  created_at: string;
  updated_at: string;
  features: Array<boolean>;
  _ebuf: string;
}

export class Permission implements IPermission {
  readonly authority: HexString;
  readonly permissions: BN;
  readonly granter: HexString;
  readonly grantee: HexString;
  readonly createdAt: BN;
  readonly updatedAt: BN;
  readonly features: Array<boolean>;
  readonly _ebuf: Uint8Array;

  constructor(fields: IPermission) {
    this.authority = fields.authority;
    this.permissions = fields.permissions;
    this.granter = fields.granter;
    this.grantee = fields.grantee;
    this.createdAt = fields.createdAt;
    this.updatedAt = fields.updatedAt;
    this.features = fields.features;
    this._ebuf = fields._ebuf;
  }

  toJSON(): PermissionJSON {
    return {
      authority: this.authority.toString(),
      permissions: this.permissions.toString(),
      granter: this.granter.toString(),
      grantee: this.grantee.toString(),
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
      features: this.features.map((item) => item),
      _ebuf: [...this._ebuf],
    };
  }

  static fromJSON(obj: PermissionJSON) {
    return new Permission({
      authority: HexString.ensure(obj.authority),
      permissions: new BN(obj.permissions),
      granter: HexString.ensure(obj.granter),
      grantee: HexString.ensure(obj.grantee),
      createdAt: new BN(obj.createdAt),
      updatedAt: new BN(obj.updatedAt),
      features: obj.features.map((item) => item),
      _ebuf: new Uint8Array(obj._ebuf),
    });
  }

  toMoveStruct(): PermissionMoveStruct {
    return {
      authority: this.authority.toString(),
      permissions: this.permissions.toString(),
      granter: this.granter.toString(),
      grantee: this.grantee.toString(),
      created_at: this.createdAt.toString(),
      updated_at: this.updatedAt.toString(),
      features: this.features.map((item) => item),
      _ebuf: Buffer.from(this._ebuf).toString("hex"),
    };
  }

  static fromMoveStruct(obj: PermissionMoveStruct) {
    return new Permission({
      authority: HexString.ensure(obj.authority),
      permissions: new BN(obj.permissions),
      granter: HexString.ensure(obj.granter),
      grantee: HexString.ensure(obj.grantee),
      createdAt: new BN(obj.created_at),
      updatedAt: new BN(obj.updated_at),
      features: obj.features.map((item) => item),
      _ebuf:
        typeof obj._ebuf === "string"
          ? new Uint8Array(Buffer.from(obj._ebuf.slice(2), "hex"))
          : new Uint8Array(obj._ebuf),
    });
  }
}