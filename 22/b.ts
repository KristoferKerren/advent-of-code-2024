namespace AdventOfCode22b {
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

  const cache: Map<string, number> = new Map();
  function getResult(
    searchString: string,
    bananaDiffs: string[],
    bananaPrices: string[]
  ) {
    if (cache.has(searchString)) return cache.get(searchString);
    let res = 0;
    bananaDiffs.forEach((diffs, i) => {
      const index = diffs.indexOf(searchString);
      res += index > 0 ? Number(bananaPrices[i].at(index + 3)) : 0;
    });
    cache.set(searchString, res);
    return res;
  }

  export function run() {
    const secretNumbers = getInput('22/input.txt');
    const bananaPrices: string[] = [];
    const bananaPricesDiffs: string[] = [];
    for (var j = 0; j < secretNumbers.length; j++) {
      let _bananaPrices = '';
      let diffs = '';
      let lastSecretNumber = secretNumbers[j];
      let newBananaPrice = 0;
      let lastBananaPrice = lastSecretNumber % 10;
      let newSecretNumber;
      for (var i = 1; i <= 1999; i++) {
        newSecretNumber = getNextSecretNumber(lastSecretNumber);
        newBananaPrice = newSecretNumber % 10;
        _bananaPrices += `${newBananaPrice}`;
        let diff = newBananaPrice - lastBananaPrice;
        lastSecretNumber = newSecretNumber;
        lastBananaPrice = newBananaPrice;
        let diffChar = '';
        if (i === 0) diffChar = '#';
        else {
          if (diff >= 0) diffChar = diff.toString();
          else if (diff === -1) diffChar = 'a';
          else if (diff === -2) diffChar = 'b';
          else if (diff === -3) diffChar = 'c';
          else if (diff === -4) diffChar = 'd';
          else if (diff === -5) diffChar = 'e';
          else if (diff === -6) diffChar = 'f';
          else if (diff === -7) diffChar = 'g';
          else if (diff === -8) diffChar = 'h';
          else if (diff === -9) diffChar = 'i';
        }
        diffs += diffChar;
      }

      bananaPricesDiffs.push(diffs);
      bananaPrices.push(_bananaPrices);
    }
    let max = -1;
    bananaPricesDiffs.forEach((diffs, ind) => {
      if (ind % 100 === 0) console.log((ind / bananaPricesDiffs.length) * 100);
      for (var i = 0; i < diffs.length - 4; i++) {
        const res = getResult(
          diffs.slice(i, i + 4),
          bananaPricesDiffs,
          bananaPrices
        );
        if (res > max) max = res;
      }
    });

    console.log({ day22b: max });
  }
}

AdventOfCode22b.run();

export { AdventOfCode22b };
