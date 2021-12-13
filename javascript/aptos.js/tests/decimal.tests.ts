import "mocha";

import * as sbv2 from "../src";

describe("Decimal tests", () => {
  const sbv2Decimal_100: sbv2.types.SwitchboardDecimalMoveStruct = {
    value: "10000",
    dec: 2,
    neg: false,
  };

  const round: sbv2.types.AggregatorRoundMoveStruct = {
    id: "1",
    round_open_timestamp: "",
    round_open_block_height: "",
    result: sbv2Decimal_100,
    std_deviation: sbv2Decimal_100,
    min_response: sbv2Decimal_100,
    max_response: sbv2Decimal_100,
    oracle_keys: ["", 