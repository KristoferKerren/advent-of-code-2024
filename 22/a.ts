namespace AdventOfCode22 {
  export function nbrToBinary(n: number): string {
    return n.toString(2);
  }

  export function binaryToNbr(bin: string): number {
    return parseInt(bin, 2);
  }

  export function getMod24(bin: string): string {
    return bin.slice(-24);
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
}

export { AdventOfCode22 };
