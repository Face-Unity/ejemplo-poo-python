# Switchboard-V2 Feed Walkthrough

This example will walk you through

- creating a personal oracle queue with a crank
- add a SOL/USD data feed onto the crank
- spin up a docker environment to run your own oracle
- fulfill your update request on-chain

## Usage

```bash
ts-node src/main [PAYER_KEYPAIR_PATH]
```

where **PAYER_KEYPAIR_PATH** is the location of your Solana keypair, defaulting
to `~/.config/solana/id.json` if not provided

When prompted, run the docker compose script in a new shell to start your local
oracle then confirm the prompt to turn the crank and request an update on-chain.
The oracle is ready to fulfill updates when it sees the following logs:

```b