module switchboard::vec_utils {
    use std::option::{Self, Option};
    use std::vector;

    /// Allocate a new vector of a specific size, setting fields to the default
    /// value.
    public fun new_sized<T: copy + drop>(size: u64, v: T): vector<T> {
      let alloc = vector::empty();
      while (vector::length(&alloc) < size) {
        vector::push_back(&mut alloc, copy v);
      };
      alloc
    }


    /// Split vector at a specific index
    public fun split<T: copy + drop>(v: &vector<T>, idx: u64): (vector<T>, vector<T>) {
      let left = vector::empty();
      let right = vector::empty();
      let i = 0;
      while (i < vector::length(v)) {
        if (i < idx) {
          vector::push_back(&mut left, *vector::borrow(v, i));
        } else {