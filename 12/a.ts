class Coord {
  constructor(
    public x: number,
    public y: number,
    public value: string,
    public horizontalFences: string[] = [],
    public verticalFences: string[] = []
  ) {}

  get nbrOfFences() {
    return this.horizontalFences.length + this.verticalFences.length;
  }
}

const fs = require('fs');

function getMap(fileName: string) {
  const data: string = fs.readFileSync(fileName, 'utf8');
  const map = data.split(/\r?\n/).map((row, y) => row.split(''));
  const coords: Coord[] = [];
  map.forEach((row, y) =>
    row.forEach((value, x) => {
      const coord = new Coord(x, y, value);
      const leftNeighbor = map[y][x - 1];
      const rightNeighbor = map[y][x + 1];
      const topNeighbor = map[y - 1] && map[y - 1][x];
      const bottomNeighbor = map[y + 1] && map[y + 1][x];
      if (leftNeighbor !== value) coord.verticalFences.push(`${x - 1},${y}`);
      if (rightNeighbor !== value) coord.verticalFences.push(`${x},${y}`);
      if (topNeighbor !== value) coord.horizontalFences.push(`${x},${y - 1}`);
      if (bottomNeighbor !== value) coord.horizontalFences.push(`${x},${y}`);
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
  let priceSumA = 0;
  let priceSumB = 0;
  while (region) {
    const area = region.length;
    const fences = region.reduce((acc, curr) => acc + curr.nbrOfFences, 0);
    const horizontalFences = region.map((c) => c.horizontalFences).flat();
    const verticalFences = region.map((c) => c.verticalFences).flat();
    const corners = horizontalFences.reduce((acc, hf) => {
      const [x, y] = hf.split(',').map(Number);
      let corners = 0;
      if (verticalFences.includes(`${x - 1},${y}`)) corners++;
      else if (verticalFences.includes(`${x - 1},${y + 1}`)) corners++;
      if (verticalFences.includes(`${x},${y}`)) corners++;
      else if (verticalFences.includes(`${x},${y + 1}`)) corners++;
      return acc + corners;
    }, 0);
    priceSumA += area * fences;
    priceSumB += area * corners;
    region = getFirstRegion(map, coords);
  }
  return { priceSumA, priceSumB };
};

if (getPrice('12/input-test-1.txt').priceSumA !== 140)
  console.error('Test 1 failed');
if (getPrice('12/input-test-2.txt').priceSumA !== 772)
  console.error('Test 2 failed');
if (getPrice('12/input-test-3.txt').priceSumA !== 1930)
  console.error('Test 3 failed');
if (getPrice('12/input-test-1.txt').priceSumB !== 80)
  console.error('Test 4 failed');
if (getPrice('12/input-test-2.txt').priceSumB !== 436)
  console.error('Test 5 failed');
if (getPrice('12/input-test-3.txt').priceSumB !== 1206)
  console.error('Test 6 failed');
if (getPrice('12/input-test-4.txt').priceSumB !== 236)
  console.error('Test 7 failed');
if (getPrice('12/input-test-5.txt').priceSumB !== 368)
  console.error('Test 8 failed');

console.log(getPrice('12/input.txt'));

export {};
