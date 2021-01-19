
import { OracleJob } from "../../lib/cjs";

// Make Job data for btc price
export const btcBinance = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://www.binance.us/api/v3/ticker/price?symbol=BTCUSDT",
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

export const btcFtx = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://ftx.us/api/markets/btc/usd",
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

export const btcKraken = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD",
          },
        },
        {
          medianTask: {
            tasks: [
              {
                jsonParseTask: {
                  path: "$.result.XXBTZUSD.a[0]",
                },
              },
              {
                jsonParseTask: {
                  path: "$.result.XXBTZUSD.b[0]",
                },
              },
              {
                jsonParseTask: {
                  path: "$.result.XXBTZUSD.c[0]",
                },
              },
            ],
          },
        },
      ],
    })
  ).finish()
);

export const btcCoinbase = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          websocketTask: {
            url: "wss://ws-feed.pro.coinbase.com",
            subscription:
              '{"type":"subscribe","product_ids":["BTC-USD"],"channels":["ticker",{"name":"ticker","product_ids":["BTC-USD"]}]}',
            maxDataAgeSeconds: 15,
            filter: "$[?(@.type == 'ticker' && @.product_id == 'BTC-USD')]",
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

export const btcBitfinex = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD",
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