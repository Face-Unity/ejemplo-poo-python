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
        variance_threshold: SwitchboardDecimal,
        force_report_period: u64,
        expiration: u64,
        disable_crank: bool,
        history_limit: u64,
        read_charge: u64,
        reward_escrow: address,
        read_whitelist: vector<address>,
        limit_reads_to_whitelist: bool,
        authority: address,
    }

    struct FeedRelay has key {
        oracle_keys: vector<vector<u8>>, 
        authority: address,
    }

    public fun addr_from_conf(conf: &AggregatorConfigParams): address {
        conf.addr
    }

    public fun queue_from_conf(conf: &AggregatorConfigParams): address {
        conf.queue_addr
    }

    public fun authority_from_conf(conf: &AggregatorConfigParams): address {
        conf.authority
    }

    public fun history_limit_from_conf(conf: &AggregatorConfigParams): u64 {
        conf.history_limit
    }
    
    public fun batch_size_from_conf(conf: &AggregatorConfigParams): u64 {
        conf.batch_size
    }

    public fun min_oracle_results_from_conf(conf: &AggregatorConfigParams): u64 {
        conf.min_oracle_results
    }

    public fun min_update_delay_seconds_from_conf(conf: &AggregatorConfigParams): u64 {
        conf.min_update_delay_seconds
    }

    public fun exist(addr: address): bool {
        exists<Aggregator>(addr)
    }

    public fun has_authority(addr: address, account: &signer): bool acquires Aggregator {
        let ref = borrow_global<Aggregator>(addr);
        ref.authority == signer::address_of(account)
    }

    public fun buy_latest_value<CoinType>(
        account: &signer, 
        addr: address, 
        fee: Coin<CoinType>
    ): SwitchboardDecimal acquires AggregatorConfig, AggregatorReadConfig, AggregatorRound {
        let _aggregator_config = borrow_global<AggregatorConfig>(addr);
        let aggregator_read_config = borrow_global<AggregatorReadConfig>(addr);
        if (aggregator_read_config.limit_reads_to_whitelist) {
            assert!(vector::contains(&aggregator_read_config.read_whitelist, &signer::address_of(account)), errors::PermissionDenied());
        } else {
            assert!(
                coin::value(&fee) == aggregator_read_config.read_charge ||
                vector::contains(&aggregator_read_config.read_whitelist, &signer::address_of(account)), 
                errors::InvalidArgument()
            );
        };
        coin::deposit(aggregator_read_config.reward_escrow, fee);
        borrow_global<AggregatorRound<LatestConfirmedRound>>(addr).result
    }

    public fun buy_latest_round<CoinType>(account: &signer, addr: address, fee: Coin<CoinType>): (
        SwitchboardDecimal, /* Result */
        u64,                /* Round Confirmed Timestamp */
        SwitchboardDecimal, /* Standard Deviation of Oracle Responses */
        SwitchboardDecimal, /* Min Oracle Response */
        SwitchboardDecimal, /* Max Oracle Response */
    ) acquires AggregatorConfig, AggregatorReadConfig, AggregatorRound {
        let _aggregator_config = borrow_global_mut<AggregatorConfig>(addr);
        let aggregator_read_config = borrow_global_mut<AggregatorReadConfig>(addr);
        if (aggregator_read_config.limit_reads_to_whitelist) {
            assert!(vector::contains(&aggregator_read_config.read_whitelist, &signer::address_of(account)), errors::PermissionDenied());
        } else {
            assert!(
                coin::value(&fee) == aggregator_read_config.read_charge ||
                vector::contains(&aggregator_read_config.read_whitelist, &signer::address_of(account)), 
                errors::InvalidArgument()
            );
        };
        coin::deposit(aggregator_read_config.reward_escrow, fee);
        let latest_confirmed_round = borrow_global<AggregatorRound<LatestConfirmedRound>>(addr);
        (
            latest_confirmed_round.result,
            latest_confirmed_round.round_confirmed_timestamp,
            latest_confirmed_round.std_deviation,
            latest_confirmed_round.min_response,
            latest_confirmed_round.max_response,
        )
    }

    public fun latest_value(addr: address): SwitchboardDecimal acquires AggregatorRound, AggregatorReadConfig {
        let aggregator_read_config = borrow_global_mut<AggregatorReadConfig>(addr);
        assert!(aggregator_read_config.read_charge == 0 && !aggregator_read_config.limit_reads_to_whitelist, errors::PermissionDenied());
        borrow_global<AggregatorRound<LatestConfirmedRound>>(addr).result
    }


    public fun latest_value_in_threshold(addr: address, max_confidence_interval: &SwitchboardDecimal): (SwitchboardDecimal, bool) acquires AggregatorRound, AggregatorReadConfig {
        let aggregator_read_config = borrow_global_mut<AggregatorReadConfig>(addr);
        assert!(aggregator_read_config.read_charge == 0 && !aggregator_read_config.limit_reads_to_whitelist, errors::PermissionDenied());
        let latest_confirmed_round = borrow_global<AggregatorRound<LatestConfirmedRound>>(addr);
        let uwm = vec_utils::unwrap(&latest_confirmed_round.medians);
        let std_deviation = math::std_deviation(&uwm, &latest_confirmed_round.result);
        let is_within_bound = math::