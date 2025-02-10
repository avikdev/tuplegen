# tuplegen

A collection of JavaScript utility methods to generate combinatorial tuples, namely:

- [Cartesian Product](https://en.wikipedia.org/wiki/Cartesian_product)
- [Power Set](https://en.wikipedia.org/wiki/Power_set)
- [Permutation](https://en.wikipedia.org/wiki/Permutation)
- [Combination](https://en.wikipedia.org/wiki/Combination)

These methods do not exhaustively precompute the entire collection, (i.e. all tuples of the product set or all permutations), rather they incrementally compute the next tuple to be returned when the function object is invoked. After all possible tuples have been turned the function object returns null.

An example use case for generating combinations of 2 from an array of 3:

```
const generator = CombinationGen(['A', 'B', 'C'], 2);
let tuple;
while ((tuple = generator()) !== null) {
  console.log(tuple);
}
```

This will produce the 2-tuples (a.k.a. pairs) selected from the input srray:

```
[A, B]
[A, C]
[B, C]
```

The other API methods have a similar syntax. Please refer to individual source files for the function signatures, and the test files for more examples.