const { get } = require('http');

function getMap(fileName) {
  const rawInput = require('fs').readFileSync(
    require('path').resolve(__dirname, fileName),
    'utf-8'
  );

  const map = rawInput.split(/\r?\n/).map((row) => row.split(''));

  return map;
}

function logMap() {
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
  visited.set(`${x},${y}`);
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

function checkInd(map, x, y) {
  if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) {
    return null;
  }
  return map[y][x];
}

const map = getMap('./6-input.txt');
const startCoord = getStartIndex(map);
const startDir = getStartDir(map);
visited = new Map();
visited.set(`${startCoord.startX},${startCoord.startY}`);
goForward(map, startCoord.startX, startCoord.startY, startDir, visited);
console.log({ nbrOfVisitedSpots: visited.size });
