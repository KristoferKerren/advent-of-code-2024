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
let sum = 0;
for (var i = 0; i < lefts.length; i++) {
  const amount = rights.filter((f) => f === lefts[i]).length;
  sum += amount * lefts[i];
}
console.log({ sum });

export {};
