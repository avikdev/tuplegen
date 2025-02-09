import { describe, expect, it } from "vitest";
const { CartesianGen } = require("../lib/cartesian");

describe("edge cases", () => {
  it("empty input", () => {
    const gen = CartesianGen([]);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual(null);
  });

  it("sole empty set", () => {
    const gen = CartesianGen([[]]);
    expect(gen()).toStrictEqual(null);
  });

  it("one empty set", () => {
    const gen = CartesianGen([["p", "q", "r"], []]);
    expect(gen()).toStrictEqual(null);
  });

  it("only empty sets", () => {
    const gen = CartesianGen([[], [], []]);
    expect(gen()).toStrictEqual(null);
  });

  it("multiple empty sets", () => {
    const gen = CartesianGen([[], ["a", "b"], []]);
    expect(gen()).toStrictEqual(null);
  });

  it("sole singleton set", () => {
    const gen = CartesianGen([[3]]);
    expect(gen()).toStrictEqual([3]);
    expect(gen()).toStrictEqual(null);
  });

  it("multiple singleton sets", () => {
    const gen = CartesianGen([[1], [2], [3]]);
    expect(gen()).toStrictEqual([1, 2, 3]);
    expect(gen()).toStrictEqual(null);
  });
});

describe("sets of numbers", () => {
  it("one varying set", () => {
    const gen = CartesianGen([[1, 2, 3, 4]]);
    expect(gen()).toStrictEqual([1]);
    expect(gen()).toStrictEqual([2]);
    expect(gen()).toStrictEqual([3]);
    expect(gen()).toStrictEqual([4]);
    expect(gen()).toStrictEqual(null);
  });

  it("two varying sets", () => {
    const gen = CartesianGen([[1, 2], [4], [6, 7]]);
    expect(gen()).toStrictEqual([1, 4, 6]);
    expect(gen()).toStrictEqual([1, 4, 7]);
    expect(gen()).toStrictEqual([2, 4, 6]);
    expect(gen()).toStrictEqual([2, 4, 7]);
    expect(gen()).toStrictEqual(null);
  });

  it("three varying sets", () => {
    const gen = CartesianGen([
      [1, 2],
      [4, 5],
      [7, 8],
    ]);
    expect(gen()).toStrictEqual([1, 4, 7]);
    expect(gen()).toStrictEqual([1, 4, 8]);
    expect(gen()).toStrictEqual([1, 5, 7]);
    expect(gen()).toStrictEqual([1, 5, 8]);
    expect(gen()).toStrictEqual([2, 4, 7]);
    expect(gen()).toStrictEqual([2, 4, 8]);
    expect(gen()).toStrictEqual([2, 5, 7]);
    expect(gen()).toStrictEqual([2, 5, 8]);
    expect(gen()).toStrictEqual(null);
  });
});

describe("simulate binary numbers", () => {
  it("two booleans", () => {
    const bools = [false, true];
    const gen = CartesianGen([bools, bools]);
    expect(gen()).toStrictEqual([false, false]);
    expect(gen()).toStrictEqual([false, true]);
    expect(gen()).toStrictEqual([true, false]);
    expect(gen()).toStrictEqual([true, true]);
    expect(gen()).toStrictEqual(null);
  });

  it("three booleans", () => {
    const bools = [false, true];
    const gen = CartesianGen([bools, bools, bools]);
    expect(gen()).toStrictEqual([false, false, false]);
    expect(gen()).toStrictEqual([false, false, true]);
    expect(gen()).toStrictEqual([false, true, false]);
    expect(gen()).toStrictEqual([false, true, true]);
    expect(gen()).toStrictEqual([true, false, false]);
    expect(gen()).toStrictEqual([true, false, true]);
    expect(gen()).toStrictEqual([true, true, false]);
    expect(gen()).toStrictEqual([true, true, true]);
    expect(gen()).toStrictEqual(null);
  });
});

describe("simulate decimal numbers", () => {
  // Suppose D is the set of decimal digits. Then (D x D x D) will generate the set of all 3-digit
  // decimal numbers in the increasing order.
  const decimalDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // The output sequence having 1000 members is too large to test exhaustively. So we use the following
  // utility which takes a generator and filters for only the members at the selected indices.
  // And further returns the member tuples as strings (concated tuple elements) for compact representation.
  const filterAndToString = (gen, allowndices) => {
    let tuple,
      index = 0;
    const included = [];
    const lookupSet = new Set(allowndices);
    while ((tuple = gen()) !== null) {
      if (lookupSet.has(index)) {
        included.push(tuple.join(""));
      }
      ++index;
    }
    return included;
  };

  it("two digit decimals", () => {
    const gen = CartesianGen([decimalDigits, decimalDigits]);
    // Use out-of-range indices to ensure those are not generated, also provide the indices out of
    // order to ensure they are still generated in order.
    const selected = filterAndToString(gen, [-2, -1, 0, 3, 83, 43, 99, 100, 101]);
    expect(selected).toStrictEqual(["00", "03", "43", "83", "99"]);
  });

  it("three digit decimals", () => {
    const gen = CartesianGen([decimalDigits, decimalDigits, decimalDigits]);
    const selected = filterAndToString(gen, [-2, -1, 0, 800, 1, 86, 12, 324, 999, 1000]);
    expect(selected).toStrictEqual(["000", "001", "012", "086", "324", "800", "999"]);
  });
});
