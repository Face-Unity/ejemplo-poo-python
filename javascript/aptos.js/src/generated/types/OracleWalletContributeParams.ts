
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleWalletContributeParams {
  oracleAddr: HexString;
  queueAddr: HexString;
  loadAmount: BN;
}

export interface OracleWalletContributeParamsJSON {
  oracleAddr: string;
  queueAddr: string;
  loadAmount: string;
}

export interface OracleWalletContributeParamsMoveStruct {
  oracle_addr: string;
  queue_addr: string;
  load_amount: string;
}

export class OracleWalletContributeParams
  implements IOracleWalletContributeParams
{
  readonly oracleAddr: HexString;
  readonly queueAddr: HexString;
  readonly loadAmount: BN;

  constructor(fields: IOracleWalletContributeParams) {
    this.oracleAddr = fields.oracleAddr;
    this.queueAddr = fields.queueAddr;
    this.loadAmount = fields.loadAmount;
  }

  toJSON(): OracleWalletContributeParamsJSON {
    return {
      oracleAddr: this.oracleAddr.toString(),
      queueAddr: this.queueAddr.toString(),
      loadAmount: this.loadAmount.toString(),
    };
  }

  static fromJSON(obj: OracleWalletContributeParamsJSON) {
    return new OracleWalletContributeParams({
      oracleAddr: HexString.ensure(obj.oracleAddr),
      queueAddr: HexString.ensure(obj.queueAddr),
      loadAmount: new BN(obj.loadAmount),
    });
  }

  toMoveStruct(): OracleWalletContributeParamsMoveStruct {
    return {
      oracle_addr: this.oracleAddr.toString(),
      queue_addr: this.queueAddr.toString(),
      load_amount: this.loadAmount.toString(),
    };
  }

  static fromMoveStruct(obj: OracleWalletContributeParamsMoveStruct) {
    return new OracleWalletContributeParams({
      oracleAddr: HexString.ensure(obj.oracle_addr),
      queueAddr: HexString.ensure(obj.queue_addr),
      loadAmount: new BN(obj.load_amount),
    });
  }
}