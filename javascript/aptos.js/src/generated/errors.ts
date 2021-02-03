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
        re