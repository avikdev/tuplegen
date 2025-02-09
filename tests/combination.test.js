import { describe, expect, it } from "vitest";
const { CombinationGen } = require("../lib/combination");

describe("edge case - empty input", () => {
  it("empty input, pick 0", () => {
    const gen = CombinationGen([], 0);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual(null);
  });

  it("empty input, pick 1", () => {
    const gen = CombinationGen([], 1);
    expect(gen()).toStrictEqual(null);
  });

  it("empty input, pick 2", () => {
    const gen = CombinationGen([], 1);
    expect(gen()).toStrictEqual(null);
  });

  it("empty input, pick 3", () => {
    const gen = CombinationGen([], 1);
    expect(gen()).toStrictEqual(null);
  });
});

describe("edge cases - singleton input", () => {
  it("singleton input, pick 0", () => {
    const gen = CombinationGen(["a"], 0);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual(null);
  });

  it("singleton input, pick 1", () => {
    const gen = CombinationGen(["a"], 1);
    expect(gen()).toStrictEqual(["a"]);
    expect(gen()).toStrictEqual(null);
  });

  it("singleton input, pick 2", () => {
    const gen = CombinationGen(["a"], 2);
    expect(gen()).toStrictEqual(null);
  });

  it("singleton input, pick 3", () => {
    const gen = CombinationGen(["a"], 3);
    expect(gen()).toStrictEqual(null);
  });
});

describe("set of two", () => {
  it("pick 0", () => {
    const gen = CombinationGen(["P", "Q"], 0);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual(null);
  });

  it("pick 1", () => {
    const gen = CombinationGen(["P", "Q"], 1);
    expect(gen()).toStrictEqual(["P"]);
    expect(gen()).toStrictEqual(["Q"]);
    expect(gen()).toStrictEqual(null);
  });

  it("pick 2", () => {
    const gen = CombinationGen(["P", "Q"], 2);
    expect(gen()).toStrictEqual(["P", "Q"]);
    expect(gen()).toStrictEqual(null);
  });

  it("pick 3", () => {
    const gen = CombinationGen(["P", "Q"], 3);
    expect(gen()).toStrictEqual(null);
  });
});

describe("small arrays", () => {
  it("6 choose 2", () => {
    const gen = CombinationGen(["A", "B", "C", "a", "b", "c"], 2);
    const actuals = generateAllAndCollectAsStrings(gen);
    // prettier-ignore
    expect(actuals).toStrictEqual([
      'AB', 'AC', 'BC', 'Aa', 'Ba', 'Ca', 'Ab', 'Bb',
      'Cb', 'ab', 'Ac', 'Bc', 'Cc', 'ac', 'bc',
    ]);
  });

  it("5 choose 3", () => {
    const gen = CombinationGen(["a", "b", "c", "d", "e"], 3);
    expect(gen()).toStrictEqual(["a", "b", "c"]);
    expect(gen()).toStrictEqual(["a", "b", "d"]);
    expect(gen()).toStrictEqual(["a", "c", "d"]);
    expect(gen()).toStrictEqual(["b", "c", "d"]);
    expect(gen()).toStrictEqual(["a", "b", "e"]);
    expect(gen()).toStrictEqual(["a", "c", "e"]);
    expect(gen()).toStrictEqual(["b", "c", "e"]);
    expect(gen()).toStrictEqual(["a", "d", "e"]);
    expect(gen()).toStrictEqual(["b", "d", "e"]);
    expect(gen()).toStrictEqual(["c", "d", "e"]);
    expect(gen()).toStrictEqual(null);
  });
});

describe("with UTF strings", () => {
  const greekChars = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ"];
  it("greeks words len-3", () => {
    const gen = CombinationGen(greekChars, 3);
    const actuals = generateAllAndCollectAsStrings(gen);
    // prettier-ignore
    expect(actuals).toStrictEqual([
      'αβγ', 'αβδ', 'αγδ', 'βγδ', 'αβε', 'αγε', 'βγε', 'αδε', 'βδε', 'γδε', 'αβζ', 'αγζ',
      'βγζ', 'αδζ', 'βδζ', 'γδζ', 'αεζ', 'βεζ', 'γεζ', 'δεζ', 'αβη', 'αγη', 'βγη', 'αδη',
      'βδη', 'γδη', 'αεη', 'βεη', 'γεη', 'δεη', 'αζη', 'βζη', 'γζη', 'δζη', 'εζη', 'αβθ',
      'αγθ', 'βγθ', 'αδθ', 'βδθ', 'γδθ', 'αεθ', 'βεθ', 'γεθ', 'δεθ', 'αζθ', 'βζθ', 'γζθ',
      'δζθ', 'εζθ', 'αηθ', 'βηθ', 'γηθ', 'δηθ', 'εηθ', 'ζηθ',
    ]);
  });

  it("greeks words len-6", () => {
    const gen = CombinationGen(greekChars, 6);
    const actuals = generateAllAndCollectAsStrings(gen);
    // prettier-ignore
    expect(actuals).toStrictEqual([
      'αβγδεζ', 'αβγδεη', 'αβγδζη', 'αβγεζη', 'αβδεζη', 'αγδεζη',
      'βγδεζη', 'αβγδεθ', 'αβγδζθ', 'αβγεζθ', 'αβδεζθ', 'αγδεζθ',
      'βγδεζθ', 'αβγδηθ', 'αβγεηθ', 'αβδεηθ', 'αγδεηθ', 'βγδεηθ',
      'αβγζηθ', 'αβδζηθ', 'αγδζηθ', 'βγδζηθ', 'αβεζηθ', 'αγεζηθ',
      'βγεζηθ', 'αδεζηθ', 'βδεζηθ', 'γδεζηθ',
    ]);
  });
});

function generateAllAndCollectAsStrings(gen) {
  const results = [];
  let tuple;
  while ((tuple = gen()) !== null) {
    results.push(tuple.join(""));
  }
  return results;
}
