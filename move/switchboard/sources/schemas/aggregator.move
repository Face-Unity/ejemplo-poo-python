module switchboard::aggregator {
    use aptos_framework::account::{Self, SignerCapability};
    use aptos_framework::timestamp;
    use aptos_framework::block;
    use aptos_std::ed25519;
    use switchboard::serialization;
    use switchboard::math::{Self, SwitchboardDecimal};
    use switchboard::vec_utils;
    use switchboard::errors;
    use std::option::{Self, Option};
    use std::signer; 
    use std::vector;
    use std::coin::{Self, Coin};
    
    // Aggregator Round Data
    struct LatestConfirmedRound {}
    struct CurrentRound {}
    struct AggregatorRound<phantom T> has key, store, copy, drop {
        // Maintains the current update count
        id: u128,
        // Maintains the time that the round was opened at.
        round_open_timestamp: u64,
        // Maintain the blockheight at the time that the round was opened
        round_open_block_height: u64,
        // Maintains the current median of all successful round responses.
        result: SwitchboardDecimal,
        // Standard deviation of the accepted results in the round.
        std_deviation: SwitchboardDecimal,
        // Maintains the minimum node response this round.
        min_response: SwitchboardDecimal,
        // Maintains the maximum node response this round.
        max_response: SwitchboardDecimal,
        // Pubkeys of the oracles fulfilling this round.
        oracle_keys: vector<address>,
        // Represents all successful node responses this round. `NaN` if empty.
        medians: vector<Option<SwitchboardDecimal>>,
        // Payouts so far in a given round
        current_payout: vector<SwitchboardDecimal>,
        // could do specific error codes
        errors_fulfilled: vector<bool>,
        // Maintains the number of successful responses received from nodes.
        // Nodes can submit one successful response per round.
        num_success: u64,
        num_error: u64,
        // Maintains whether or not the round is closed
        is_closed: bool,
        // Maintains the round close timestamp
        round_confirmed_timestamp: u64,
    }

    fun default_round<T>(): AggregatorRound<T> {
        
        AggregatorRound<T> {
            id: 0,
            round_open_timestamp: 0,
            round_open_block_height: block::get_current_block_height(),
            result: math::zero(),
            std_deviation: math::zero(),
            min_response: math::zero(),
            max_response: math::zero(),
            oracle_keys: vector::empty(),
            medians: vector::empty(),
            errors_fulfilled: vector::empty(),
            num_error: 0,
            num_success: 0,
            is_closed: false,
            round_confirmed_timestamp: 0,
            current_payout: vector::empty(),
        }
    }

    struct Aggregator has key, store, drop {
        
        // Aggregator account signer cap
        signer_cap: SignerCapability,

        // Configs
        authority: address,
        name: vector<u8>,
        metadata: vector<u8>,

        // Aggregator data that's fairly fixed
        created_at: u64,
        is_locked: bool,
        _ebuf: vector<u8>,
        features: vector<bool>,
    }

    // Frequently used configs 
    struct AggregatorConfig has key {
        queue_addr: address,
        batch_size: u64,
        min_oracle_results: u64,
        min_update_delay_seconds: u64,
        history_limit: u64,
        variance_threshold: SwitchboardDecimal, 
        force_report_period: u64,
        min_job_results: u64,
        expiration: u64,
        crank_addr: address,
        crank_disabled: bool,
        crank_row_count: u64,
        next_allowed_update_time: u64,
        consecutive_failure_count: u64,
        start_after: u64,
    }

    // Configuation items that are only used on the Oracle side
    struct AggregatorResultsConfig has key {
        variance_threshold: SwitchboardDecimal,
        force_report_period: u64,
        min_job_results: u64,
        expiration: u64,
    }

    struct AggregatorReadConfig has key {
        read_charge: u64,
        reward_escrow: address,
        read_whitelist: vector<address>,
        limit_reads_to_whitelist: bool,
    }

    struct AggregatorJobData has key {
        job_keys: vector<address>,
        job_weights: vector<u8>,
        jobs_checksum: vector<u8>,
    }

    struct AggregatorHistoryData has key {
        history: vector<AggregatorHistoryRow>,
        history_write_idx: u64,
    }

    struct AggregatorHistoryRow has drop, copy, store {
        value: SwitchboardDecimal,
        timestamp: u64,
        round_id: u128,
    }

    struct AggregatorConfigParams has drop, copy {
        addr: address,
        name: vector<u8>,
        metadata: vector<u8>,
        queue_addr: address,
        crank_addr: address,
        batch_size: u64,
        min_oracle_results: u64,
        min_job_results: u64,
        min_update_delay_seconds: u64,
        start_after: u64,
