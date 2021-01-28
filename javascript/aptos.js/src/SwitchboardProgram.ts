
import { MAINNET_PROGRAM_ID, TESTNET_PROGRAM_ID } from "./generated";

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

export type AptosNetwork = "localnet" | "devnet" | "testnet" | "mainnet";

export class AptosSimulationError extends Error {
  constructor(message: string) {
    super(`SimulationError: ${message}`);
    Object.setPrototypeOf(this, AptosSimulationError.prototype);
  }
}

export function getProgramId(
  networkId: AptosNetwork,
  programId?: MaybeHexString
): HexString {
  if (programId) {
    return HexString.ensure(programId);
  }
  switch (networkId) {
    case "mainnet":
      return HexString.ensure(MAINNET_PROGRAM_ID);
    case "testnet":
      return HexString.ensure(TESTNET_PROGRAM_ID);
    default:
      throw new Error(
        `Failed to find Aptos ProgramID. Try passing in a programId`
      );
  }
}

export function getRpcUrl(networkId: AptosNetwork): string {
  switch (networkId) {
    case "mainnet":
      return "https://fullnode.mainnet.aptoslabs.com/v1";
    case "testnet":
      return "https://fullnode.testnet.aptoslabs.com/v1";
    case "devnet":
      return "http://localhost:8080";
    case "localnet":
      return;
    default:
      throw new Error(
        `Failed to find Aptos RpcUrl for network ${networkId}. Try passing in an rpcUrl`
      );
  }
}

export class SwitchboardProgram {
  constructor(
    readonly client: AptosClient,
    readonly network: AptosNetwork,
    readonly switchboardAddress: MaybeHexString,
    readonly signer?: AptosAccount,
    readonly coinType: MoveStructTag = "0x1::aptos_coin::AptosCoin"
  ) {}

  get READ_ONLY(): boolean {
    return this.signer === undefined;
  }

  get newAccount(): AptosAccount {
    return new AptosAccount();
  }

  static getAccount(
    privateKeyBytes?: Uint8Array | undefined,
    address?: MaybeHexString
  ): AptosAccount {
    return new AptosAccount(privateKeyBytes, address);
  }

  static async load(
    network: AptosNetwork,
    rpcUrl?: string,
    programId?: MaybeHexString,
    signer?: AptosAccount,
    coinType: MoveStructTag = "0x1::aptos_coin::AptosCoin"
  ): Promise<SwitchboardProgram> {
    const switchboardAddress = programId ?? getProgramId(network, programId);

    const client = new AptosClient(rpcUrl ?? getRpcUrl(network));

    return new SwitchboardProgram(
      client,
      network,
      switchboardAddress,
      signer,
      coinType
    );
  }

  /**
   * Generates an aptos tx for client
   * @param method Aptos module method (ex: 0xSwitchboard::aggregator_add_job_action)
   * @param args Arguments for method (converts numbers to strings)
   * @param type_args Arguments for type_args
   * @returns aptos transaction
   */
  public getAptosTx(
    method: EntryFunctionId,
    args: Array<any>,
    type_args: Array<string> = []
  ): Types.EntryFunctionPayload {
    const payload: Types.EntryFunctionPayload = {
      function: method,
      type_arguments: type_args,
      arguments: args,
    };
    return payload;
  }

  /**
   * Sends and waits for an aptos tx to be confirmed
   * @param method Aptos module method (ex: 0xSwitchboard::aggregator_add_job_action)
   * @param args Arguments for method (converts numbers to strings)
   * @param signer
   * @returns transaction hash
   */
  public async sendAptosTx(
    method: EntryFunctionId,
    args: Array<any>,
    type_args: Array<string> = [],
    _signer?: AptosAccount,
    maxGasPrice: number = 2000
  ): Promise<string> {
    const signer = _signer ?? this.signer;
    if (!signer) {
      throw new Error(`Need to provide a signer to pay for transactions`);
    }

    const payload = this.getAptosTx(method, args, type_args);

    let txnRequest = await this.client.generateTransaction(
      signer.address(),
      payload
    );

    const simulation = (
      await this.client.simulateTransaction(signer, txnRequest, {
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

    txnRequest = await this.client.generateTransaction(
      signer.address(),
      payload,
      {
        gas_unit_price: simulation.gas_unit_price,
      }
    );

    if (simulation.success === false) {
      throw new AptosSimulationError(simulation.vm_status);
    }

    const signedTxn = await this.client.signTransaction(signer, txnRequest);
    const transactionRes = await this.client.submitTransaction(signedTxn);
    await this.client.waitForTransaction(transactionRes.hash);
    return transactionRes.hash;
  }

  public async simulateAndRun(
    txn: Types.TransactionPayload,
    _user?: AptosAccount,
    maxGasPrice: number = 3000
  ): Promise<string> {
    const user = _user ?? this.signer;
    if (!user) {
      throw new Error(`Need to provide user to simulate transaction`);
    }

    let txnRequest = await this.client.generateTransaction(
      user.address(),
      txn as Types.EntryFunctionPayload
    );

    const simulation = (
      await this.client.simulateTransaction(user, txnRequest, {
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

    txnRequest = await this.client.generateTransaction(
      user.address(),
      txn as Types.EntryFunctionPayload,
      { gas_unit_price: simulation.gas_unit_price }
    );

    if (simulation.success === false) {
      throw new AptosSimulationError(simulation.vm_status);
    }

    const signedTxn = await this.client.signTransaction(user, txnRequest);
    const transactionRes = await this.client.submitTransaction(signedTxn);
    await this.client.waitForTransaction(transactionRes.hash);
    return transactionRes.hash;
  }

  public async sendRawAptosTx(
    method: EntryFunctionId,
    raw_args: Array<any>,
    raw_type_args: BCS.Seq<TxnBuilderTypes.TypeTag> = [],
    _signer?: AptosAccount,
    maxGasPrice: number = 2000
  ): Promise<string> {
    const signer = _signer ?? this.signer;
    if (!signer) {
      throw new Error(`Need to provide a signer to pay for transactions`);
    }
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

    let rawTxn = await this.client.generateRawTransaction(
      signer.address(),
      entryFunctionPayload
    );

    const simulation = (
      await this.client.simulateTransaction(signer, rawTxn, {
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

    rawTxn = await this.client.generateRawTransaction(
      signer.address(),
      entryFunctionPayload,
      { gasUnitPrice: BigInt(simulation.gas_unit_price) }
    );

    const bcsTxn = AptosClient.generateBCSTransaction(signer, rawTxn);

    if (simulation.success === false) {
      throw new AptosSimulationError(simulation.vm_status);
    }

    const transactionRes = await this.client.submitSignedBCSTransaction(bcsTxn);
    await this.client.waitForTransaction(transactionRes.hash);
    return transactionRes.hash;
  }
}