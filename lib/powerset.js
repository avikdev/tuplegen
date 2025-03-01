const { CartesianGen } = require("./cartesian");

/**
 * Given an array of elements, returns a generator that emits the elements of the power set.
 * After it reaches the end of iteration it will return null upon sebsequent calls.
 *
 * Example usage:
 *
 * const gen = PowerSetGen([1, 2]);
 * console.log(gen()) => []
 * console.log(gen()) => [1]
 * console.log(gen()) => [2]
 * console.log(gen()) => [1, 2]
 * console.log(gen()) => null
 * console.log(gen()) => null
 *
 * @param {Array} elements the input set.
 * @returns generator function for the power set.
 */
function PowerSetGen(elements) {
  console.assert(Array.isArray(elements));
  // Reverse the input array as we normally expect to see the combinations left to right.
  const reversed = elements.toReversed();
  const productGen = CartesianGen(Array(reversed.length).fill([false, true]));
  return () => {
    const members = productGen();
    if (members === null) return members;
    const indices = [];
    members.forEach((b, i) => {
      b && indices.unshift(i);
    });
    return indices.map((i) => reversed[i]);
  };
}

module.exports = {
  PowerSetGen,
};
