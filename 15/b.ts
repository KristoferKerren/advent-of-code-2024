class Coord {
  constructor(
    public x: number,
    public y: number,
    public type: 'robot' | 'box' | 'wall'
  ) {}

  get toString() {
    return `${this.x},${this.y}`;
  }

  get value(): number {
    if (this.type !== 'box') return 0;
    return this.x * 1 + this.y * 100;
  }

  goUp() {
    this.coordsAbove.forEach((c) => c.goUp());
    this.y--;
  }
  goDown() {
    this.coordsBelow.forEach((c) => c.goDown());
    this.y++;
  }
  goLeft() {
    this.coordsLeft?.goLeft();
    this.x--;
  }
  goRight() {
    this.coordsRight?.goRight();
    this.x++;
  }

  get coordsAbove(): Coord[] {
    const _coords = [getCoord(this.x, this.y - 1)];
    if (getCoord(this.x - 1, this.y - 1)?.type === 'box')
      _coords.push(getCoord(this.x - 1, this.y - 1));
    if (this.type === 'box') {
      _coords.push(getCoord(this.x + 1, this.y - 1));
    }
    return _coords.filter((c) => !!c);
  }

  get coordsBelow(): Coord[] {
    const _coords = [getCoord(this.x, this.y + 1)];
    if (getCoord(this.x - 1, this.y + 1)?.type === 'box')
      _coords.push(getCoord(this.x - 1, this.y + 1));
    if (this.type === 'box') {
      _coords.push(getCoord(this.x + 1, this.y + 1));
    }
    return _coords.filter((c) => !!c);
  }

  get coordsLeft(): Coord {
    if (getCoord(this.x - 2, this.y)?.type === 'box')
      return getCoord(this.x - 2, this.y);
    return getCoord(this.x - 1, this.y);
  }

  get coordsRight(): Coord {
    if (this.type === 'box')
      return getCoord(this.x + 2, this.y) || getCoord(this.x + 1, this.y);
    return getCoord(this.x + 1, this.y);
  }

  get canGoUp(): boolean {
    if (this.type === 'wall') {
      console.error(`Try to move a wall at x:${this.x}, y:${this.y}`);
      return false;
    }
    if (this.coordsAbove.filter((c) => c.type === 'wall').length) return false;
    if (this.coordsAbove.filter((c) => c.type === 'box').length)
      return this.coordsAbove.every((c) => c.canGoUp);
    return true;
  }

  get canGoDown(): boolean {
    if (this.type === 'wall') {
      console.error(`Try to move a wall at x:${this.x}, y:${this.y}`);
      return false;
    }
    if (this.coordsBelow.filter((c) => c.type === 'wall').length) return false;
    if (this.coordsBelow.filter((c) => c.type === 'box').length)
      return this.coordsBelow.every((c) => c.canGoDown);
    return true;
  }

  get canGoLeft(): boolean {
    if (this.type === 'wall') {
      console.error(`Try to move a wall at x:${this.x}, y:${this.y}`);
      return false;
    }
    if (this.coordsLeft?.type === 'wall') return false;
    if (this.coordsLeft?.type === 'box') return this.coordsLeft.canGoLeft;
    return true;
  }

  get canGoRight(): boolean {
    if (this.type === 'wall') {
      console.error(`Try to move a wall at x:${this.x}, y:${this.y}`);
      return false;
    }
    if (this.coordsRight?.type === 'wall') return false;
    if (this.coordsRight?.type === 'box') return this.coordsRight.canGoRight;
    return true;
  }
}

function getCoord(x: number, y: number) {
  return coords.find((c) => c.x === x && c.y === y);
}

function getMap() {
  const fs = require('fs');
  const data: string = fs.readFileSync('15/input.txt', 'utf8');
  const coords: Coord[] = [];
  const dirs: ('>' | '<' | '^' | 'v')[] = [];

  const map = data
    .split(/\r?\n/)
    .map((row, y) => {
      if (row.startsWith('#')) {
        const _row = row
          .replace(/\./g, '..')
          .replace(/#/g, '##')
          .replace(/O/g, 'O.')
          .replace('@', '@.');
        return _row.split('').map((char, x) => {
          if (char === '#') coords.push(new Coord(x, y, 'wall'));
          else if (char === 'O') coords.push(new Coord(x, y, 'box'));
          else if (char === '@') coords.push(new Coord(x, y, 'robot'));
          return char;
        });
      } else if (row.length > 0) {
        dirs.push(...row.split('').map((r) => r as '>' | '<' | '^' | 'v'));
      }
    })
    .filter((row) => !!row);
  const mapMaxX = Math.max(...coords.map((w) => w.x));
  const mapMaxY = Math.max(...coords.map((w) => w.y));
  return { map, mapMaxX, mapMaxY, coords, dirs };
}

function logMap(mapMaxX, mapMaxY, coords: Coord[]) {
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
            coords.some((c) => c.toString === `${x},${y}` && c.type === 'box')
          )
            return '[';
          if (
            coords.some(
              (c) => c.toString === `${x - 1},${y}` && c.type === 'box'
            )
          )
            return ']';
          if (
            coords.some((c) => c.toString === `${x},${y}` && c.type === 'robot')
          )
            return '@';
          return char;
        })
        .join('')
    );
  }
}

function goOneStep(cc: Coord, dir: '>' | '<' | '^' | 'v') {
  const _coord = getCoord(cc.x, cc.y);
  if (dir === '>' && _coord.canGoRight) _coord.goRight();
  if (dir === '<' && _coord.canGoLeft) _coord.goLeft();
  if (dir === '^' && _coord.canGoUp) _coord.goUp();
  if (dir === 'v' && _coord.canGoDown) _coord.goDown();
}

let { mapMaxX, mapMaxY, coords, dirs } = getMap();
//logMap(mapMaxX, mapMaxY, coords);

while (dirs.length > 0) {
  goOneStep(
    coords.find((c) => c.type === 'robot'),
    dirs.shift()
  );
}

const sum = coords.reduce((acc, c) => acc + c.value, 0);
console.log({ sum });
export {};
