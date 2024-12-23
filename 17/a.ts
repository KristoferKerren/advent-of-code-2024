namespace AdventOfCode17 {
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

  function nbrToBinary(n: number): string {
    return n.toString(2);
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
          const mod8 = getMod8(comboOperand);
          output = [...output, ...`${mod8}`.split('').map(Number)];
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
}

const instructions = [2, 4, 1, 1, 7, 5, 4, 7, 1, 4, 0, 3, 5, 5, 3, 0];
const program = new AdventOfCode17.Program(30553366, 0, 0, instructions);
console.log(AdventOfCode17.runProgram(program).join(','));
export { AdventOfCode17 };
