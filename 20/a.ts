class Coord {
  constructor(
    public x: number,
    public y: number,
    public type: 'wall' | 'start' | 'end' | 'empty'
  ) {}

  get toString() {
    return `${this.x},${this.y}`;
  }

  get copy() {
    return new Coord(this.x, this.y, this.type);
  }
}

function getCoord(
  x: number,
  y: number,
  coords: Coord[],
  mapMaxX: number,
  mapMaxY: number,
  visited: string[] = []
): Coord {
  if (x <= 0 || y <= 0 || x >= mapMaxX || y >= mapMaxY) return null;
  if (visited.some((c) => c === `${x},${y}`)) return null;
  const c = coords.find((c) => c.toString === `${x},${y}`);
  if (c?.type === 'wall' || c?.type === 'start') return null;
  if (c?.type === 'end') return c;
  return new Coord(x, y, 'empty');
}

function getMap(filename: string) {
  const fs = require('fs');
  const data: string = fs.readFileSync(filename, 'utf8');

  const coords: Coord[] = [];
  const rows = data.split(/\r?\n/);
  let mapMaxX = rows[0].length - 1;
  let mapMaxY = rows.length;
  rows.forEach((row, y) => {
    row.split('').forEach((char, x) => {
      if (char === '#') {
        coords.push(new Coord(x, y, 'wall'));
      }
      if (char === 'S') {
        coords.push(new Coord(x, y, 'start'));
      }
      if (char === 'E') {
        coords.push(new Coord(x, y, 'end'));
      }
    });
  });

  return { coords, mapMaxX, mapMaxY };
}

function logMap(coords: Coord[], mapMaxX: number, mapMaxY: number) {
  console.log('Map:');
  for (let y = 0; y < mapMaxY; y++) {
    console.log(
      new Array(mapMaxX + 1)
        .fill('.')
        .map((char, x) => {
          const c = coords.find((c) => c.toString === `${x},${y}`);
          if (c?.type === 'wall') return '#';
          if (c?.type === 'start') return 'S';
          if (c?.type === 'end') return 'E';
          if (c?.type === 'empty') return '.';
          return char;
        })
        .join('')
    );
  }
}

function run(coords: Coord[], mapMaxX: number, mapMaxY: number) {
  const startCoord = coords.find((c) => c.type === 'start');
  let allOptions: { coord; visited: string[] }[] = [
    { coord: startCoord, visited: [startCoord.toString] },
  ];
  while (allOptions.length) {
    if (allOptions.length > 1) console.log({ len: allOptions.length });
    const loopNbr = allOptions.length;
    for (var j = 0; j < loopNbr; j++) {
      const option = allOptions.shift();
      // Check if reached end:
      if (option.coord.type === 'end') {
        return option.visited;
      }
      // Go left:
      const leftCoord = getCoord(
        option.coord.x - 1,
        option.coord.y,
        coords,
        mapMaxX,
        mapMaxY,
        option.visited
      );
      if (leftCoord) {
        allOptions.push({
          coord: leftCoord,
          visited: [...option.visited, leftCoord.toString],
        });
      }
      // Go right:
      const rightCoord = getCoord(
        option.coord.x + 1,
        option.coord.y,
        coords,
        mapMaxX,
        mapMaxY,
        option.visited
      );
      if (rightCoord) {
        allOptions.push({
          coord: rightCoord,
          visited: [...option.visited, rightCoord.toString],
        });
      }
      // Go up:
      const upCoord = getCoord(
        option.coord.x,
        option.coord.y - 1,
        coords,
        mapMaxX,
        mapMaxY,
        option.visited
      );
      if (upCoord) {
        allOptions.push({
          coord: upCoord,
          visited: [...option.visited, upCoord.toString],
        });
      }
      // Go down:
      const downCoord = getCoord(
        option.coord.x,
        option.coord.y + 1,
        coords,
        mapMaxX,
        mapMaxY,
        option.visited
      );
      if (downCoord) {
        allOptions.push({
          coord: downCoord,
          visited: [...option.visited, downCoord.toString],
        });
      }
    }
  }
  return [];
}

const getDistance = (coord1: string, coord2: string) => {
  const [x1, y1] = coord1.split(',').map(Number);
  const [x2, y2] = coord2.split(',').map(Number);
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

function runWithCheat(
  visited: string[],
  maxDistanceOfCheat: number,
  cheatMinLimit: number
) {
  let cheatPaths: number = 0;
  for (var i = 0; i < visited.length; i++) {
    const coord = visited[i];
    const minIndexOfCheat = i + cheatMinLimit;
    const potentialCheatCoords = visited.slice(minIndexOfCheat + 1);
    if (potentialCheatCoords.length === 0) return cheatPaths;
    const cheatCoords = potentialCheatCoords.filter((v) => {
      return getDistance(v, coord) <= maxDistanceOfCheat;
    });
    cheatCoords.forEach((cheatCoord) => {
      const distance = getDistance(cheatCoord, coord);
      if (distance <= maxDistanceOfCheat) {
        const indexOfCheat =
          minIndexOfCheat +
          potentialCheatCoords.findIndex((c) => c === cheatCoord);
        if (indexOfCheat - distance + 1 >= minIndexOfCheat) {
          cheatPaths++;
        }
      }
    });
  }

  return cheatPaths;
}

const fileName = '20/input.txt';
const { coords, mapMaxX, mapMaxY } = getMap(fileName);
const visited = run(coords, mapMaxX, mapMaxY);
const res20a = runWithCheat(visited, 2, 100);
const res20b = runWithCheat(visited, 20, 100);
console.log({ res20a, res20b });

export {};
