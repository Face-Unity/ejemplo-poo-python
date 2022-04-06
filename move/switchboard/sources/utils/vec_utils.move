module switchboard::vec_utils {
    use std::option::{Self, Option};
    use std::vector;

    /// Allocate a new vector of a specific size, setting fields to the default
    /// value.
    public fun new_sized<T: copy + drop>(size: u64, v: T): v