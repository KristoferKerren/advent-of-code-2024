const fs = require('fs');

// Read the file synchronously
const data = fs.readFileSync('1/1a-input.txt', 'utf8');

// Split the data into an array based on newlines
const lefts: number[] = [];
const rights: number[] = [];
const inputs = data.split('\n').forEach((r: string) => {
  const nbrs: number[] = r
    .trim()
    .split(' ')
    .map((f) => Number(f));
  lefts.push(nbrs[0]);
  rights.push(nbrs.at(-1) || 0);
});
const leftSorted = lefts.sort();
const rightSorted = rights.sort();
let sum = 0;
for (var i = 0; i < leftSorted.length; i++) {
  sum += Math.abs(rightSorted[i] - leftSorted[i]);
}
console.log({ leftSorted, rightSorted, sum });

export {};
