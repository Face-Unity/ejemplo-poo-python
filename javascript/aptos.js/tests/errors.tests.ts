
import "mocha";

import * as sbv2 from "../src";

import assert from "assert";

describe("Errors tests", () => {
  it("Converts a move abort error", async () => {
    const crankPopError = new Error(
      "Move abort in 0x7d7e436f0b2aafde60774efb26ccc432cf881b677aca7faaf2a01879bd19fb8::crank_pop_action: 0x10022"
    );
    const sbv2Error = sbv2.handleError(crankPopError);
    if (
      !sbv2Error ||
      !(sbv2Error instanceof sbv2.errors.AggregatorIllegalRoundOpenCall)
    ) {
      throw new Error(`Failed to handle conversion of move abort code`);
    }
  });

  it("Returns undefined if no error is found", async () => {
    const sbv2Error = sbv2.handleError(new Error(`Undefined error message`));
    if (sbv2Error) {
      throw new Error(`Failed to return undefined for a non-switchboard error`);
    }
  });
});