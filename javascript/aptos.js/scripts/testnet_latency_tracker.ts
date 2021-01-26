
/**
 * Creates a new account, inititalizes a Switchboard Resource Account on it
 *
 * Using that it should:
 *
 * DEMO --
 * Creates a new Aggregator
 * Creates a new Job (ftx btc/usd),
 * Adds Job to Aggregator
 * Push Aggregator to Crank
 */
import { AptosClient, HexString } from "aptos";
import { AggregatorAccount, AptosEvent, EventCallback } from "../lib/cjs";

const NODE_URL = "";
const SWITCHBOARD_ADDRESS =
  "0xb91d3fef0eeb4e685dc85e739c7d3e2968784945be4424e92e2f86e2418bf271";

const onAggregatorUpdate = (
  client: AptosClient,
  cb: EventCallback,
  pollIntervalMs: number = 1000
): AptosEvent => {
  return AggregatorAccount.watch(
    client,
    SWITCHBOARD_ADDRESS,
    cb,
    pollIntervalMs
  );
};

const onAggregatorOpenRound = (
  client: AptosClient,
  cb: EventCallback,
  pollIntervalMs: number = 1000
) => {
  const event = new AptosEvent(
    client,
    HexString.ensure(SWITCHBOARD_ADDRESS),
    `${SWITCHBOARD_ADDRESS}::switchboard::State`,
    "aggregator_open_round_events",
    pollIntervalMs
  );
  event.onTrigger(cb);
  return event;
};

// run it all at once
(async () => {
  // INFRA ------
  const client = new AptosClient(NODE_URL);

  let times: number[] = [];

  const rounds = new Map<string, number>();

  const updatePoller = onAggregatorUpdate(client, async (e) => {
    if (rounds.has(e.data.aggregator_address)) {
      times.push(Date.now() - rounds.get(e.data.aggregator_address));
      rounds.delete(e.data.aggregator_address);

      console.log(
        `${e.data.aggregator_address} took ${
          times[times.length - 1]
        }ms - average ${times.reduce((acc, t) => acc + t, 0) / times.length}ms`
      );
    } else {
      rounds.set(e.data.aggregator_address, Date.now());
    }
  });

  // const onOpenRoundPoller = onAggregatorOpenRound(client, async (e) => {
  //   rounds.set(e.data.aggregator_address, Date.now());
  // });

  console.log("listening to events");
})();