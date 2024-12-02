const fs = require('fs');

// Read the file synchronously
const data = fs.readFileSync('2/2-input.txt', 'utf8');

const isSafe = (nbrs: number[]) => {
  const isAsc = nbrs[1] - nbrs[0] > 0;
  for (var i = 1; i < nbrs.length; i++) {
    const diff = isAsc ? nbrs[i] - nbrs[i - 1] : nbrs[i - 1] - nbrs[i];
    if (diff < 1 || diff > 3) return false;
  }
  return true;
};

const loopRow = (row: string) => {
  const nbrs = row.split(' ').map((nbr) => Number(nbr));
  for (var levelInd = 0; levelInd < nbrs.length; levelInd++) {
    var copyNbrs = [...nbrs];
    copyNbrs.splice(levelInd, 1);
    if (isSafe(copyNbrs)) return true;
  }
  return false;
};

const nbrOfRows = data.split('\n').filter((r) => loopRow(r)).length;
console.log(nbrOfRows);

export {};
