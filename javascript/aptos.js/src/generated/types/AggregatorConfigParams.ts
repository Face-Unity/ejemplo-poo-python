
import * as types from "./"; // eslint-disable-line @typescript-eslint/no-unused-vars

import { HexString } from "aptos"; // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorConfigParams {
  addr: HexString;
  name: Uint8Array;
  metadata: Uint8Array;
  queueAddr: HexString;
  crankAddr: HexString;
  batchSize: BN;
  minOracleResults: BN;
  minJobResults: BN;
  minUpdateDelaySeconds: BN;
  startAfter: BN;
  varianceThreshold: types.SwitchboardDecimal;
  forceReportPeriod: BN;
  expiration: BN;
  disableCrank: boolean;
  historyLimit: BN;
  readCharge: BN;
  rewardEscrow: HexString;
  readWhitelist: Array<HexString>;
  limitReadsToWhitelist: boolean;
  authority: HexString;
}

export interface AggregatorConfigParamsJSON {
  addr: string;
  name: Array<number>;
  metadata: Array<number>;
  queueAddr: string;
  crankAddr: string;
  batchSize: string;