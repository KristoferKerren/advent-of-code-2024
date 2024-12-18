class Coord {
  constructor(
    public x: number,
    public y: number,
    public type: 'wall' | 'start' | 'end' | 'empty'
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
  mapMaxXY: number
): Coord {
  if (x < 0 || y < 0 || x > mapMaxXY || y > mapMaxXY) return null;
  if (allVisited.has(`${x},${y}`)) return null;
  const c = coords.find((c) => c.toString === `${x},${y}`);
  if (c?.type === 'wall') return null;
  if (c) return c;
  return new Coord(x, y, 'empty');
}

function getMap(filename: string, maxStones: number) {
  const fs = require('fs');
  const data: string = fs.readFileSync(filename, 'utf8');

  const coords: Coord[] = [];
  const stones = data.split(/\r?\n/).slice(0, maxStones);
  const lastStone = stones.at(-1);
  let mapMaxXY = 0;
  stones.forEach((row) => {
    const [x, y] = row.split(',').map(Number);
    mapMaxXY = Math.max(mapMaxXY, x, y);
    coords.push(new Coord(x, y, 'wall'));
  });
  coords.push(new Coord(0, 0, 'start'));
  coords.push(new Coord(mapMaxXY, mapMaxXY, 'end'));
  return { coords, mapMaxXY, lastStone };
}

function run(fileName: string, maxStones: number = 0) {
  const { coords, mapMaxXY, lastStone } = getMap(fileName, maxStones);
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
        return { res: option.visited.length - 1, lastStone };
      }
      // Go left:
      const leftCoord = getCoord(
        option.coord.x - 1,
        option.coord.y,
        allVisited,
        coords,
        mapMaxXY
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
        mapMaxXY
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
        mapMaxXY
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
        mapMaxXY
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
  return { res: -1, lastStone };
}

const fileName = '18/input.txt';
const maxStones = fileName.includes('test') ? 12 : 1024;
const { res: res18a } = run(fileName, maxStones);
let res18b = '0';
for (var i = 3450; i >= 0; i--) {
  const { res, lastStone } = run(fileName, i);
  if (res !== -1) {
    res18b = lastStone;
    break;
  }
}

console.log({ res18a, res18b });

export {};
