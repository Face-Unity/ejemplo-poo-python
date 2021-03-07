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

  constructor(readonly logs?: string[]) {
    super(2, "0x60002", "QueueNotFound", undefined, logs);
  }
}

export class OracleNotFound extends SwitchboardError {
  static readonly code = 3;
  static readonly hexCode = "0x60003";

  constructor(readonly logs?: string[]) {
    super(3, "0x60003", "OracleNotFound", undefined, logs);
  }
}

export class JobNotFound extends SwitchboardError {
  static readonly code = 4;
  static readonly hexCode = "0x60004";

  constructor(readonly logs?: string[]) {
    super(4, "0x60004", "JobNotFound", undefined, logs);
  }
}

export class CrankNotFound extends SwitchboardError {
  static readonly code = 5;
  static readonly hexCode = "0x60005";

  constructor(readonly logs?: string[]) {
    super(5, "0x60005", "CrankNotFound", undefined, logs);
  }
}

export class AggregatorNotFound extends SwitchboardError {
  static readonly code = 6;
  static readonly hexCode = "0x60006";

  constructor(readonly logs?: string[]) {
    super(6, "0x60006", "AggregatorNotFound", undefined, logs);
  }
}

export class LeaseNotFound extends SwitchboardError {
  static readonly code = 7;
  static readonly hexCode = "0x60007";

  constructor(readonly logs?: string[]) {
    super(7, "0x60007", "LeaseNotFound", undefined, logs);
  }
}

export class OracleWalletNotFound extends SwitchboardError {
  static readonly code = 8;
  static readonly hexCode = "0x60008";

  constructor(readonly logs?: string[]) {
    super(8, "0x60008", "OracleWalletNotFound", undefined, logs);
  }
}

export class StateAlreadyExists extends SwitchboardError {
  static readonly code = 9;
  static readonly hexCode = "0x80009";

  constructor(readonly logs?: string[]) {
    super(9, "0x80009", "StateAlreadyExists", undefined, logs);
  }
}

export class QueueAlreadyExists extends SwitchboardError {
  static readonly code = 10;
  static readonly hexCode = "0x8000a";

  constructor(readonly logs?: string[]) {
    super(10, "0x8000a", "QueueAlreadyExists", undefined, logs);
  }
}

export class OracleAlreadyExists extends SwitchboardError {
  static readonly code = 11;
  static readonly hexCode = "0x8000b";

  constructor(readonly logs?: string[]) {
    super(11, "0x8000b", "OracleAlreadyExists", undefined, logs);
  }
}

export class JobAlreadyExists extends SwitchboardError {
  static readonly code = 12;
  static readonly hexCode = "0x8000c";

  constructor(readonly logs?: string[]) {
    super(12, "0x8000c", "JobAlreadyExists", undefined, logs);
  }
}

export class CrankAlreadyExists extends SwitchboardError {
  static readonly code = 13;
  static readonly hexCode = "0x8000d";

  constructor(readonly logs?: string[]) {
    super(13, "0x8000d", "CrankAlreadyExists", undefined, logs);
  }
}

export class AggregatorAlreadyExists extends SwitchboardError {
  static readonly code = 14;
  static readonly hexCode = "0x8000e";

  constructor(readonly logs?: string[]) {
    super(14, "0x8000e", "AggregatorAlreadyExists", undefined, logs);
  }
}

export class LeaseAlreadyExists extends SwitchboardError {
  static readonly code = 15;
  static readonly hexCode = "0x8000f";

  constructor(readonly logs?: string[]) {
    super(15, "0x8000f", "LeaseAlreadyExists", undefined, logs);
  }
}

export class OracleWalletAlreadyExists extends SwitchboardError {
  static readonly code = 16;
  static readonly hexCode = "0x80010";

  constructor(readonly logs?: string[]) {
    super(16, "0x80010", "OracleWalletAlreadyExists", undefined, logs);
  }
}

export class InvalidAuthority extends SwitchboardError {
  static readonly code = 17;
  static readonly hexCode = "0x50011";

  constructor(readonly logs?: string[]) {
    super(17, "0x50011", "InvalidAuthority", undefined, logs);
  }
}

export class PermissionDenied extends SwitchboardError {
  static readonly code = 18;
  static readonly hexCode = "0x50012";

  constructor(readonly logs?: string[]) {
    super(18, "0x50012", "PermissionDenied", undefined, logs);
  }
}

export class CrankDisabled extends SwitchboardError {
  static readonly code = 19;
  static readonly hexCode = "0x50013";

  constructor(readonly logs?: string[]) {
    super(19, "0x50013", "CrankDisabled", undefined, logs);
  }
}

export class OracleMismatch extends SwitchboardError {
  static readonly code = 20;
  static readonly hexCode = "0x10014";

  constructor(readonly logs?: string[]) {
    super(20, "0x10014", "OracleMismatch", undefined, logs);
  }
}

export class JobsChecksumMismatch extends SwitchboardError {
  static readonly code = 21;
  static readonly hexCode = "0x10015";

  constructor(readonly logs?: string[]) {
    super(21, "0x10015", "JobsChecksumMismatch", undefined, logs);
  }
}

export class OracleAlreadyResponded extends SwitchboardError {
  static readonly code = 22;
  static readonly hexCode = "0x10016";

  constructor(readonly logs?: string[]) {
    super(22, "0x10016", "OracleAlreadyResponded", undefined, logs);
  }
}

export class InvalidArgument extends SwitchboardError {
  static readonly code = 23;
  static readonly hexCode = "0x10017";

  constructor(readonly logs?: string[]) {
    super(23, "0x10017", "InvalidArgument", undefined, logs);
  }
}

export class CrankNotReady extends SwitchboardError {
  static readonly code = 24;
  static readonly hexCode = "0x30018";

  constructor(readonly logs?: string[]) {
    super(24, "0x30018", "CrankNotReady", undefined, logs);
  }
}

export class CrankEmpty extends SwitchboardError {
  static readonly code = 25;
  static readonly hexCode = "0x30019";

  constructor(readonly logs?: string[]) {
    super(25, "0x30019", "CrankEmpty", undefined, logs);
  }
}

export class LeaseInactive extends SwitchboardErro