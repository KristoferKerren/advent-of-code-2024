class Coord {
  constructor(
    public x: number,
    public y: number,
    public type: 'wall' | 'start' | 'end' | 'empty'
  ) {}

  get toString() {
    return `${this.x},${this.y}`;
  }

  get value(): number {
    return this.x * 1 + this.y * 100;
  }
}

function getScore(steps: ('F' | 'RotClockwise' | 'RotCounterClockwise')[]) {
  return steps.reduce((acc, a) => acc + (a === 'F' ? 1 : 1000), 0);
}

function getMap() {
  const fs = require('fs');
  const data: string = fs.readFileSync('16/input.txt', 'utf8');

  const coords: Coord[] = [];
  data.split(/\r?\n/).forEach((row, y) => {
    row.split('').forEach((char, x) => {
      if (char === '#') coords.push(new Coord(x, y, 'wall'));
      if (char === 'S') coords.push(new Coord(x, y, 'start'));
      if (char === 'E') coords.push(new Coord(x, y, 'end'));
    });
  });
  const mapMaxX = Math.max(...coords.map((w) => w.x));
  const mapMaxY = Math.max(...coords.map((w) => w.y));
  return { coords, mapMaxX, mapMaxY };
}

function logMap() {
  console.log('Map:');
  for (let y = 0; y < mapMaxY + 1; y++) {
    console.log(
      new Array(mapMaxX + 1)
        .fill('.')
        .map((char, x) => {
          if (
            coords.some((c) => c.toString === `${x},${y}` && c.type === 'wall')
          )
            return '#';
          if (
            coords.some((c) => c.toString === `${x},${y}` && c.type === 'start')
          )
            return 'S';
          if (
            coords.some((c) => c.toString === `${x},${y}` && c.type === 'end')
          )
            return 'E';
          return char;
        })
        .join('')
    );
  }
}

function getNewCoord(dir, coord: Coord) {
  let newCoord: Coord;
  if (dir === 'N') newCoord = new Coord(coord.x, coord.y - 1, 'empty');
  if (dir === 'E') newCoord = new Coord(coord.x + 1, coord.y, 'empty');
  if (dir === 'S') newCoord = new Coord(coord.x, coord.y + 1, 'empty');
  if (dir === 'W') newCoord = new Coord(coord.x - 1, coord.y, 'empty');
  if (coords.some((c) => c.toString === newCoord.toString && c.type === 'wall'))
    return null;
  return newCoord;
}

function getNewDir(
  dir,
  rotation: 'RotClockwise' | 'RotCounterClockwise' | 'F'
) {
  if (dir === 'N' && rotation === 'RotClockwise') return 'E';
  if (dir === 'N' && rotation === 'RotCounterClockwise') return 'W';
  if (dir === 'E' && rotation === 'RotClockwise') return 'S';
  if (dir === 'E' && rotation === 'RotCounterClockwise') return 'N';
  if (dir === 'S' && rotation === 'RotClockwise') return 'W';
  if (dir === 'S' && rotation === 'RotCounterClockwise') return 'E';
  if (dir === 'W' && rotation === 'RotClockwise') return 'N';
  if (dir === 'W' && rotation === 'RotCounterClockwise') return 'S';
  return dir;
}

const { coords, mapMaxX, mapMaxY } = getMap();
const startCoord = coords.find((c) => c.type === 'start');
let visitedMap = new Map<string, number>();
visitedMap.set(startCoord.toString, 0);
let allOptions: { curr; steps; visited: Map<string, number> }[] = [
  { curr: { dir: 'E', coord: startCoord }, steps: [], visited: visitedMap },
];
let minScore = 9999999999999;
while (true && allOptions.length) {
  const loopNbr = allOptions.length;
  for (var j = 0; j < loopNbr; j++) {
    const _allOption = allOptions.shift();
    const currentScore = getScore(_allOption.steps);
    if (
      coords.find((c) => c.type === 'end').toString ===
      _allOption.curr.coord.toString
    ) {
      minScore = Math.min(minScore, currentScore);
    } else if (currentScore < minScore) {
      // Go forward:
      const newCoord = getNewCoord(_allOption.curr.dir, _allOption.curr.coord);
      if (newCoord && !_allOption.visited.has(newCoord.toString)) {
        const _steps = [..._allOption.steps];
        _steps.push('F');
        const _visited = new Map(_allOption.visited);
        _visited.set(newCoord.toString, currentScore + 1);
        allOptions.push({
          curr: { dir: _allOption.curr.dir, coord: newCoord },
          steps: _steps,
          visited: _visited,
        });
      }
      if (_allOption.steps.at(-1) === 'F' || _allOption.steps.length === 0) {
        // Rotate Clockwise:
        const newDirC = getNewDir(_allOption.curr.dir, 'RotClockwise');
        const lookForwardC = getNewCoord(newDirC, _allOption.curr.coord);
        if (lookForwardC && !_allOption.visited.has(lookForwardC.toString)) {
          const _stepsC = [..._allOption.steps];
          _stepsC.push('RotClockwise');
          allOptions.push({
            curr: { dir: newDirC, coord: _allOption.curr.coord },
            steps: _stepsC,
            visited: new Map(_allOption.visited),
          });
        }
        // Rotate CounterClockwise:
        const newDirCC = getNewDir(_allOption.curr.dir, 'RotCounterClockwise');
        const lookForwardCC = getNewCoord(newDirCC, _allOption.curr.coord);
        if (lookForwardCC && !_allOption.visited.has(lookForwardCC.toString)) {
          const _stepsCC = [..._allOption.steps];
          _stepsCC.push('RotCounterClockwise');
          allOptions.push({
            curr: { dir: newDirCC, coord: _allOption.curr.coord },
            steps: _stepsCC,
            visited: new Map(_allOption.visited),
          });
        }
      }
    }
  }

  // Filter out unecessary items:
  allOptions = allOptions.filter((a) => {
    const lastKey = [...a.visited.keys()].pop();
    const score = [...a.visited.values()].pop();
    if (
      allOptions.some(
        (b) => b.visited.has(lastKey) && b.visited.get(lastKey) < score
      )
    )
      return false;
    return true;
  });
}

console.log({ minScore });

export {};
