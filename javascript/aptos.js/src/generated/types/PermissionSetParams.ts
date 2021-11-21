import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IPermissionSetParams {
  authority: HexString;
  granter: HexString;
  grantee: HexString;
  permission: BN;
  enable: boolean;
}

export interface PermissionSetParamsJSON {
  authority: string;
  granter: string;
  grantee: string;
  permission: string;
  enable: boolean;
}

export interface PermissionSetParamsMoveStruct {
  authority: string;
  granter: string;
  grantee: string;
  permission: string;
  enable: boolean;
}

export class PermissionSetParams implements IPermissionSetParams {
  readonly authority: HexString;
  readonly granter: HexString;
  readonly grantee: HexString;
  readonly permission: BN;
  readonly enable: boolean;

  constructor(fields: IPermissionSetParams) {
    this.authority = fields.authority;
    this.granter = fields.granter;
    this.grantee = fields.grantee;
    this.permission = fields.permission;
    this.enable = fields.enable;
  }

  toJSON(): PermissionSetParamsJSON {
    return {
      authority: this.authority.toString(),
      granter: this.granter.toString(),
      grantee: this.grantee.toString(),
      permission: this.permission.toString(),
      enable: this.enable,
    };
  }

  static fromJSON(obj: PermissionSetParamsJSON) {
    return new PermissionSetParams({
      authority: HexString.ensure(obj.authority),
      granter: HexString.ensure(obj.grante