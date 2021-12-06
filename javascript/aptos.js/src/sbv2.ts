
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
  aggregator_addr: MaybeHexString;
  relay_authority: MaybeHexString; // user that has authority to oracle public keys
  oracle_keys: string[];
}

// set_feed_relay_oracle_keys
export interface AggregatorSetFeedRelayOracleKeys {
  aggregator_addr: MaybeHexString;
  oracle_keys: string[];
}

export interface CrankInitParams {
  queueAddress: MaybeHexString;
  coinType: MoveStructTag;
}

export interface CrankPopParams {
  crankAddress: string;
}

export interface CrankPushParams {
  aggregatorAddress: string;
}

export interface OracleInitParams {
  name: string;
  metadata: string;
  authority: MaybeHexString;
  queue: MaybeHexString;
  coinType: MoveStructTag;
  seed?: MaybeHexString;
}

export interface OracleQueueInitParams {
  authority: MaybeHexString;
  name: string;
  metadata: string;
  oracleTimeout: number;
  reward: number;
  minStake: number;
  slashingEnabled: boolean;
  varianceToleranceMultiplierValue: number;
  varianceToleranceMultiplierScale: number;
  feedProbationPeriod: number;
  consecutiveFeedFailureLimit: number;
  consecutiveOracleFailureLimit: number;
  unpermissionedFeedsEnabled: boolean;
  unpermissionedVrfEnabled: boolean;
  lockLeaseFunding: boolean;

  // this needs to be swapped with Coin or something later
  enableBufferRelayers: boolean;
  maxSize: number;
  save_confirmation_reward?: number;
  save_reward?: number;
  open_round_reward?: number;
  slashing_penalty?: number;
  coinType: MoveStructTag;
}

export interface OracleQueueSetConfigsParams {
  name: string;
  metadata: string;
  authority: MaybeHexString;
  oracleTimeout: number;
  reward: number;
  minStake: number;
  slashingEnabled: boolean;
  varianceToleranceMultiplierValue: number;
  varianceToleranceMultiplierScale: number;
  feedProbationPeriod: number;
  consecutiveFeedFailureLimit: number;
  consecutiveOracleFailureLimit: number;
  unpermissionedFeedsEnabled: boolean;
  unpermissionedVrfEnabled?: boolean;
  lockLeaseFunding: boolean;

  // this needs to be swapped with Coin or something later
  enableBufferRelayers: boolean;
  maxSize: number;
  save_confirmation_reward?: number;
  save_reward?: number;
  open_round_reward?: number;
  slashing_penalty?: number;
  coinType: MoveStructTag;
}

export interface LeaseInitParams {
  aggregatorAddress: MaybeHexString;
  queueAddress: MaybeHexString;
  withdrawAuthority: MaybeHexString;
  initialAmount: number;
  coinType: MoveStructTag;
}

export interface LeaseExtendParams {
  queueAddress: MaybeHexString;
  loadAmount: number;
}

export interface LeaseWithdrawParams {
  queueAddress: MaybeHexString;
  amount: number;
}

export interface LeaseSetAuthorityParams {
  queueAddress: MaybeHexString;
  authority: MaybeHexString;
}

export interface OracleWalletInitParams {
  oracleAddress: MaybeHexString;
  queueAddress: MaybeHexString;
  coinType: string;
}

export interface OracleWalletContributeParams {
  oracleAddress: MaybeHexString;
  queueAddress: MaybeHexString;
  loadAmount: number;
}

export interface OracleWalletWithdrawParams {
  oracleAddress: MaybeHexString;
  queueAddress: MaybeHexString;
  amount: number;
}

export interface PermissionInitParams {
  authority: MaybeHexString;
  granter: MaybeHexString;
  grantee: MaybeHexString;
}

export interface PermissionSetParams {
  authority: MaybeHexString;
  granter: MaybeHexString;
  grantee: MaybeHexString;
  permission: SwitchboardPermission;
  enable: boolean;
}

export type EventCallback = (
  e: any
) => Promise<void> /** | (() => Promise<void>) */;

/**
 * Sends and waits for an aptos tx to be confirmed
 * @param client
 * @param signer
 * @param method Aptos module method (ex: 0xSwitchboard::aggregator_add_job_action)
 * @param args Arguments for method (converts numbers to strings)
 * @returns
 */
