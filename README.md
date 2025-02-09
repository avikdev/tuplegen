# tuplegen

A collection of JavaScript utility methods to generate combinatorial tuples, namely:

- [Cartesian Product](https://en.wikipedia.org/wiki/Cartesian_product)
- [Power Set](https://en.wikipedia.org/wiki/Power_set)
- [Permutation](https://en.wikipedia.org/wiki/Permutation)
- [Combination](https://en.wikipedia.org/wiki/Combination)

These methods do not exhaustively precompute the entire collection, (i.e. all tuples of the product set or all permutations), rather they incrementally compute the next tuple to be returned when the function object is invoked. After all possible tuples have been turned the function object returns null.

A typical use case would be:

```
const generator = CombinationGen(['A', 'B', 'C'], 2);
let tuple;
while ((tuple = generator()) !== null) {
  console.log(tuple);
}
```

This will produce the following tuples:

```
[A, B]
[A, C]
[B, C]
```
