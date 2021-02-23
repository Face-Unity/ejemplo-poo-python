export enum SwitchboardErrorEnum {
  Generic = "Generic",
  StateNotFound = "StateNotFound",
  QueueNotFound = "QueueNotFound",
  OracleNotFound = "OracleNotFound",
  JobNotFound = "JobNotFound",
  CrankNotFound = "CrankNotFound",
  AggregatorNotFound = "AggregatorNotFound",
  LeaseNotFound = "LeaseNotFound",
  OracleWalletNotFound = "OracleWalletNotFound",
  StateAlreadyExists = "StateAlreadyExists",
  QueueAlreadyExists = "QueueAlreadyExists",
  OracleAlreadyExists = "OracleAlreadyExists",
  JobAlreadyExists = "JobAlreadyExists",
  CrankAlreadyExists = "CrankAlreadyExists",
  AggregatorAlreadyExists = "AggregatorAlreadyExists",
  LeaseAlreadyExists = "LeaseAlreadyExists",
  OracleWalletAlreadyExists = "OracleWalletAlreadyExists",
  InvalidAuthority = "InvalidAuthority",
  PermissionDenied = "PermissionDenied",
  CrankDisabled = "CrankDisabled",
  OracleMismatch = "OracleMismatch",
  JobsChecksumMismatch = "JobsChecksumMismatch",
  OracleAlreadyResponded = "OracleAlreadyResponded",
  InvalidArgument = "InvalidArgument",
  CrankNotReady = "CrankNotReady",
  CrankEmpty = "CrankEmpty",
  LeaseInactive = "LeaseInactive",
  AggregatorLocked = "AggregatorLocked",
  InsufficientCoin = "InsufficientCoin",
  LeaseInsufficientCoin = "LeaseInsufficientCoin",
  OracleWalletInsufficientCoin = "OracleWalletInsufficientCoin",
  AggregatorInvalidBatchSize = "AggregatorInvalidBatchSize",
  AggregatorInvalidMinOracleResults = "AggregatorInvalidMinOracleResults",
  AggregatorInvalidUpdateDelay = "AggregatorInvalidUpdateDelay",
  AggregatorIllegalRoundOpenCall = "AggregatorIllegalRoundOpenCall",
  AggregatorQueueNotReady = "AggregatorQueueNotReady",
  ResourceAlreadyExists = "ResourceAlreadyExists",
  PermissionAlreadyExists = "PermissionAlreadyExists",
}
export type SwitchboardErrorType =
  | Generic
  | StateNotFound
  | QueueNotFound
  | OracleNotFound
  | JobNotFound
  | CrankNotFound
  | AggregatorNotFound
  | LeaseNotFound
  | OracleWalletNotFound
  | StateAlreadyExists
  | QueueAlreadyExists
  | OracleAlreadyExists
  | JobAlreadyExists
  | CrankAlreadyExists
  | AggregatorAlreadyExists
  | LeaseAlreadyExists
  | OracleWalletAlreadyExists
  | InvalidAuthority
  | PermissionDenied
  | CrankDisabled
  | OracleMismatch
  | JobsChecksumMismatch
  | OracleAlreadyResponded
  | InvalidArgument
  | CrankNotReady
  | CrankEmpty
  | LeaseInactive
  | AggregatorLocked
  | InsufficientCoin
  | LeaseInsufficientCoin
  | OracleWalletInsufficientCoin
  | AggregatorInvalidBatchSize
  | AggregatorInvalidMinOracleResults
  | AggregatorInvalidUpdateDelay
  | AggregatorIllegalRoundOpenCall
  | AggregatorQueueNotReady
  | ResourceAlreadyExists
  | PermissionAlreadyExists;

export abstract class SwitchboardError extends Error {
  readonly logs?: string[];

  constructor(
    readonly code: number,
    readonly hexCode: string,
    readonly name: string,
    readonly msg?: string,
    logs?: string[]
  ) {
    super(`${code}: ${name}${msg ? " - " + msg : ""}`);
    this.logs = logs;
  }

