import { log } from 'console';
import { on } from 'events';

class Coord {
  constructor(public x: number, public y: number) {}

  get toString() {
    return `${this.x},${this.y}`;
  }

  get value(): number {
    return this.x * 1 + this.y * 100;
  }
}

function getMap() {
  const fs = require('fs');
  const data: string = fs.readFileSync('15/input.txt', 'utf8');
  const wallCoords: Coord[] = [];
  const boxCoords: Coord[] = [];
  let robotCoord: Coord;
  const dirs: ('>' | '<' | '^' | 'v')[] = [];

  const map = data
    .split(/\r?\n/)
    .map((row, y) => {
      if (row.startsWith('#')) {
        return row.split('').map((char, x) => {
          if (char === '#') wallCoords.push(new Coord(x, y));
          else if (char === 'O') boxCoords.push(new Coord(x, y));
          else if (char === '@') robotCoord = new Coord(x, y);
          return char;
        });
      } else if (row.length > 0) {
        dirs.push(...row.split('').map((r) => r as '>' | '<' | '^' | 'v'));
      }
    })
    .filter((row) => !!row);
  const mapMaxX = map.length - 1;
  const mapMaxY = map[0].length - 1;
  return { map, mapMaxX, mapMaxY, wallCoords, boxCoords, robotCoord, dirs };
}

function goOneStep(cc: Coord, dir: '>' | '<' | '^' | 'v') {
  let newX = dir === '>' ? cc.x + 1 : dir === '<' ? cc.x - 1 : cc.x;
  let newY = dir === '^' ? cc.y - 1 : dir === 'v' ? cc.y + 1 : cc.y;
  const currentIsRobot = robotCoord.toString === `${cc.x},${cc.y}`;
  const isWall = wallCoords.some((c) => c.toString === `${newX},${newY}`);
  const isBox = boxCoords.some((c) => c.toString === `${newX},${newY}`);
  const isEmpty = !isWall && !isBox;
  if (isWall) {
    return false;
  } else if (isEmpty || (isBox && goOneStep(new Coord(newX, newY), dir))) {
    if (currentIsRobot) robotCoord = new Coord(newX, newY);
    else {
      const box = boxCoords.find((c) => c.toString === cc.toString);
      if (box) {
        box.x = newX;
        box.y = newY;
      }
    }
    return true;
  }
}

let { mapMaxX, mapMaxY, wallCoords, boxCoords, robotCoord, dirs } = getMap();

while (dirs.length > 0) {
  let dir = dirs.shift();
  goOneStep(robotCoord, dir);
}

const sum = boxCoords.reduce((acc, c) => acc + c.value, 0);
console.log({ sum });
export {};