export async function sendAptosTx(
  client: AptosClient,
  signer: AptosAccount,
  method: EntryFunctionId,
  args: Array<any>,
  type_args: Array<string> = [],
  maxGasPrice: number = 2000
): Promise<string> {
  const payload = {
    type: "entry_function_payload",
    function: method,
    type_arguments: type_args,
    arguments: args,
  };

  let txnRequest = await client.generateTransaction(signer.address(), payload);

  try {
    const simulation = (
      await client.simulateTransaction(signer, txnRequest, {
        estimateGasUnitPrice: true,
        estimateMaxGasAmount: true, // @ts-ignore
        estimatePrioritizedGasUnitPrice: true,
      })
    )[0];

    if (Number(simulation.gas_unit_price) > maxGasPrice) {
      throw Error(
        `Estimated gas price from simulation ${simulation.gas_unit_price} above maximum (${maxGasPrice}).`
      );
    }

    txnRequest = await client.generateTransaction(signer.address(), payload, {
      gas_unit_price: simulation.gas_unit_price,
    });

    if (simulation.success === false) {
      throw new AptosSimulationError(simulation.vm_status);
    }

    const signedTxn = await client.signTransaction(signer, txnRequest);
    const transactionRes = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(transactionRes.hash);
    return transactionRes.hash;
  } catch (error) {
    const switchboardError = handleError(error);
    if (switchboardError) {
      throw switchboardError;
    }

    throw error;
  }
}

/**
 * Generates an aptos tx for client
 * @param method Aptos module method (ex: 0xSwitchboard::aggregator_add_job_action)
 * @param args Arguments for method (converts numbers to strings)
 * @param type_args Arguments for type_args
 * @returns
 */
export function getAptosTx(
  method: EntryFunctionId,
  args: Array<any>,
  type_args: Array<string> = []
): Types.TransactionPayload {
  const payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: method,
    type_arguments: type_args,
    arguments: args,
  };
  return payload;
}

export async function simulateAndRun(
  client: AptosClient,
  user: AptosAccount,
  txn: Types.TransactionPayload,
  maxGasPrice: number = 3000
) {
  let txnRequest = await client.generateTransaction(
    user.address(),
    txn as Types.EntryFunctionPayload
  );

  const simulation = (
    await client.simulateTransaction(user, txnRequest, {
      estimateGasUnitPrice: true,
      estimateMaxGasAmount: true, // @ts-ignore
      estimatePrioritizedGasUnitPrice: true,
    })
  )[0];

  if (Number(simulation.gas_unit_price) > maxGasPrice) {
    throw Error(
      `Estimated gas price from simulation ${simulation.gas_unit_price} above maximum (${maxGasPrice}).`
    );
  }

  txnRequest = await client.generateTransaction(
    user.address(),
    txn as Types.EntryFunctionPayload,
    { gas_unit_price: simulation.gas_unit_price }
  );

  if (simulation.success === false) {
    throw new AptosSimulationError(simulation.vm_status);
  }

  const signedTxn = await client.signTransaction(user, txnRequest);
  const transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash);
  return transactionRes.hash;
}

export async function sendRawAptosTx(
  client: AptosClient,
  signer: AptosAccount,
  method: EntryFunctionId,
  raw_args: Array<any>,
  raw_type_args: BCS.Seq<TxnBuilderTypes.TypeTag> = [],
  maxGasPrice: number = 2000
): Promise<string> {
  // We need to pass a token type to the `transfer` function.

  const methodInfo = method.split("::");
  const entryFunctionPayload =
    new TxnBuilderTypes.TransactionPayloadEntryFunction(
      TxnBuilderTypes.EntryFunction.natural(
        // Fully qualified module name, `AccountAddress::ModuleName`
        `${methodInfo[0]}::${methodInfo[1]}`,
        // Module function
        methodInfo[2],
        // The coin type to transfer
        raw_type_args,
        // Arguments for function `transfer`: receiver account address and amount to transfer
        raw_args
      )
    );

  let rawTxn = await client.generateRawTransaction(
    signer.address(),
    entryFunctionPayload
  );

  const simulation = (
    await client.simulateTransaction(signer, rawTxn, {
      estimateGasUnitPrice: true,
      estimateMaxGasAmount: true, // @ts-ignore
      estimatePrioritizedGasUnitPrice: true,
    })
  )[0];

  if (Number(simulation.gas_unit_price) > maxGasPrice) {
    throw Error(
      `Estimated gas price from simulation ${simulation.gas_unit_price} above maximum (${maxGasPrice}).`
    );
  }

  rawTxn = await client.generateRawTransaction(
    signer.address(),
    entryFunctionPayload,
    { gasUnitPrice: BigInt(simulation.gas_unit_price) }
  );

  const bcsTxn = AptosClient.generateBCSTransaction(signer, rawTxn);

  if (simulation.success === false) {
    throw new AptosSimulationError(simulation.vm_status);
  }

  const transactionRes = await client.submitSignedBCSTransaction(bcsTxn);
  await client.waitForTransaction(transactionRes.hash);
  return transactionRes.hash;
}

