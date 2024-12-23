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

test('Get next secret number 1', () => {
  let secretNumber = 123;
  let expectedSecretNumbers = [
    15887950, 16495136, 527345, 704524, 1553684, 12683156, 11100544, 12249484,
    7753432, 5908254,
  ];
  expectedSecretNumbers.forEach((expected) => {
    secretNumber = AdventOfCode22.getNextSecretNumber(secretNumber);
    expect(secretNumber).toBe(expected);
  });
});
