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

function logMap(map: string[][]) {
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
  const _coords: Coord[] = [];
  let [x, y] = [coords[0].x, coords[0].y];
  while (isOk(x, y)) {
    _coords.push(new Coord(x, y));
    [x, y] = [x - deltaX, y - deltaY];
  }
  [x, y] = [coords[0].x + deltaX, coords[0].y + deltaY];
  while (isOk(x, y)) {
    _coords.push(new Coord(x, y));
    [x, y] = [x + deltaX, y + deltaY];
  }
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
