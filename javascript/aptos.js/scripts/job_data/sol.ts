
import { OracleJob } from "../../lib/cjs";

// Make Job data for sol price
export const solBinance = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://www.binance.us/api/v3/ticker/price?symbol=SOLUSD",
          },
        },
        {
          jsonParseTask: {
            path: "$.price",
          },
        },
      ],
    })
  ).finish()
);

export const solFtxus = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://ftx.us/api/markets/sol/usd",
          },
        },
        {
          jsonParseTask: {
            path: "$.result.price",
          },
        },
      ],
    })
  ).finish()
);

export const solFtx = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          websocketTask: {
            url: "wss://ftx.com/ws/",
            subscription:
              '{"op":"subscribe","channel":"ticker","market":"SOL/USD"}',
            maxDataAgeSeconds: 15,
            filter:
              "$[?(@.type == 'update' && @.channel == 'ticker' && @.market == 'SOL/USD')]",
          },
        },
        {
          medianTask: {
            tasks: [
              {
                jsonParseTask: {
                  path: "$.data.bid",
                },
              },
              {
                jsonParseTask: {
                  path: "$.data.ask",
                },
              },
              {
                jsonParseTask: {
                  path: "$.data.last",
                },
              },
            ],
          },
        },
      ],
    })
  ).finish()
);

export const solBitfinex = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://api-pub.bitfinex.com/v2/tickers?symbols=tSOLUSD",
          },
        },
        {
          medianTask: {
            tasks: [
              {
                jsonParseTask: {
                  path: "$[0][1]",
                },
              },
              {
                jsonParseTask: {
                  path: "$[0][3]",
                },
              },
              {
                jsonParseTask: {
                  path: "$[0][7]",
                },
              },
            ],
          },
        },
      ],
    })
  ).finish()
);