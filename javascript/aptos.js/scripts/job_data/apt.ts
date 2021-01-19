
import { OracleJob } from "../../lib/cjs";

// Make Job data for apt price
export const aptBinance = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://www.binance.com/api/v3/ticker/price?symbol=APTUSDT",
          },
        },
        { jsonParseTask: { path: "$.price" } },
        {
          multiplyTask: {
            aggregatorPubkey: "ETAaeeuQBwsh9mC2gCov9WdhJENZuffRMXY2HgjCcSL9",
          },
        },
      ],
    })
  ).finish()
);

export const aptFtx = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://ftx.com/api/markets/apt/usd",
          },
        },
        { jsonParseTask: { path: "$.result.price" } },
      ],
    })
  ).finish()
);

export const aptCoinbase = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://api.coinbase.com/v2/prices/apt-usd/spot",
          },
        },
        { jsonParseTask: { path: "$.data.amount" } },
      ],
    })
  ).finish()
);