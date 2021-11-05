import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IPermissionInitParams {
  authority: HexString;
  granter: HexString;
  grantee: HexString;
}

export interface PermissionInitParamsJSON {
  authority: string;
  granter: string;
  grantee: string;
}

export interface PermissionInitParamsMoveStruct {
  authority: string;
  granter: string;
  grantee: string;
}

export class PermissionInitParams implements IPermissionInitParams {
  readonly authority: HexString;
  readonly granter: HexString;
  readonly grantee: HexString;

  constructor(fields: IPermissionInitParams) {
    this.authority = fields.