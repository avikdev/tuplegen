/**
 * Given an input array of elements and an integer m, returns a generator that emits the
 * combinations of m elements from the array.
 * After it reaches the end of iteration it will return null upon sebsequent calls.
 *
 * @param {Array} elements The input array of elements.
 * @param {number} m The size of the selection.
 * @returns A generator function for the next combination.
 */
function CombinationGen(elements, m) {
  console.assert(Array.isArray(elements));
  console.assert(typeof m === "number");

  const indices = Array(m)
    .fill(0)
    .map((_, i) => i);

  // `iterationEnd` tracks if the generator has reached the end of iteration, and all members are
  // already returned.
  let iterationEnd = m > elements.length;

  // The pivot index is the first (i-1) such that indices[i-1] < (indices[i] - 1)
  const getPivot = () => {
    for (let i = 1; i < indices.length; ++i) {
      if (indices[i - 1] < indices[i] - 1) {
        return i - 1;
      }
    }
    return indices.length - 1;
  };

  return () => {
    if (iterationEnd) return null;
    const selected = indices.map((index) => elements[index]);
    const pivot = getPivot();
    if (pivot < 0 || indices[pivot] + 1 >= elements.length) {
      // Cannot advance any index.
      iterationEnd = true;
    } else {
      ++indices[pivot];
      for (let i = pivot - 1; i >= 0; --i) {
        indices[i] = i;
      }
    }
    return selected;
  };
}

module.exports = {
  CombinationGen,
};
