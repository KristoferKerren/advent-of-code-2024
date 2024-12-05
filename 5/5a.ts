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

function isInCorectOrder(update: number[]) {
  return rules.every((rule) => {
    const firstInd = update.indexOf(rule.lower);
    const secondeInd = update.indexOf(rule.higher);
    return firstInd < 0 || secondeInd < 0 || firstInd < secondeInd;
  });
}

function sumMiddleNumbers(arrays: number[][]): number {
  let totalSum = 0;

  for (const arr of arrays) {
    const length = arr.length;
    totalSum += arr[Math.floor(length / 2)];
  }

  return totalSum;
}

const correct = updates.filter((u) => isInCorectOrder(u));
const sum = sumMiddleNumbers(correct);
console.log({ sum });
export {};
