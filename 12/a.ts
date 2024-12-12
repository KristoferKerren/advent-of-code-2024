class Coord {
  constructor(
    public x: number,
    public y: number,
    public value: string,
    public fences: number
  ) {}
}

const fs = require('fs');

function getMap(fileName: string) {
  const data: string = fs.readFileSync(fileName, 'utf8');
  const map = data.split(/\r?\n/).map((row, y) => row.split(''));
  const coords: Coord[] = [];
  map.forEach((row, y) =>
    row.forEach((cell, x) => {
      const coord = new Coord(x, y, cell, 0);
      if (map[y][x + 1] !== cell) coord.fences++;
      if (map[y][x - 1] !== cell) coord.fences++;
      if (!map[y + 1] || !map[y - 1]) coord.fences++;
      if (map[y + 1] && map[y + 1][x] !== cell) coord.fences++;
      if (map[y - 1] && map[y - 1][x] !== cell) coord.fences++;
      coords.push(coord);
    })
  );
  const mapMaxX = map.length - 1;
  const mapMaxY = map[0].length - 1;
  return { map, mapMaxX, mapMaxY, coords };
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

const getFirstRegion = (map: string[][], coords: Coord[]): Coord[] => {
  let startCoord = coords.find((c) => c.value !== '.');
  if (!startCoord) return null;
  const regionMap = new Map<string, Coord>();
  regionMap.set(`${startCoord.x},${startCoord.y}`, startCoord);
  let areaBefore = 0;
  while (areaBefore !== regionMap.size) {
    areaBefore = regionMap.size;
    for (const coord of Array.from(regionMap.values())) {
      const neighbors = [
        { x: coord.x + 1, y: coord.y },
        { x: coord.x - 1, y: coord.y },
        { x: coord.x, y: coord.y + 1 },
        { x: coord.x, y: coord.y - 1 },
      ];
      neighbors.forEach(({ x, y }) => {
        if (
          map[y] &&
          map[y][x] === startCoord.value &&
          !regionMap.has(`${x},${y}`)
        ) {
          regionMap.set(
            `${x},${y}`,
            coords.find((c) => c.x === x && c.y === y)
          );
        }
      });
    }
  }
  const regions = Array.from(regionMap.values());
  regions.forEach((r) => (r.value = '.'));
  return regions;
};

const getPrice = (fileName: string) => {
  const { map, coords } = getMap(fileName);
  let region = getFirstRegion(map, coords);
  let sum = 0;
  while (region) {
    const area = region.length;
    const fences = region.reduce((acc, curr) => acc + curr.fences, 0);
    sum += area * fences;
    region = getFirstRegion(map, coords);
  }
  return sum;
};

console.log(getPrice('12/input-test-1.txt'));
console.log(getPrice('12/input-test-2.txt'));
console.log(getPrice('12/input-test-3.txt'));
console.log(getPrice('12/input.txt'));

export {};
