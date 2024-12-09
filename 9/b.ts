class Coord {
  constructor(public x: number, public y: number) {}
}

const fs = require('fs');
const data: string = fs.readFileSync('9/input.txt', 'utf8');

let spaces: (number | '.')[] = [];
let ii: number = 0;
data.split('').forEach((char, i) => {
  const amount = parseInt(char);
  if (i % 2 === 0) {
    spaces = [...spaces, ...new Array(amount).fill(ii)];
    ii++;
  } else {
    spaces = [...spaces, ...new Array(amount).fill('.')];
  }
});

let endInd = spaces.length - 1;
let startInd = spaces.indexOf('.');
while (endInd > startInd) {
  if (spaces[endInd] !== '.') {
    const nbr = spaces[endInd];
    spaces[startInd] = nbr;
    spaces[endInd] = '.';
    startInd = spaces.indexOf('.');
  }
  endInd--;
}

startInd = 0;
let mult = 0;
let sum = 0;
console.log({ spaces });
while (spaces[startInd] !== '.') {
  sum += (spaces[startInd] as number) * mult;
  startInd++;
  mult++;
}
console.log(sum);

export {};
