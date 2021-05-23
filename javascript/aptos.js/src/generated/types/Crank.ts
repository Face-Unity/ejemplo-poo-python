import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrank {
  heap: Array<types.CrankRow>;
  queueAddr: HexString;
  createdAt: BN;
  jitterModifier: BN;
  features: Array<boolean>;
  _ebuf: Uint8Array;
}

export interface CrankJSON {
  heap: Array<types.CrankRowJSON>;
  queueAddr: string;
  createdAt: string;
  jitterModifier: string;
  features: Array<boolean>;
  _ebuf: Array<number>;
}

export interface CrankMoveStruct {
  heap: Array<types.CrankRowMoveStruct>;
  queue_addr: string;
  created_at: string;
  jitter_modifier: string;
  features: Array<boolean>;
  _ebuf: string;
}

export class Crank implements ICrank {
  readonly heap: Array<types.CrankRow>;
  readonly queueAddr: HexString;
  readonly createdAt: BN;
  readonly jitterModifier: BN;
  readonly features: Array<boolean>;
  readonly _ebuf: Uint8Array;

  constructor(fields: ICrank) {
    this.heap = fields.heap;
    this.queueAddr = fields.queueAddr;
    this.createdAt = fields.createdAt;
    this.ji