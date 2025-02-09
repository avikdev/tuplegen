import { describe, expect, it } from "vitest";
const { PermutationGen } = require("../lib/permutation");

describe("edge cases", () => {
  it("empty input", () => {
    const gen = PermutationGen([]);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual(null);
  });

  it("singleton", () => {
    const gen = PermutationGen(["a"]);
    expect(gen()).toStrictEqual(["a"]);
    expect(gen()).toStrictEqual(null);
  });

  it("mixed type", () => {
    const gen = PermutationGen(["a", true]);
    expect(gen()).toStrictEqual(["a", true]);
    expect(gen()).toStrictEqual([true, "a"]);
    expect(gen()).toStrictEqual(null);
  });
});

describe("three elements", () => {
  it("empty input", () => {
    const gen = PermutationGen([0, 1, 2]);
    expect(gen()).toStrictEqual([0, 1, 2]);
    expect(gen()).toStrictEqual([0, 2, 1]);
    expect(gen()).toStrictEqual([1, 0, 2]);
    expect(gen()).toStrictEqual([1, 2, 0]);
    expect(gen()).toStrictEqual([2, 0, 1]);
    expect(gen()).toStrictEqual([2, 1, 0]);
    expect(gen()).toStrictEqual(null);
  });
});
