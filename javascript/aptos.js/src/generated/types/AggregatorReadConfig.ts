
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorReadConfig {
  readCharge: BN;
  rewardEscrow: HexString;
  readWhitelist: Array<HexString>;
  limitReadsToWhitelist: boolean;
}

export interface AggregatorReadConfigJSON {
  readCharge: string;
  rewardEscrow: string;
  readWhitelist: Array<string>;
  limitReadsToWhitelist: boolean;
}

export interface AggregatorReadConfigMoveStruct {
  read_charge: string;
  reward_escrow: string;
  read_whitelist: Array<string>;
  limit_reads_to_whitelist: boolean;
}

export class AggregatorReadConfig implements IAggregatorReadConfig {
  readonly readCharge: BN;
  readonly rewardEscrow: HexString;
  readonly readWhitelist: Array<HexString>;
  readonly limitReadsToWhitelist: boolean;

  constructor(fields: IAggregatorReadConfig) {
    this.readCharge = fields.readCharge;
    this.rewardEscrow = fields.rewardEscrow;
    this.readWhitelist = fields.readWhitelist;
    this.limitReadsToWhitelist = fields.limitReadsToWhitelist;
  }

  toJSON(): AggregatorReadConfigJSON {
    return {
      readCharge: this.readCharge.toString(),
      rewardEscrow: this.rewardEscrow.toString(),
      readWhitelist: this.readWhitelist.map((item) => item.toString()),
      limitReadsToWhitelist: this.limitReadsToWhitelist,
    };
  }

  static fromJSON(obj: AggregatorReadConfigJSON) {
    return new AggregatorReadConfig({
      readCharge: new BN(obj.readCharge),
      rewardEscrow: HexString.ensure(obj.rewardEscrow),
      readWhitelist: obj.readWhitelist.map((item) => HexString.ensure(item)),
      limitReadsToWhitelist: obj.limitReadsToWhitelist,
    });
  }

  toMoveStruct(): AggregatorReadConfigMoveStruct {
    return {
      read_charge: this.readCharge.toString(),
      reward_escrow: this.rewardEscrow.toString(),
      read_whitelist: this.readWhitelist.map((item) => item.toString()),
      limit_reads_to_whitelist: this.limitReadsToWhitelist,
    };
  }

  static fromMoveStruct(obj: AggregatorReadConfigMoveStruct) {
    return new AggregatorReadConfig({
      readCharge: new BN(obj.read_charge),
      rewardEscrow: HexString.ensure(obj.reward_escrow),
      readWhitelist: obj.read_whitelist.map((item) => HexString.ensure(item)),
      limitReadsToWhitelist: obj.limit_reads_to_whitelist,
    });
  }
}