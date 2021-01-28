
import {
  SwitchboardError,
  SwitchboardErrorEnum,
  SwitchboardErrorType,
} from "./generated";

export const ErrorCodeMap: Map<string, SwitchboardErrorEnum> = new Map([
  ["0xb0000", SwitchboardErrorEnum["Generic"]],
  ["0x60001", SwitchboardErrorEnum["StateNotFound"]],
  ["0x60002", SwitchboardErrorEnum["QueueNotFound"]],
  ["0x60003", SwitchboardErrorEnum["OracleNotFound"]],
  ["0x60004", SwitchboardErrorEnum["JobNotFound"]],
  ["0x60005", SwitchboardErrorEnum["CrankNotFound"]],
  ["0x60006", SwitchboardErrorEnum["AggregatorNotFound"]],
  ["0x60007", SwitchboardErrorEnum["LeaseNotFound"]],
  ["0x60008", SwitchboardErrorEnum["OracleWalletNotFound"]],
  ["0x80009", SwitchboardErrorEnum["StateAlreadyExists"]],
  ["0x8000a", SwitchboardErrorEnum["QueueAlreadyExists"]],
  ["0x8000b", SwitchboardErrorEnum["OracleAlreadyExists"]],
  ["0x8000c", SwitchboardErrorEnum["JobAlreadyExists"]],
  ["0x8000d", SwitchboardErrorEnum["CrankAlreadyExists"]],
  ["0x8000e", SwitchboardErrorEnum["AggregatorAlreadyExists"]],
  ["0x8000f", SwitchboardErrorEnum["LeaseAlreadyExists"]],
  ["0x80010", SwitchboardErrorEnum["OracleWalletAlreadyExists"]],
  ["0x50011", SwitchboardErrorEnum["InvalidAuthority"]],
  ["0x50012", SwitchboardErrorEnum["PermissionDenied"]],
  ["0x50013", SwitchboardErrorEnum["CrankDisabled"]],
  ["0x10014", SwitchboardErrorEnum["OracleMismatch"]],
  ["0x10015", SwitchboardErrorEnum["JobsChecksumMismatch"]],
  ["0x10016", SwitchboardErrorEnum["OracleAlreadyResponded"]],
  ["0x10017", SwitchboardErrorEnum["InvalidArgument"]],
  ["0x30018", SwitchboardErrorEnum["CrankNotReady"]],
  ["0x30019", SwitchboardErrorEnum["CrankEmpty"]],
  ["0x3001a", SwitchboardErrorEnum["LeaseInactive"]],
  ["0x3001b", SwitchboardErrorEnum["AggregatorLocked"]],
  ["0x9001c", SwitchboardErrorEnum["InsufficientCoin"]],
  ["0x9001d", SwitchboardErrorEnum["LeaseInsufficientCoin"]],
  ["0x9001e", SwitchboardErrorEnum["OracleWalletInsufficientCoin"]],
  ["0x1001f", SwitchboardErrorEnum["AggregatorInvalidBatchSize"]],
  ["0x10020", SwitchboardErrorEnum["AggregatorInvalidMinOracleResults"]],
  ["0x10021", SwitchboardErrorEnum["AggregatorInvalidUpdateDelay"]],
  ["0x10022", SwitchboardErrorEnum["AggregatorIllegalRoundOpenCall"]],
  ["0x10023", SwitchboardErrorEnum["AggregatorQueueNotReady"]],
  ["0x80024", SwitchboardErrorEnum["ResourceAlreadyExists"]],
  ["0x80025", SwitchboardErrorEnum["PermissionAlreadyExists"]],
]);

const MoveAbortRegex = new RegExp(
  /Move abort in (?<programId>[^:]+)::(?<action>[^:]+): (?<errorCode>0x[a-fA-F0-9]+)/gm
);

export function handleError(error: unknown): SwitchboardErrorType | undefined {
  const errorString = `${error}`;

  const match = Array.from(errorString.matchAll(MoveAbortRegex));
  if (match && match.length) {
    const { programId, action, errorCode } = match[0].groups;

    if (!ErrorCodeMap.has(errorCode)) {
      return undefined;
    }

    const error = ErrorCodeMap.get(errorCode)!;

    return SwitchboardError.fromErrorType(error, [errorString]);
  }

  return undefined;
}