
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleBootedEvent {
  queueAddress: HexString;
  oracleAddress: HexString;
}

export interface OracleBootedEventJSON {
  queueAddress: string;
  oracleAddress: string;
}

export interface OracleBootedEventMoveStruct {
  queue_address: string;
  oracle_address: string;
}

export class OracleBootedEvent implements IOracleBootedEvent {
  readonly queueAddress: HexString;
  readonly oracleAddress: HexString;

  constructor(fields: IOracleBootedEvent) {
    this.queueAddress = fields.queueAddress;
    this.oracleAddress = fields.oracleAddress;
  }

  toJSON(): OracleBootedEventJSON {
    return {
      queueAddress: this.queueAddress.toString(),
      oracleAddress: this.oracleAddress.toString(),
    };
  }

  static fromJSON(obj: OracleBootedEventJSON) {
    return new OracleBootedEvent({
      queueAddress: HexString.ensure(obj.queueAddress),
      oracleAddress: HexString.ensure(obj.oracleAddress),
    });
  }

  toMoveStruct(): OracleBootedEventMoveStruct {
    return {
      queue_address: this.queueAddress.toString(),
      oracle_address: this.oracleAddress.toString(),
    };
  }

  static fromMoveStruct(obj: OracleBootedEventMoveStruct) {
    return new OracleBootedEvent({
      queueAddress: HexString.ensure(obj.queue_address),
      oracleAddress: HexString.ensure(obj.oracle_address),
    });
  }
}