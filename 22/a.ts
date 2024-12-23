namespace AdventOfCode22 {
  function getInput(filename: string): number[] {
    const fs = require('fs');
    const data: string = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/).map((row) => Number(row));
  }

  export function binaryToNbr(bin: string): number {
    return parseInt(bin, 2);
  }

  export function nbrToBinary(n: number): string {
    return n.toString(2);
  }

  export function getMod24(bin: string): string {
    return bin.slice(-24);
  }

  export function divideBy32(bin: string): string {
    return bin.slice(0, bin.length - 5);
  }

  export function multiplyBy64(bin: string): string {
    return `${bin}000000`;
  }

  export function multiplyBy2048(bin: string): string {
    return `${bin}00000000000`;
  }

  export function getBitwiseXOR(bin1: string, bin2: string): string {
    if (bin1.length > bin2.length) {
      bin2 = `${'0'.repeat(bin1.length - bin2.length)}${bin2}`;
    } else if (bin2.length > bin1.length) {
      bin1 = `${'0'.repeat(bin2.length - bin1.length)}${bin1}`;
    }
    let result = '';
    for (let i = 0; i < bin1.length; i++) {
      result += bin1[i] === bin2[i] ? '0' : '1';
    }
    return result;
  }

  export function getNextSecretNumber(nbr: number): number {
    let nbrBinary = nbrToBinary(nbr);
    const mult1 = multiplyBy64(nbrBinary);
    nbrBinary = getBitwiseXOR(mult1, nbrBinary);
    nbrBinary = getMod24(nbrBinary);
    const div2 = divideBy32(nbrBinary);
    nbrBinary = getBitwiseXOR(div2, nbrBinary);
    nbrBinary = getMod24(nbrBinary);
    const mult3 = multiplyBy2048(nbrBinary);
    nbrBinary = getBitwiseXOR(mult3, nbrBinary);
    nbrBinary = getMod24(nbrBinary);
    return binaryToNbr(nbrBinary);
  }

  export function run() {
    const secretNumbers = getInput('22/input.txt');
    for (var i = 1; i <= 2000; i++) {
      if (i % 200 === 0) {
        console.log({ i, secretNumbers });
      }
      for (var j = 0; j < secretNumbers.length; j++) {
        secretNumbers[j] = getNextSecretNumber(secretNumbers[j]);
      }
    }
    const sum = secretNumbers.reduce((acc, val) => acc + val, 0);
    console.log({ sum });
  }
}

AdventOfCode22.run();

export { AdventOfCode22 };
