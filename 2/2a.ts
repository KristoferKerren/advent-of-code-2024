const fs = require('fs');

// Read the file synchronously
const data = fs.readFileSync('2/2a-input.txt', 'utf8');

const isSafe = (row: string) => {
  const nbrs = row.split(' ').map((nbr) => Number(nbr));
  const isAsc = nbrs[1] - nbrs[0] > 0;
  for (var i = 1; i < nbrs.length; i++) {
    const diff = isAsc ? nbrs[i] - nbrs[i - 1] : nbrs[i - 1] - nbrs[i];
    if (diff < 1 || diff > 3) return false;
  }

  return true;
};

const nbrOfInputs = data.split('\n').filter((r: string) => isSafe(r)).length;

console.log(nbrOfInputs);

export {};
