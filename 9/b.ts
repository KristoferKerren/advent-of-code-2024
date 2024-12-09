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

const getNbrOfNum = (spaces: (number | '.')[], endInd: number): number => {
  let nbrOfNum = 0;
  let number = spaces[endInd];
  while (spaces[endInd - nbrOfNum] === number) nbrOfNum++;
  return nbrOfNum;
};

const getIndex = (
  spaces: (number | '.')[],
  numberOfDots: number,
  maxInd: number
): number => {
  const stringToSearch = new Array(numberOfDots).fill('.').join('');
  const mainString = spaces
    .map((s) => (s === '.' ? '.' : 'X'))
    .join('')
    .substring(0, maxInd);
  return mainString.indexOf(stringToSearch);
};

let endInd = spaces.length - 1;

while (endInd > 0) {
  const theNumber = spaces[endInd];
  if (theNumber === '.') {
    endInd--;
  } else {
    const nbrOfNum = getNbrOfNum(spaces, endInd);
    const index = getIndex(spaces, nbrOfNum, endInd);
    if (index > -1) {
      for (var iiii = 0; iiii < nbrOfNum; iiii++) {
        spaces[index + iiii] = theNumber;
        spaces[endInd - iiii] = '.';
      }
    }
    endInd -= nbrOfNum;
  }
}

let startInd = 0;
let sum = 0;
while (startInd < spaces.length) {
  if (spaces[startInd] !== '.') {
    sum += (spaces[startInd] as number) * startInd;
  }
  startInd++;
}
console.log(sum);

export {};
