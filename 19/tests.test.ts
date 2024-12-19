const { AdventOfCode19a } = require('./a');

const towels = ['r', 'wr', 'b', 'g', 'bwu', 'rb', 'gb', 'br'];
const testCases = [
  { pattern: 'brwrr', expected19a: true, expected19b: 2 },
  { pattern: 'bggr', expected19a: true, expected19b: 1 },
  { pattern: 'gbbr', expected19a: true, expected19b: 4 },
  { pattern: 'rrbgbr', expected19a: true, expected19b: 6 },
  { pattern: 'ubwu', expected19a: false, expected19b: 0 },
  { pattern: 'bwurrg', expected19a: true, expected19b: 1 },
  { pattern: 'brgr', expected19a: true, expected19b: 2 },
  { pattern: 'bbrgwb', expected19a: false, expected19b: 0 },
];

for (let i = 1; i <= testCases.length; i++) {
  test(`19a test ${i}`, () => {
    expect(AdventOfCode19a.isPossible(testCases[i - 1].pattern, towels)).toBe(
      testCases[i - 1].expected19a
    );
  });
}

for (let i = 1; i <= testCases.length; i++) {
  test(`19b test ${i}`, () => {
    expect(
      AdventOfCode19a.getNbrOfCombinations(testCases[i - 1].pattern, towels)
    ).toBe(testCases[i - 1].expected19b);
  });
}

for (let i = 1; i <= testCases.length; i++) {
  test(`19b test should be 1 more than expected if adding one matching towel ${i}`, () => {
    expect(
      AdventOfCode19a.getNbrOfCombinations(testCases[i - 1].pattern, [
        ...towels,
        testCases[i - 1].pattern,
      ])
    ).toBe(testCases[i - 1].expected19b + 1);
  });
}
