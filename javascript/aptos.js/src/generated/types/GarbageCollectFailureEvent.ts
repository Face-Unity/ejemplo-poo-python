
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IGarbageCollectFailureEvent {
  queueAddress: HexString;
}

export interface GarbageCollectFailureEventJSON {
  queueAddress: string;
}

export interface GarbageCollectFailureEventMoveStruct {
  queue_address: string;
}

export class GarbageCollectFailureEvent implements IGarbageCollectFailureEvent {
  readonly queueAddress: HexString;

  constructor(fields: IGarbageCollectFailureEvent) {
    this.queueAddress = fields.queueAddress;
  }

  toJSON(): GarbageCollectFailureEventJSON {
    return {
      queueAddress: this.queueAddress.toString(),
    };
  }

  static fromJSON(obj: GarbageCollectFailureEventJSON) {
    return new GarbageCollectFailureEvent({
      queueAddress: HexString.ensure(obj.queueAddress),
    });
  }

  toMoveStruct(): GarbageCollectFailureEventMoveStruct {
    return {
      queue_address: this.queueAddress.toString(),
    };
  }

  static fromMoveStruct(obj: GarbageCollectFailureEventMoveStruct) {
    return new GarbageCollectFailureEvent({
      queueAddress: HexString.ensure(obj.queue_address),
    });
  }
}