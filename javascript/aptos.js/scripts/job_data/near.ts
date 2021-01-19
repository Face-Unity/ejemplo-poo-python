
import { OracleJob } from "../../lib/cjs";

// Make Job data for near price
export const nearBinance = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          httpTask: {
            url: "https://www.binance.us/api/v3/ticker/price?symbol=NEARUSD",
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

export const nearFtx = Buffer.from(
  OracleJob.encodeDelimited(
    OracleJob.create({
      tasks: [
        {
          websocketTask: {
            url: "wss://ftx.com/ws/",
            subscription:
              '{"op":"subscribe","channel":"ticker","market":"NEAR/USD"}',
            maxDataAgeSeconds: 15,
            filter:
              "$[?(@.type == 'update' && @.channel == 'ticker' && @.market == 'NEAR/USD')]",
          },