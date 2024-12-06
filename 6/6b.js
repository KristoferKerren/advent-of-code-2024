const { get } = require('http');

function getMap(fileName) {
  const rawInput = require('fs').readFileSync(
    require('path').resolve(__dirname, fileName),
    'utf-8'
  );

  const map = rawInput.split(/\r?\n/).map((row) => row.split(''));

  return map;
}

function logMap(map) {
  console.log('Map:');
  for (let y = 0; y < map.length; y++) {
    console.log(
      map[y]
        .map((char, x) => {
          return char;
        })
        .join('')
    );
  }
}

function getStartIndex(map) {
  let start = { x: -1, y: -1 };
  map.forEach((row, y) => {
    row.forEach((step, x) => {
      if (step !== '.' && step !== '#') {
        start = { startX: x, startY: y };
      }
    });
  });
  return start;
}

function getStartDir(map) {
  const startCoord = getStartIndex(map);
  const startDirChar = checkInd(map, startCoord.startX, startCoord.startY);
  if (startDirChar === '^') return 'N';
  if (startDirChar === 'v') return 'S';
  if (startDirChar === '>') return 'E';
  if (startDirChar === '<') return 'W';
}

function getNextCoord(x, y, dir) {
  if (dir === 'N') {
    return { x, y: y - 1 };
  } else if (dir === 'S') {
    return { x, y: y + 1 };
  } else if (dir === 'E') {
    return { x: x + 1, y };
  } else if (dir === 'W') {
    return { x: x - 1, y };
  }
}

function goForward(map, x, y, dir, visited) {
  visited.set(`${x},${y}`, dir);
  const nextCoord = getNextCoord(x, y, dir);
  const next = checkInd(map, nextCoord.x, nextCoord.y);
  if (next === null) return false;
  else if (next !== '#') {
    return goForward(map, nextCoord.x, nextCoord.y, dir, visited);
  } else if (next === '#') {
    let newDir = dir;
    if (dir === 'N') newDir = 'E';
    if (dir === 'E') newDir = 'S';
    if (dir === 'S') newDir = 'W';
    if (dir === 'W') newDir = 'N';
    return goForward(map, x, y, newDir, visited);
  }
  return false;
}

function goForwardQuick(map, x, y, dir, visited = new Map()) {
  let [currX, currY] = [x, y];
  let nextCoord = { x, y };
  let next = '';
  while (true) {
    nextCoord = getNextCoord(nextCoord.x, nextCoord.y, dir);
    next = checkInd(map, nextCoord.x, nextCoord.y);

    if (next === '#' || next === 'O' || next === null) {
      //console.log('HIT WALL BREAK!!!!');
      //console.log({ currX, currY });
      break;
    }
    [currX, currY] = [nextCoord.x, nextCoord.y];
  }
  if (next === null) {
    //console.log('HIT OUTSIDE return false!!!!');
    // console.log({ currX, currY });
    return false;
  }
  let newDir = dir;
  if (dir === 'N') newDir = 'E';
  if (dir === 'E') newDir = 'S';
  if (dir === 'S') newDir = 'W';
  if (dir === 'W') newDir = 'N';
  if (visited.has(`${currX},${currY},${newDir}`)) {
    return true;
  }
  visited.set(`${currX},${currY},${newDir}`);
  return goForwardQuick(map, currX, currY, newDir, visited);
}

function checkInd(map, x, y) {
  if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) {
    return null;
  }
  return map[y][x];
}

function isInfiniteLoop(map, startCoord, startDir) {
  return goForwardQuick(map, startCoord.startX, startCoord.startY, startDir);
}

const map = getMap('./6-input.txt');
const startCoord = getStartIndex(map);
const startDir = getStartDir(map);
const visited = new Map();
goForward(map, startCoord.startX, startCoord.startY, startDir, visited);
let count = 0;
visited.forEach((val, key) => {
  const [x, y] = key.split(',').map(Number);
  if (checkInd(map, x, y) === '.') {
    const mapCopy = [...map.map((m) => [...m])];
    mapCopy[y][x] = 'O';
    const isInfinite = isInfiniteLoop(mapCopy, startCoord, startDir);
    if (isInfinite) count++;
  }
});

console.log({ nbrOfPossibleInfiniteLoopPos: count });