/**
 * Poll Events on Aptos
 * @Note uncleared setTimeout calls will keep processes from ending organically (SIGTERM is needed)
 */
export class AptosEvent {
  intervalId?: ReturnType<typeof setInterval>;
  constructor(
    readonly client: AptosClient,
    readonly eventHandlerOwner: HexString,
    readonly eventOwnerStruct: MoveStructTag,
    readonly eventHandlerName: string,
    readonly pollIntervalMs: number = 1000
  ) {}

  async onTrigger(
    callback: EventCallback,
    errorHandler?: (error: unknown) => void
  ) {
    let lastSequenceNumber = "0";
    const ownerData = await this.client.getAccountResource(
      this.eventHandlerOwner.hex(),
      this.eventOwnerStruct
    );
    try {
      lastSequenceNumber = (
        Number(ownerData.data[this.eventHandlerName].counter) - 1
      ).toString();
    } catch (error) {
      console.error(JSON.stringify(ownerData, undefined, 2), error);
    }
    if (Number(ownerData.data[this.eventHandlerName].counter) === -1) {
      lastSequenceNumber = "0";
    }

    this.intervalId = setInterval(async () => {
      try {
        const events = await this.client.getEventsByEventHandle(
          this.eventHandlerOwner,
          this.eventOwnerStruct,
          this.eventHandlerName,
          {
            start: BigInt(Number(lastSequenceNumber) + 1),
            limit: 500,
          }
        );
        if (events.length !== 0) {
          // increment sequence number
          lastSequenceNumber = events.at(-1)!.sequence_number;
        }
        for (const event of events) {
          callback(event).catch((error) => {
            if (errorHandler) {
              errorHandler(error);
            } else {
              throw error;
            }
          });
        }
      } catch (error) {
        if (errorHandler) {
          errorHandler(error);
        }
      }
    }, this.pollIntervalMs);
    return this.intervalId;
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

export class StateAccount {
  constructor(
    readonly client: AptosClient,
    readonly address: MaybeHexString,
    readonly payer: AptosAccount,
    readonly switchboardAddress: MaybeHexString
  ) {}

  static async init(
    client: AptosClient,
    account: AptosAccount,
    switchboardAddress: MaybeHexString
  ): Promise<[StateAccount, string]> {
    const tx = await sendAptosTx(
      client,
      account,
      `${switchboardAddress}::switchboard_init_action::run`,
      []
    );

    return [
      new StateAccount(client, account.address(), account, switchboardAddress),
      tx,
    ];
  }

  async loadData(): Promise<any> {
    return (
      await this.client.getAccountResource(
        this.address,
        `${this.switchboardAddress}::switchboard::State`
      )
    ).data;
  }
}

export class AggregatorAccount {
  constructor(
    readonly client: AptosClient,
    readonly address: MaybeHexString,
    readonly switchboardAddress: MaybeHexString,
    readonly coinType: MoveStructTag = "0x1::aptos_coin::AptosCoin"
  ) {}

  async loadData(): Promise<types.Aggregator> {
    const results = await this.client.getAccountResources(
      HexString.ensure(this.address).hex()
    );
    const agg = results.reduce((prev: any, current: any) => {
      return {
        ...prev,
        ...current.data,
      };
    }, {});
    const latestConfirmedRound = results
      .filter(
        (res) =>
          res.type ===
          `${this.switchboardAddress}::aggregator::AggregatorRound<${this.switchboardAddress}::aggregator::LatestConfirmedRound>`
      )
      .pop()!.data;
    const currentRound = results
      .filter(
        (res) =>
          res.type ===
          `${this.switchboardAddress}::aggregator::AggregatorRound<${this.switchboardAddress}::aggregator::CurrentRound>`
      )
      .pop()!.data;

    // removed field current_payout
    // @ts-ignore
    currentRound.current_payout = [];
    // @ts-ignore
    latestConfirmedRound.current_payout = [];

    // @ts-ignore
    agg.current_round = currentRound;
    // @ts-ignore
    agg.latest_confirmed_round = latestConfirmedRound;