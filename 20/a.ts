class Coord {
  constructor(
    public x: number,
    public y: number,
    public type: 'outerWall' | 'wall' | 'start' | 'end' | 'empty'
  ) {}

  get toString() {
    return `${this.x},${this.y}`;
  }
}

function getCoord(
  x: number,
  y: number,
  allVisited: Set<string>,
  coords: Coord[],
  mapMaxX: number,
  mapMaxY: number
): Coord {
  if (x <= 0 || y <= 0 || x >= mapMaxX || y >= mapMaxY) return null;
  if (allVisited.has(`${x},${y}`)) return null;
  const c = coords.find((c) => c.toString === `${x},${y}`);
  if (c?.type === 'wall' || c?.type === 'outerWall' || c?.type === 'start')
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
          coords.push(new Coord(x, y, 'outerWall'));
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

  return { coords, mapMaxX, mapMaxY };
}

function run(fileName: string) {
  const { coords, mapMaxX, mapMaxY } = getMap(fileName);
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
        return option.visited.length - 1;
      }
      // Go left:
      const leftCoord = getCoord(
        option.coord.x - 1,
        option.coord.y,
        allVisited,
        coords,
        mapMaxX,
        mapMaxY
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
        allVisited,
        coords,
        mapMaxX,
        mapMaxY
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
        allVisited,
        coords,
        mapMaxX,
        mapMaxY
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
        allVisited,
        coords,
        mapMaxX,
        mapMaxY
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
  return -1;
}

const fileName = '20/input-test.txt';
const noCheating = run(fileName);
console.log({ noCheating });

export {};
