namespace AdventOfCode17b {
  export class Program {
    constructor(
      public registerA: number,
      public registerB: number,
      public registerC: number,
      public instructions: number[] = []
    ) {}

    isEqual(p: Program) {
      return (
        this.registerA === p.registerA &&
        this.registerB === p.registerB &&
        this.registerC === p.registerC
      );
    }
  }

  function nbrToBinary(n: number, minimum3Char: boolean = false): string {
    const bin = n.toString(2);
    if (minimum3Char && bin.length < 3) {
      return `${'0'.repeat(3 - bin.length)}${bin}`;
    }
    return bin;
  }

  function binaryToNbr(bin: string): number {
    return parseInt(bin, 2);
  }

  function getDivision(n1: number, n2: number) {
    const numerator = n1;
    const denominator = Math.pow(2, n2);
    return Math.trunc(numerator / denominator);
  }

  function getMod8(n: number): number {
    let binary = nbrToBinary(n);
    let last3 = binary.slice(-3);
    return binaryToNbr(last3);
  }

  function getBitwiseXOR(n1: number, n2: number) {
    let bin1 = nbrToBinary(n1);
    let bin2 = nbrToBinary(n2);
    if (bin1.length > bin2.length) {
      bin2 = `${'0'.repeat(bin1.length - bin2.length)}${bin2}`;
    } else if (bin2.length > bin1.length) {
      bin1 = `${'0'.repeat(bin2.length - bin1.length)}${bin1}`;
    }
    let result = '';
    for (let i = 0; i < bin1.length; i++) {
      result += bin1[i] === bin2[i] ? '0' : '1';
    }
    return binaryToNbr(result);
  }

  export function runProgram(program: Program): number[] {
    let index = 0;
    let output: number[] = [];
    while (index < program.instructions.length) {
      const opcode = program.instructions[index];
      const literalOperand = program.instructions[index + 1];
      const comboOperand =
        literalOperand === 4
          ? program.registerA
          : literalOperand === 5
          ? program.registerB
          : literalOperand === 6
          ? program.registerC
          : literalOperand;

      switch (opcode) {
        case 0:
          program.registerA = getDivision(program.registerA, comboOperand);
          break;
        case 1:
          program.registerB = getBitwiseXOR(program.registerB, literalOperand);
          break;
        case 2:
          program.registerB = getMod8(comboOperand);
          break;
        case 3:
          if (program.registerA !== 0) {
            index = literalOperand - 2; //-2 to adjust for adding +2 after switch case
          }
          break;
        case 4:
          program.registerB = getBitwiseXOR(
            program.registerB,
            program.registerC
          );
          break;
        case 5:
          output = [
            ...output,
            ...`${getMod8(comboOperand)}`.split('').map(Number),
          ];
          break;
        case 6:
          program.registerB = getDivision(program.registerA, comboOperand);
          break;
        case 7:
          program.registerC = getDivision(program.registerA, comboOperand);
          break;
        default:
          console.error('N0t implemented');
      }
      index += 2;
    }
    return output;
  }

  const instructions = [2, 4, 1, 1, 7, 5, 4, 7, 1, 4, 0, 3, 5, 5, 3, 0];
  const possibleSolutions: string[] = [];
  for (var i = 0; i < 7; i++) {
    const output = runProgram(new Program(i, 0, 0, instructions));
    if (output[0] === instructions.at(-1)) {
      possibleSolutions.push(nbrToBinary(i, true));
    }
  }
  let hasFound = false;
  while (!hasFound) {
    const len = possibleSolutions.length;
    for (var i = 0; i <= len - 1; i++) {
      let possibleSol = possibleSolutions.shift();
      for (var j = 0; j <= 7; j++) {
        // Add another 000-111 bit to the end and check if it is possible
        const registerA = binaryToNbr(`${possibleSol}${nbrToBinary(j, true)}`);
        const output = runProgram(new Program(registerA, 0, 0, instructions));
        const isPotentialSolution = instructions
          .join(',')
          .endsWith(output.join(','));
        if (isPotentialSolution) {
          possibleSolutions.push(nbrToBinary(registerA, true));
        }
        if (!hasFound && instructions.join(',') === output.join(',')) {
          console.log({ Day17b: registerA });
          hasFound = true;
        }
      }
    }
  }
}

export { AdventOfCode17b };
