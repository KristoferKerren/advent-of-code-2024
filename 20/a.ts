class Coord {
  constructor(
    public x: number,
    public y: number,
    public type: 'thickWall' | 'wall' | 'start' | 'end' | 'empty'
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
  allVisited: Set<string> = new Set()
): Coord {
  if (x <= 0 || y <= 0 || x >= mapMaxX || y >= mapMaxY) return null;
  if (allVisited.has(`${x},${y}`)) return null;
  const c = coords.find((c) => c.toString === `${x},${y}`);
  if (c?.type === 'wall' || c?.type === 'thickWall' || c?.type === 'start')
    return null;
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
        if (x === 0 || y === 0 || x === mapMaxX || y === mapMaxY) {
          coords.push(new Coord(x, y, 'thickWall'));
        } else {
          coords.push(new Coord(x, y, 'wall'));
        }
      }
      if (char === 'S') {
        coords.push(new Coord(x, y, 'start'));
      }
      if (char === 'E') {
        coords.push(new Coord(x, y, 'end'));
      }
    });
  });

  coords.forEach((c) => {
    if (c.type === 'wall') {
      const left = getCoord(c.x - 1, c.y, coords, mapMaxX, mapMaxY);
      const right = getCoord(c.x + 1, c.y, coords, mapMaxX, mapMaxY);
      const up = getCoord(c.x, c.y - 1, coords, mapMaxX, mapMaxY);
      const down = getCoord(c.x, c.y + 1, coords, mapMaxX, mapMaxY);
      if ((!left || !right) && (!up || !down)) c.type = 'thickWall';
    }
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
          if (c?.type === 'thickWall') return '¤';
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
  let allVisited: Set<string> = new Set();
  while (allOptions.length) {
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
        allVisited
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
        allVisited
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
        allVisited
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
        allVisited
      );
      if (downCoord) {
        allOptions.push({
          coord: downCoord,
          visited: [...option.visited, downCoord.toString],
        });
      }
    }

    // Update allVisited:
    allOptions
      .map((a) => a.visited)
      .flat()
      .forEach((a) => allVisited.add(a));

    // Filter out unecessary items:
    const allOptionsCopy = [...allOptions.map((a) => ({ ...a }))]; // Deep copy
    const length = allOptionsCopy.length;
    allOptions = [];
    for (var i = 0; i < length; i++) {
      const a = allOptionsCopy.pop();
      const nbrOfVisited = a.visited.length;
      const minNbrVisited = Math.min(
        ...allOptionsCopy
          .filter((c) => c.coord.toString === a.coord.toString)
          .map((b) => b.visited.length),
        99999
      );
      const alreadyExists = allOptions.some(
        (b) => b.coord.toString === a.coord.toString
      );
      if (
        !alreadyExists &&
        (nbrOfVisited === minNbrVisited || minNbrVisited === 99999)
      ) {
        allOptions.push(a);
      }
    }
  }
  return [];
}

function run20a(visited: string[], cheatLimit) {
  const cheatPaths: number[] = [];
  for (var i = 0; i < visited.length - 2; i++) {
    const coord = visited[i];
    const [currX, currY] = coord.split(',').map(Number);
    const cheatCoords = [
      [currX + 2, currY],
      [currX - 2, currY],
      [currX, currY + 2],
      [currX, currY - 2],
    ];
    cheatCoords.forEach((cheatCoord) => {
      const indexOfCheat = visited.findIndex((c) => c === cheatCoord.join(','));
      if (indexOfCheat > 0 && indexOfCheat - i - 2 >= cheatLimit) {
        cheatPaths.push(indexOfCheat - i - 2);
      }
    });
  }

  cheatPaths.sort((a, b) => b - a);
  return cheatPaths.length;
}

const fileName = '20/input.txt';
const cheatLimit = 100;
const { coords, mapMaxX, mapMaxY } = getMap(fileName);
const visited = run(coords, mapMaxX, mapMaxY);

console.log(run20a(visited, cheatLimit));

export {};
