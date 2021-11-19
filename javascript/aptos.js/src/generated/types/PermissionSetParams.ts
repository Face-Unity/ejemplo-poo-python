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

exp