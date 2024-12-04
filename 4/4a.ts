const fs = require('fs');

// Read the file synchronously
const data: string = fs.readFileSync('4/4-input.txt', 'utf8');
const map = data.split(/\r?\n/).map((row) => row.split(''));

let tot = 0;

const getVal = (x: number, y: number) => {
  if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) {
    return null;
  }
  return map[y][x];
};

const isXMASHor = (startX, startY) => {
  const word = `${getVal(startX, startY)}${getVal(startX + 1, startY)}${getVal(
    startX + 2,
    startY
  )}${getVal(startX + 3, startY)}`;
  return word === 'XMAS' || word === 'SAMX' ? 1 : 0;
};

const isXMASVer = (startX, startY) => {
  const word = `${getVal(startX, startY)}${getVal(startX, startY + 1)}${getVal(
    startX,
    startY + 2
  )}${getVal(startX, startY + 3)}`;
  return word === 'XMAS' || word === 'SAMX' ? 1 : 0;
};

const isXMASDia = (startX, startY) => {
  const word1 = `${getVal(startX, startY)}${getVal(
    startX + 1,
    startY + 1
  )}${getVal(startX + 2, startY + 2)}${getVal(startX + 3, startY + 3)}`;
  const word2 = `${getVal(startX, startY)}${getVal(
    startX - 1,
    startY + 1
  )}${getVal(startX - 2, startY + 2)}${getVal(startX - 3, startY + 3)}`;
  if (
    (word1 === 'XMAS' || word1 === 'SAMX') &&
    (word2 === 'XMAS' || word2 === 'SAMX')
  ) {
    return 2;
  }
  if (
    word1 === 'XMAS' ||
    word1 === 'SAMX' ||
    word2 === 'XMAS' ||
    word2 === 'SAMX'
  ) {
    return 1;
  }
  return 0;
};

map.forEach((row, y) => {
  row.forEach((step, x) => {
    tot += isXMASHor(x, y);
    tot += isXMASVer(x, y);
    tot += isXMASDia(x, y);
  });
});
console.log({ tot });
export {};
