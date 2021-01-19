
import { OracleJob } from "../../lib/cjs";

// Make Job data for eth price
export const ethBinance = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://www.binance.us/api/v3/ticker/price?symbol=ETHUSDT",
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

export const ethFtx = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://ftx.us/api/markets/eth/usd",
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

export const ethKraken = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://api.kraken.com/0/public/Ticker?pair=XETHZUSDT",
          },
        },
        {
          medianTask: {
            tasks: [
              {
                jsonParseTask: {
                  path: "$.result.XETHZUSD.a[0]",
                },
              },
              {
                jsonParseTask: {
                  path: "$.result.XETHZUSD.b[0]",
                },
              },
              {
                jsonParseTask: {
                  path: "$.result.XETHZUSD.c[0]",
                },
              },
            ],
          },
        },
      ],
    })
  ).finish()
);

export const ethCoinbase = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          websocketTask: {
            url: "wss://ws-feed.pro.coinbase.com",
            subscription:
              '{"type":"subscribe","product_ids":["ETH-USD"],"channels":["ticker",{"name":"ticker","product_ids":["ETH-USD"]}]}',
            maxDataAgeSeconds: 15,
            filter: "$[?(@.type == 'ticker' && @.product_id == 'ETH-USD')]",
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

export const ethBitfinex = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://api-pub.bitfinex.com/v2/tickers?symbols=tETHUSD",
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