  static fromErrorType(
    errorType: SwitchboardErrorEnum,
    logs?: string[]
  ): SwitchboardError {
    switch (errorType) {
      case "Generic":
        return new Generic(logs);
      case "StateNotFound":
        return new StateNotFound(logs);
      case "QueueNotFound":
        return new QueueNotFound(logs);
      case "OracleNotFound":
        return new OracleNotFound(logs);
      case "JobNotFound":
        return new JobNotFound(logs);
      case "CrankNotFound":
        return new CrankNotFound(logs);
      case "AggregatorNotFound":
        return new AggregatorNotFound(logs);
      case "LeaseNotFound":
        return new LeaseNotFound(logs);
      case "OracleWalletNotFound":
        return new OracleWalletNotFound(logs);
      case "StateAlreadyExists":
        return new StateAlreadyExists(logs);
      case "QueueAlreadyExists":
        return new QueueAlreadyExists(logs);
      case "OracleAlreadyExists":
        return new OracleAlreadyExists(logs);
      case "JobAlreadyExists":
        return new JobAlreadyExists(logs);
      case "CrankAlreadyExists":
        return new CrankAlreadyExists(logs);
      case "AggregatorAlreadyExists":
        return new AggregatorAlreadyExists(logs);
      case "LeaseAlreadyExists":
        return new LeaseAlreadyExists(logs);
      case "OracleWalletAlreadyExists":
        return new OracleWalletAlreadyExists(logs);
      case "InvalidAuthority":
        return new InvalidAuthority(logs);
      case "PermissionDenied":
        return new PermissionDenied(logs);
      case "CrankDisabled":
        return new CrankDisabled(logs);
      case "OracleMismatch":
        return new OracleMismatch(logs);
      case "JobsChecksumMismatch":
        return new JobsChecksumMismatch(logs);
      case "OracleAlreadyResponded":
        return new OracleAlreadyResponded(logs);
      case "InvalidArgument":
        return new InvalidArgument(logs);
      case "CrankNotReady":
        return new CrankNotReady(logs);
      case "CrankEmpty":
        return new CrankEmpty(logs);
      case "LeaseInactive":
        return new LeaseInactive(logs);
      case "AggregatorLocked":
        return new AggregatorLocked(logs);
      case "InsufficientCoin":
        return new InsufficientCoin(logs);
      case "LeaseInsufficientCoin":
        return new LeaseInsufficientCoin(logs);
      case "OracleWalletInsufficientCoin":
        return new OracleWalletInsufficientCoin(logs);
      case "AggregatorInvalidBatchSize":
        return new AggregatorInvalidBatchSize(logs);
      case "AggregatorInvalidMinOracleResults":
        return new AggregatorInvalidMinOracleResults(logs);
      case "AggregatorInvalidUpdateDelay":
        return new AggregatorInvalidUpdateDelay(logs);
      case "AggregatorIllegalRoundOpenCall":
        return new AggregatorIllegalRoundOpenCall(logs);
      case "AggregatorQueueNotReady":
        return new AggregatorQueueNotReady(logs);
      case "ResourceAlreadyExists":
        return new ResourceAlreadyExists(logs);
      case "PermissionAlreadyExists":
        return new PermissionAlreadyExists(logs);
      default:
        return new Generic(logs);
    }
  }
}
export class Generic extends SwitchboardError {
  static readonly code = 0;
  static readonly hexCode = "0xb0000";

  constructor(readonly logs?: string[]) {
    super(0, "0xb0000", "Generic", undefined, logs);
  }
}

export class StateNotFound extends SwitchboardError {
  static readonly code = 1;
  static readonly hexCode = "0x60001";

  constructor(readonly logs?: string[]) {
    super(1, "0x60001", "StateNotFound", undefined, logs);
  }
}

export class QueueNotFound extends SwitchboardError {
  static readonly code = 2;
  static readonly hexCode = "0x60002";

  constructor(readonly logs?: s