const fs = require('fs');

// Read the file synchronously
const data = fs.readFileSync('3/3-input.txt', 'utf8');

const regex = /do\(\)|don't\(\)|mul\(-?\d+,-?\d+\)/g;
const matches: string[] = data.match(regex);
let sum = 0;
let isDisabled = false;
matches.forEach((m) => {
  if (m === 'do()') isDisabled = false;
  else if (m === "don't()") isDisabled = true;
  if (m.startsWith('mul') && !isDisabled) {
    const nbrs = m
      .substring(4, m.length - 1)
      .split(',')
      .map((n) => Number(n));
    sum += nbrs[0] * nbrs[1];
  }
});

console.log(sum);
export {};
