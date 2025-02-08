import { describe, expect, it } from "vitest";
const { PowerSetGen } = require("../lib/powerset");

describe("edge cases", () => {
  it("empty array", () => {
    const gen = PowerSetGen([]);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual(null);
  });

  it("singleton array - number", () => {
    const gen = PowerSetGen([123]);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual([123]);
    expect(gen()).toStrictEqual(null);
  });

  it("singleton array - bool", () => {
    const gen = PowerSetGen([false]);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual([false]);
    expect(gen()).toStrictEqual(null);
  });

  it("singleton array - str", () => {
    const gen = PowerSetGen(["foo"]);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual(["foo"]);
    expect(gen()).toStrictEqual(null);
  });

  it("mixed datatype array", () => {
    const gen = PowerSetGen(["hi", 2.5]);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual(["hi"]);
    expect(gen()).toStrictEqual([2.5]);
    expect(gen()).toStrictEqual(["hi", 2.5]);
    expect(gen()).toStrictEqual(null);
  });
});

describe("verify ordering", () => {
  it("three elements", () => {
    const gen = PowerSetGen([1, 2, 3]);
    expect(gen()).toStrictEqual([]);
    expect(gen()).toStrictEqual([1]);
    expect(gen()).toStrictEqual([2]);
    expect(gen()).toStrictEqual([1, 2]);
    expect(gen()).toStrictEqual([3]);
    expect(gen()).toStrictEqual([1, 3]);
    expect(gen()).toStrictEqual([2, 3]);
    expect(gen()).toStrictEqual([1, 2, 3]);
    expect(gen()).toStrictEqual(null);
  });

  it("four elements", () => {
    const gen = PowerSetGen([1, 2, 3, 4]);
    let tuple;
    const actuals = [];
    while ((tuple = gen()) !== null) {
      actuals.push(tuple.join(""));
    }
    // prettier-ignore
    expect(actuals).toStrictEqual([
      "", "1", "2", "12", "3", "13", "23", "123", "4",
      "14", "24", "124", "34", "134", "234", "1234",
    ]);
  });

  it("six elements", () => {
    const gen = PowerSetGen([1, 2, 3, 4, 5, 6]);
    let tuple;
    const actuals = [];
    while ((tuple = gen()) !== null) {
      actuals.push(tuple.join(""));
    }
    // prettier-ignore
    expect(actuals).toStrictEqual([
      "", "1", "2", "12", "3", "13", "23", "123", "4", "14", "24", "124", "34", "134", "234",
      "1234", "5", "15", "25", "125", "35", "135", "235", "1235", "45", "145", "245", "1245",
      "345", "1345", "2345", "12345", "6", "16", "26", "126", "36", "136", "236", "1236", "46",
      "146", "246", "1246", "346", "1346", "2346", "12346", "56", "156", "256", "1256", "356",
      "1356", "2356", "12356", "456", "1456", "2456", "12456", "3456", "13456", "23456", "123456",
    ]);
  });
});
