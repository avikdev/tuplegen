/**
 * Given an array of sets, returns a generator that emits the members of the cartesian set
 * (a.k.a. the product set) of those input sets.
 * Each set is represented as a JS array of sorted and unique elements, they can have different
 * size, and data types.
 * The method returns a generator function (stateful) which can be called repeatedly to
 * produce the next tuple from the product set. After it reaches the end of iteration
 * it will return null upon sebsequent calls.
 *
 * Example usage:
 *
 * const sets = [['A', 'B'], [5, 6], [false, true]];
 * const gen = CartesianGen(sets);
 * console.log(gen()) => ['A', 5, false]
 * console.log(gen()) => ['A', 5, true]
 * console.log(gen()) => ['A', 6, false]
 * console.log(gen()) => ['A', 6, true]
 * console.log(gen()) => ['B', 5, false]
 * console.log(gen()) => ['B', 5, true]
 * console.log(gen()) => ['B', 6, false]
 * console.log(gen()) => ['B', 6, true]
 * console.log(gen()) => null
 * console.log(gen()) => null
 *
 * It is expected that the elements of the individual sets will be sorted then it will
 * emit the tuples in lexicographically increasing order.
 *
 * @param {Array} sets An array of sets.
 * @returns generator function for the product set.
 */
function CartesianGen(sets) {
  console.assert(Array.isArray(sets));
  const numSets = sets.length;
  for (let i = 0; i < numSets; ++i) {
    console.assert(Array.isArray(sets[i]));
    if (sets[i].length === 0) {
      return () => null;
    }
  }
  const indices = Array(numSets).fill(0);
  const nextfn = () => {
    for (let i = numSets - 1; i >= 0; --i) {
      if (++indices[i] >= sets[i].length) {
        indices[i] = 0;
      } else {
        return true;
      }
    }
    return false;
  };

  // `iterationEnd` tracks if the generator has reached the end of iteration, and all members are
  // already returned.
  let iterationEnd = false;

  return () => {
    if (iterationEnd) return null;
    const values = indices.map((index, i) => sets[i][index]);
    if (!nextfn()) {
      iterationEnd = true;
    }
    return values;
  };
}

module.exports = {
  CartesianGen,
};
