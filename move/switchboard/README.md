
<div align="center">
  <a href="#">
    <img height="170" src="https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.svg" />
  </a>

  <h1>switchboard-move</h1>

  <p>A Move module to interact with Switchboard V2 on Aptos.</p>

  <p>
    <a href="https://discord.gg/switchboardxyz">
      <img alt="Discord" src="https://img.shields.io/discord/841525135311634443?color=blueviolet&logo=discord&logoColor=white">
    </a>
    <a href="https://twitter.com/switchboardxyz">
      <img alt="Twitter" src="https://img.shields.io/twitter/follow/switchboardxyz?label=Follow+Switchboard" />
    </a>
  </p>

  <h4>
    <strong>Sbv2 Aptos SDK: </strong><a href="https://github.com/switchboard-xyz/sbv2-aptos">github.com/switchboard-xyz/sbv2-aptos</a>
  </h4>
</div>

## Build

```bash
aptos move compile --named-addresses switchboard=default
```

## Install

Add the following to your `Move.toml`.

```toml
[addresses]
switchboard = "0x34e2eead0aefbc3d0af13c0522be94b002658f4bef8e0740a21086d22236ad77"

[dependencies]
MoveStdlib = { git = "https://github.com/aptos-labs/aptos-core.git", subdir = "aptos-move/framework/move-stdlib/", rev = "devnet" }
AptosFramework = { git = "https://github.com/aptos-labs/aptos-core.git", subdir = "aptos-move/framework/aptos-framework/", rev = "devnet" }
AptosStdlib = { git = "https://github.com/aptos-labs/aptos-core.git", subdir = "aptos-move/framework/aptos-stdlib/", rev = "devnet" }
Switchboard = { git = "https://github.com/switchboard-xyz/sbv2-aptos.git", subdir = "move/switchboard/", rev = "main" }
```

## Usage

### Reading Feeds

```move
use switchboard::aggregator;
use switchboard::math;

// store latest value
struct AggregatorInfo has copy, drop, store, key {
    aggregator_addr: address,
    latest_result: u128,
    latest_result_scaling_factor: u8,
    latest_result_neg: bool,
}

// get latest value
public fun save_latest_value(aggregator_addr: address) {
    // get latest value
    let latest_value = aggregator::latest_value(aggregator_addr);
    let (value, scaling_factor, neg) = math::unpack(latest_value);
    move_to(account, AggregatorInfo {
        aggregator_addr: aggregator_addr,
        latest_result: value,
        latest_result_scaling_factor: scaling_factor,
        latest_result_neg: neg,
    });
}

// some testing that uses aggregator test utility functions
#[test(account = @0x1)]
public entry fun test_aggregator(account: &signer) {

    // creates test aggregator with data
    aggregator::new_test(account, 100, 0, false);

    // print out value
    std::debug::print(&aggregator::latest_value(signer::address_of(account)));
}
```