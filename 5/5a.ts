const fs = require('fs');
const data: string = fs.readFileSync('5/5-input.txt', 'utf8');

class Rule {
  constructor(public lower: number, public higher: number) {}
}

const rules: Rule[] = [];
const updates: number[][] = [];
data.split(/\r?\n/).forEach((row) => {
  if (row.includes('|')) {
    const nbrs = row.split('|').map((str) => Number(str));
    rules.push(new Rule(nbrs[0], nbrs[1]));
  } else if (row.includes(',')) {
    updates.push(row.split(',').map((str) => Number(str)));
  }
});

function isInCorrectOrder(update: number[]) {
  return rules.every((rule) => {
    const firstInd = update.indexOf(rule.lower);
    const secondeInd = update.indexOf(rule.higher);
    return firstInd < 0 || secondeInd < 0 || firstInd < secondeInd;
  });
}

function sumMiddleNumbers(arrays: number[][]): number {
  return arrays
    .map((arr) => arr[Math.floor(arr.length / 2)])
    .reduce((acc, curr) => acc + curr, 0);
}

const inCorrect = updates.filter((u) => isInCorrectOrder(u));
const sum = sumMiddleNumbers(inCorrect);
console.log({ sum });
export {};
