/**
 * Given an input array of elements, returns a generator that emits the permutations
 * of the input array on demand, i.e. when called.
 * After it reaches the end of iteration it will return null upon sebsequent calls.
 * 
 * @param {Array} elements The input array of elements.
 * @returns A generator function for the next permutation.
 */
function PermutationGen(elements) {
  console.assert(Array.isArray(elements));
  const numElems = elements.length;
  const indices = Array(numElems)
    .fill(0)
    .map((_, i) => i);

  // `iterationEnd` tracks if the generator has reached the end of iteration, and all members are
  // already returned.
  let iterationEnd = false;

  const findPivotIndex = () => {
    for (let i = numElems - 2; i >= 0; --i) {
      if (indices[i] < indices[i + 1]) {
        return i;
      }
    }
    return null;
  };

  const adjustIndices = (pivot) => {
    // find the element from the right that
    // is greater than pivot
    for (let i = numElems - 1; i > pivot; --i) {
      if (indices[i] > indices[pivot]) {
        [indices[i], indices[pivot]] = [indices[pivot], indices[i]];
        break;
      }
    }

    // Reverse the elements from pivot + 1 to the
    // end to get the next permutation in place
    let left = pivot + 1;
    let right = numElems - 1;
    while (left < right) {
      [indices[left], indices[right]] = [indices[right], indices[left]];
      ++left;
      --right;
    }
  };

  return () => {
    if (iterationEnd) return null;
    const permuted = indices.map((index) => elements[index]);
    let pivot;
    if ((pivot = findPivotIndex()) === null) {
      iterationEnd = true;
    } else {
      adjustIndices(pivot);
    }
    return permuted;
  };
}

module.exports = {
  PermutationGen,
};
