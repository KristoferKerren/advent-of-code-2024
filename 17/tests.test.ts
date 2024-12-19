const { AdventOfCode17 } = require('./a');

test('Intcode runProgram 1', () => {
  const program = new AdventOfCode17.Program(0, 0, 9, [2, 6]);
  console.log({ program });
  const expectedFinalProgram = new AdventOfCode17.Program(0, 1, 9);
  AdventOfCode17.runProgram(program);
  expect(program.isEqual(expectedFinalProgram)).toBe(true);
});

test('Intcode runProgram 2', () => {
  const program = new AdventOfCode17.Program(10, 0, 0, [5, 0, 5, 1, 5, 4]);
  const output = AdventOfCode17.runProgram(program);
  expect(output.join(',')).toBe('0,1,2');
});

test('Intcode runProgram 3', () => {
  const program = new AdventOfCode17.Program(2024, 0, 9, [0, 1, 5, 4, 3, 0]);
  const output = AdventOfCode17.runProgram(program);
  expect(output.join(',')).toBe('4,2,5,6,7,7,7,7,3,1,0');
  expect(program.registerA).toBe(0);
});

test('Intcode runProgram 4', () => {
  const program = new AdventOfCode17.Program(0, 29, 0, [1, 7]);
  const expectedFinalProgram = new AdventOfCode17.Program(0, 26, 0);
  AdventOfCode17.runProgram(program);
  expect(program.isEqual(expectedFinalProgram)).toBe(true);
});

test('Intcode runProgram 5', () => {
  const program = new AdventOfCode17.Program(0, 2024, 43690, [4, 0]);
  AdventOfCode17.runProgram(program);
  expect(program.registerB).toBe(44354);
});

test('Intcode runProgram 6', () => {
  const program = new AdventOfCode17.Program(729, 0, 0, [0, 1, 5, 4, 3, 0]);
  const output = AdventOfCode17.runProgram(program);
  expect(output.join(',')).toBe('4,6,3,5,6,3,5,2,1,0');
});

test('Intcode runProgram 7', () => {
  const instructions = [0, 3, 5, 4, 3, 0];
  const program = new AdventOfCode17.Program(117440, 0, 0, instructions);
  const output = AdventOfCode17.runProgram(program);
  expect(output.join(',')).toBe(instructions.join(','));
});
