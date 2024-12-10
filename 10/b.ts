class Coord {
  constructor(public x: number, public y: number) {}
}

const fs = require('fs');
const data: string = fs.readFileSync('10/input.txt', 'utf8');

function getMap() {
  const zeroCoords: Coord[] = [];
  const map = data.split(/\r?\n/).map((row, y) =>
    row.split('').map((char, x) => {
      if (char === '0') {
        zeroCoords.push(new Coord(x, y));
      }
      return Number(char);
    })
  );
  const mapMaxX = map.length - 1;
  const mapMaxY = map[0].length - 1;
  return { map, mapMaxX, mapMaxY, zeroCoords };
}

const { map, zeroCoords } = getMap();

function getValue(map, x, y): number | null {
  if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) {
    return null;
  }
  return map[y][x];
}

function getSurroundingCoords(coord: Coord, number: number): Coord[] {
  const res: Coord[] = [];
  if (getValue(map, coord.x + 1, coord.y) === number)
    res.push(new Coord(coord.x + 1, coord.y));
  if (getValue(map, coord.x - 1, coord.y) === number)
    res.push(new Coord(coord.x - 1, coord.y));
  if (getValue(map, coord.x, coord.y + 1) === number)
    res.push(new Coord(coord.x, coord.y + 1));
  if (getValue(map, coord.x, coord.y - 1) === number)
    res.push(new Coord(coord.x, coord.y - 1));
  return res;
}

function getNbrOfTrailHeads(currentNumber: number, currentCoords: Coord[]) {
  if (currentNumber === 9) {
    return currentCoords.length;
  }
  let nextNumber = currentNumber + 1;
  const nextCoords: Coord[] = [];
  currentCoords.forEach((coord) => {
    getSurroundingCoords(coord, nextNumber).forEach((surroundingCoord) => {
      nextCoords.push(surroundingCoord);
    });
  });
  return getNbrOfTrailHeads(nextNumber, nextCoords);
}

let nbrOfTrailHeads: number = 0;
zeroCoords.forEach((coord) => {
  nbrOfTrailHeads += getNbrOfTrailHeads(0, [coord]);
});

console.log({ nbrOfTrailHeads });

export {};
