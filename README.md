# tuplegen

A collection of JavaScript utility methods to generate combinatorial tuples, namely:

- [Cartesian Product](https://en.wikipedia.org/wiki/Cartesian_product)
- [Power Set](https://en.wikipedia.org/wiki/Power_set)
- [Permutation](https://en.wikipedia.org/wiki/Permutation)
- [Combination](https://en.wikipedia.org/wiki/Combination)

These methods does not exhaustively precompute the entire collection, (i.e. all tuples of the product set or all permutations), rather they incrementally the compute the next tuple to return. After all possible tuples are turned they return null.

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
