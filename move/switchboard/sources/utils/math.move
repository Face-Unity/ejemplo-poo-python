module switchboard::math {
    use switchboard::vec_utils;
    use std::vector;
    use std::error;

    const EINCORRECT_STD_DEV: u64 = 0;
    const ENO_LENGTH_PASSED_IN_STD_DEV: u64 = 1;
    const EMORE_THAN_9_DECIMALS: u64 = 2;
    const EINPUT_TOO_LARGE: u64 = 3;

    const MAX_DECIMALS: u8 = 9;
    const POW_10_TO_MAX_DECIMALS: u128 = 1000000000;
    const U128_MAX: u128 = 340282366920938463463374607431768211455;
    const MAX_VALUE_ALLOWED: u128 = 340282366920938463463374607431;

    struct SwitchboardDecimal has copy, drop, store { value: u128, dec: u8, neg: bool }

    public fun max_u128(): u128 {
        U128_MAX
    }

    public fun new(value: u128, dec: u8, neg: bool): SwitchboardDecimal {
        assert!(
            dec <= MAX_DECIMALS,
            EMORE_THAN_9_DECIMALS
        );
        let num = SwitchboardDecimal { value, dec, neg };

        // expand nums out 
        num.value = scale_to_decimals(&num, MAX_DECIMALS);
        num.dec = MAX_DECIMALS;

        num
    }

    public fun pow(base: u64, exp: u8): u128 {
        let result_val = 1u128;
        let i = 0;
        while (i < exp) {
            result_val = result_val * (base as u128);
            i = i + 1;
        };
        result_val
    }

    public fun unpack(num: SwitchboardDecimal): (u128, u8, bool) {
        let SwitchboardDecimal { value, dec, neg } = num;
        (value, dec, neg)
    }

    fun max(a: u8, b: u8): u8 {
        if (a > b) a else b
    }

    fun min(a: u8, b: u8): u8 {
        if (a > b) b else a
    }

    // abs(a - b)
    fun sub_abs_u8(a: u8, b: u8): u8 {
        if (a > b) {
            a - b
        } else {
            b - a
        }
    }

    public fun zero(): SwitchboardDecimal {
      SwitchboardDecimal {
        value: 0,
        dec: 0,
        neg: false
      }
    }

    public fun median(v: &mut vector<SwitchboardDecimal>): SwitchboardDecimal {
        let size = vector::length(v);
        if (size % 2 == 0) {
            let result = zero();
            let lower_idx = little_floyd_rivest(v, size / 2, 0, size - 1);
            let upper_idx = little_floyd_rivest(v, (size / 2) - 1, 0, size - 1);
            let sum = add(&lower_idx, &upper_idx);
            div(&sum, &new(2, 0, false), &mut result);
            result
        } else {
            little_floyd_rivest(v, size / 2, 0, size - 1)
        }
        
    }

    public fun std_deviation(medians: &vector<SwitchboardDecimal>, median: &SwitchboardDecimal): SwitchboardDecimal {

        // length of decimals
        let length = vector::length<SwitchboardDecimal>(medians);

        // check that there are medians passed in
        assert!(length != 0, error::internal(ENO_LENGTH_PASSED_IN_STD_DEV));

        // zero out response
        let res = zero();
        let distance = zero();
        let variance = zero();

        let i = 0;
        while (i < length) {

            // get median i
            let median_i = vector::borrow<SwitchboardDecimal>(medians, i);

            // subtract the median from the result
            distance = sub(median_i, median);

            // handle overflows
            let skip = will_multiplication_overflow(distance.value, distance.value);
            if (skip) {
                i = i + 1;
                continue
            };

            // square res (copies on each operation)
            mul(
                &distance, 
                &distance,
                &mut variance
            );

            // add distance to res, write it to distance
            distance = add(&res, &variance);

            res.value = distance.value;
            res.dec = distance.dec;
            res.neg = distance.neg;

            // iterate
            i = i + 1;
        };

        // divide by length
        div(&res, &new((length as u128), 0, false), &mut distance);

        // get sqrt
        sqrt(&distance, &mut res);

        res
    }

    public fun will_multiplication_overflow(a: u128, b: u128): bool {
       b > 0 && a > MAX_VALUE_ALLOWED / b
    }

    public fun sort(v: &vector<SwitchboardDecimal>): vector<SwitchboardDecimal> {
        let size = vector::length(v);
        let alloc = vector::empty();
        if (size <= 1) {
            return *v
        };

        let (left, right) = vec_utils::esplit(v);
        let left = sort(&left);
        let right = sort(&right);
   

        loop {
            let left_len = vector::length<SwitchboardDecimal>(&left);
            let right_len = vector::length<SwitchboardDecimal>(&right);
            if (left_len != 0 && right_len != 0) {
                if (gt(vector::borrow<SwitchboardDecimal>(&right, 0), vector::borrow<SwitchboardDecimal>(&left, 0))) {
                   vector::push_back<SwitchboardDecimal>(&mut alloc, vector::remove<SwitchboardDecimal>(&mut left, 0));
                } else {
                    vector::push_back<SwitchboardDecimal>(&mut alloc, vector::remove<SwitchboardDecimal>(&mut right, 0));
                }
            } else if (left_len != 0) {
                vector::push_back<SwitchboardDecimal>(&mut alloc, vector::remove<SwitchboardDecimal>(&mut left, 0));
            } else if (right_len != 0) {
                vector::push_back<SwitchboardDecimal>(&mut alloc, vector::remove<SwitchboardDecimal>(&mut right, 0));
            } else {
                return alloc
            };
        }
    }

    public fun insertion_sort(v: &mut vector<SwitchboardDec