namespace AdventOfCode25 {
  function getInput(filename: string) {
    const fs = require('fs');
    const keys: number[][] = [];
    const locks: number[][] = [];
    const wireConnections: string[][] = [];
    let isParsingLock = false;
    let isParsingKey = false;
    let index = 0;
    let curr: number[] = new Array(5).fill(-1);
    const rows: string[] = fs.readFileSync(filename, 'utf8').split(/\r?\n/);
    rows.forEach((row, rowIndex) => {
      const rowArr = row.split('');
      if (isParsingKey) {
        rowArr.forEach((char, ind) => {
          if (char === '#' && curr[ind] === -1) {
            curr[ind] = index;
          }
        });
        index--;
      }
      if (isParsingLock) {
        rowArr.forEach((char, ind) => {
          if (char === '.' && curr[ind] === -1) {
            curr[ind] = index;
          }
        });
        index++;
      }
      if (rowIndex % 8 === 0 && row === '#####') {
        isParsingLock = true;
        index = 0;
        curr = new Array(5).fill(-1);
        return;
      } else if (rowIndex % 8 === 0 && row === '.....') {
        isParsingKey = true;
        index = 5;
        curr = new Array(5).fill(-1);
        return;
      } else if (row === '' || rowIndex === rows.length - 1) {
        if (isParsingKey) keys.push(curr);
        if (isParsingLock) locks.push(curr);
        isParsingKey = false;
        isParsingLock = false;
      }
    });
    return { keys, locks };
  }

  function fits(key: number[], lock: number[]) {
    return key.every((k, i) => k + lock[i] < 6);
  }

  const { keys, locks } = getInput('25/input.txt');

  //console.log({ keys, locks });

  let sum = 0;
  keys.forEach((key) => {
    locks.forEach((lock) => {
      if (fits(key, lock)) {
        sum += 1;
      }
    });
  });

  console.log({ sum });

  // Too high: 11757
  // To high 3408
}

export { AdventOfCode25 };
