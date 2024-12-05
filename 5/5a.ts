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

function getRelevantRules(update: number[]): Rule[] {
  return [...rules].filter((rule) => {
    return update.includes(rule.lower) && update.includes(rule.higher);
  });
}

function isInCorrectOrder(update: number[]) {
  return getRelevantRules(update).every((rule) => {
    const firstInd = update.indexOf(rule.lower);
    const secondeInd = update.indexOf(rule.higher);
    return firstInd < secondeInd;
  });
}

function sumMiddleNumbers(arrays: number[][]): number {
  return arrays
    .map((arr) => arr[Math.floor(arr.length / 2)])
    .reduce((acc, curr) => acc + curr, 0);
}

const corrects = updates.filter((u) => !isInCorrectOrder(u));
const sum = sumMiddleNumbers(corrects);
console.log({ sum });
export {};
