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
  | AggregatorQ