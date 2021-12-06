
import * as types from "./generated/types";
import { handleError } from "./SwitchboardError";
import { AptosSimulationError } from "./SwitchboardProgram";

import { OracleJob } from "@switchboard-xyz/common";
import {
  AptosAccount,
  AptosClient,
  BCS,
  HexString,
  MaybeHexString,
  TxnBuilderTypes,
  Types,
} from "aptos";
import { EntryFunctionId, MoveStructTag } from "aptos/src/generated";
import Big from "big.js";
import BN from "bn.js";
import * as SHA3 from "js-sha3";

export { IOracleJob, OracleJob } from "@switchboard-xyz/common";
export const SWITCHBOARD_DEVNET_ADDRESS = `0xb91d3fef0eeb4e685dc85e739c7d3e2968784945be4424e92e2f86e2418bf271`;
export const SWITCHBOARD_TESTNET_ADDRESS = `0xb91d3fef0eeb4e685dc85e739c7d3e2968784945be4424e92e2f86e2418bf271`;
export const SWITCHBOARD_MAINNET_ADDRESS = `0x7d7e436f0b2aafde60774efb26ccc432cf881b677aca7faaf2a01879bd19fb8`;

export interface EncodeUpdateParams {
  account: AptosAccount;
  result: Big | number;
  minResult: Big | number;
  maxResult: Big | number;
  timestamp: number;
  aggregatorAddress: MaybeHexString;
  jobsChecksum: string;
  oraclePublicKey: string;
  oracleAddress?: MaybeHexString;
}

export function encodeUpdate({
  account,
  result,
  minResult,
  maxResult,
  timestamp,
  aggregatorAddress,
  jobsChecksum,
  oraclePublicKey,
  oracleAddress,
}: EncodeUpdateParams) {
  const serializeSwitchboardDecimal = (dec: AptosDecimal) => [
    ...BCS.bcsSerializeU128(Number(dec.mantissa)).reverse(),
    ...BCS.bcsSerializeU8(dec.scale).reverse(),
    ...BCS.bcsSerializeBool(dec.neg).reverse(),
  ];

  const sbResult = AptosDecimal.fromBig(new Big(result));
  const sbMinResult = AptosDecimal.fromBig(new Big(minResult));
  const sbMaxResult = AptosDecimal.fromBig(new Big(maxResult));

  const message = new Uint8Array([
    ...serializeSwitchboardDecimal(sbResult),
    ...serializeSwitchboardDecimal(sbMinResult),
    ...serializeSwitchboardDecimal(sbMaxResult),
    ...BCS.bcsSerializeUint64(timestamp).reverse(),
    ...BCS.bcsToBytes(
      TxnBuilderTypes.AccountAddress.fromHex(aggregatorAddress)
    ),
    ...BCS.bcsSerializeBytes(Buffer.from(jobsChecksum, "hex")),
    ...BCS.bcsToBytes(
      TxnBuilderTypes.AccountAddress.fromHex(oracleAddress ?? "0x0")
    ),
    ...BCS.bcsSerializeBytes(
      new TxnBuilderTypes.Ed25519PublicKey(
        Buffer.from(oraclePublicKey, "hex")
      ).toBytes()
    ),
  ]);

  const signature = account.signBuffer(message).toUint8Array();
  return new Uint8Array([...message, ...signature]);
}

export class AptosDecimal {
  constructor(
    readonly mantissa: string,
    readonly scale: number,
    readonly neg: boolean
  ) {}

  toBig(): Big {
    const oldDp = Big.DP;
    Big.DP = 18;
    let result = new Big(this.mantissa);
    if (this.neg === true) {
      result = result.mul(-1);
    }
    const TEN = new Big(10);
    result = safeDiv(result, TEN.pow(this.scale));
    Big.DP = oldDp;
    return result;
  }

  static fromBig(val: Big): AptosDecimal {
    const value = val.c.slice();
    const e = val.e + 1;
    while (value.length - e > 9) {
      value.pop();
    }

    // Aptos decimals cannot have a negative scale
    while (value.length - e < 0) {
      value.push(0);
    }

    return new AptosDecimal(value.join(""), value.length - e, val.s === -1);
  }

  static fromObj(obj: Object): AptosDecimal {
    const properties = ["mantissa", "scale", "neg"];
    properties.forEach((p) => {
      if (!(p in obj)) {
        throw new Error(`Object is missing property ${p}`);
      }
    });

    return new AptosDecimal(obj["mantissa"], obj["scale"], obj["neg"]);
  }
}

export enum SwitchboardPermission {
  PERMIT_ORACLE_HEARTBEAT,
  PERMIT_ORACLE_QUEUE_USAGE,
  PERMIT_VRF_REQUESTS,
}

export interface AggregatorAddJobParams {
  job: MaybeHexString;
  weight?: number;
}

export interface AggregatorInitParams {
  authority: MaybeHexString; // owner of aggregator
  name?: string;
  metadata?: string;
  queueAddress: MaybeHexString;
  crankAddress: MaybeHexString;
  coinType: MoveStructTag;
  batchSize: number;
  minOracleResults: number;
  minJobResults: number;
  minUpdateDelaySeconds: number;
  startAfter?: number;
  varianceThreshold?: Big;
  forceReportPeriod?: number;
  expiration?: number;
  disableCrank?: boolean;
  historySize?: number;
  readCharge?: number;
  rewardEscrow?: string;
  readWhitelist?: MaybeHexString[];
  limitReadsToWhitelist?: boolean;
  seed?: MaybeHexString;
}

export interface AggregatorSaveResultParams {
  oracleAddress: MaybeHexString;
  oracleIdx: number;
  error: boolean;
  // this should probably be automatically generated
  value: Big;
  jobsChecksum: string;
  minResponse: Big;
  maxResponse: Big;
}

export interface OracleSaveResultParams extends AggregatorSaveResultParams {
  aggregatorAddress: MaybeHexString;
}

export interface JobInitParams {
  name: string;
  metadata: string;
  authority: MaybeHexString;
  data: string;
  weight?: number;
}

export interface AggregatorRemoveJobParams {
  aggregatorAddress: string;
  job: string;
}

export interface AggregatorSetConfigParams {
  authority?: string;
  name?: string;
  metadata?: string;
  queueAddress?: MaybeHexString;
  crankAddress?: MaybeHexString;
  batchSize?: number;
  minOracleResults?: number;
  minJobResults?: number;
  minUpdateDelaySeconds?: number;
  startAfter?: number;
  varianceThreshold?: Big;
  forceReportPeriod?: number;
  expiration?: number;
  disableCrank?: boolean;
  historySize?: number;
  readCharge?: number;
  rewardEscrow?: MaybeHexString;
  readWhitelist?: MaybeHexString[];
  limitReadsToWhitelist?: boolean;
  coinType?: string;
}

export interface AggregatorSetFeedRelayParams {