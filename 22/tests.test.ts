const { AdventOfCode22 } = require('./a');

test('Mix value 1', () => {
  const bin1 = AdventOfCode22.nbrToBinary(42);
  const bin2 = AdventOfCode22.nbrToBinary(15);
  const res = AdventOfCode22.getBitwiseXOR(bin1, bin2);
  expect(AdventOfCode22.binaryToNbr(res)).toBe(37);
});

test('Prune value 1', () => {
  const bin1 = AdventOfCode22.nbrToBinary(100000000);
  const res = AdventOfCode22.getMod24(bin1);
  expect(AdventOfCode22.binaryToNbr(res)).toBe(16113920);
});
