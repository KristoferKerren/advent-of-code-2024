const fs = require('fs');

// Read the file synchronously
const data: string = fs.readFileSync('4/4-input-test.txt', 'utf8');
const map = data.split(/\r?\n/).map((row) => row.split(''));

let tot = 0;

const getVal = (x: number, y: number) => {
  if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) {
    return null;
  }
  return map[y][x];
};

const isXMAS = (startX, startY) => {
  if (getVal(startX, startY) !== 'A') return false;
  if (
    (getVal(startX - 1, startY - 1) === 'M' &&
      getVal(startX + 1, startY + 1) === 'S') ||
    (getVal(startX + 1, startY + 1) === 'M' &&
      getVal(startX - 1, startY - 1) === 'S')
  ) {
    return (
      (getVal(startX - 1, startY + 1) === 'M' &&
        getVal(startX + 1, startY - 1) === 'S') ||
      (getVal(startX + 1, startY - 1) === 'M' &&
        getVal(startX - 1, startY + 1) === 'S')
    );
  }
  return false;
};

map.forEach((row, y) => {
  row.forEach((step, x) => {
    if (isXMAS(x, y)) tot += 1;
  });
});
console.log({ tot });
export {};
