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

where **PAYER_KEYPAIR_P