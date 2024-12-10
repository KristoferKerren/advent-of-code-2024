class Coord {
  constructor(public x: number, public y: number) {}
}

const fs = require('fs');
const data: string = fs.readFileSync('8/8-input.txt', 'utf8');

function getMap() {
  const map = data.split(/\r?\n/).map((row) => row.split(''));
  const mapMaxX = map.length - 1;
  const mapMaxY = map[0].length - 1;
  return { map, mapMaxX, mapMaxY };
}

function getValue(map, x, y): number | null {
  if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) {
    return null;
  }
  return map[y][x];
}

function logMap(map: number[][]) {
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

const nodeCoords: Map<string, Coord[]> = new Map();
const { map, mapMaxX, mapMaxY } = getMap();
map.forEach((row, y) => {
  row.forEach((node, x) => {
    if (node === '.') {
      return;
    }
    if (!nodeCoords.has(node)) {
      nodeCoords.set(node, [new Coord(x, y)]);
    } else {
      nodeCoords.get(node).push(new Coord(x, y));
    }
  });
});

const getAntiNodes = (coords: Coord[], mapMaxX, mapMaxY): Coord[] => {
  const isOk = (x, y) => {
    return x >= 0 && y >= 0 && x <= mapMaxX && y <= mapMaxY;
  };
  const deltaX = coords[1].x - coords[0].x;
  const deltaY = coords[1].y - coords[0].y;
  let [x1, y1] = [coords[0].x - deltaX, coords[0].y - deltaY];
  let [x2, y2] = [coords[0].x + 2 * deltaX, coords[0].y + 2 * deltaY];
  const _coords: Coord[] = [];
  if (isOk(x1, y1)) _coords.push(new Coord(x1, y1));
  if (isOk(x2, y2)) _coords.push(new Coord(x2, y2));
  return _coords;
};

const antiNodes: Set<string> = new Set();

nodeCoords.forEach((coords, node) => {
  let _antiNodes: Coord[];
  for (var i = 0; i < coords.length; i++) {
    for (var j = i + 1; j < coords.length; j++) {
      _antiNodes = getAntiNodes([coords[i], coords[j]], mapMaxX, mapMaxY);
      _antiNodes.forEach((coord) => antiNodes.add(`${coord.x},${coord.y}`));
    }
  }
});
console.log(antiNodes.size);

export {};
