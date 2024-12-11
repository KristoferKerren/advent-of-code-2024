class Stones {
  constructor(public val: number, public amount: number = 1) {}
}

const fs = require('fs');
let stones: Stones[] = fs
  .readFileSync('11/input.txt', 'utf8')
  .split(' ')
  .map((v) => new Stones(Number(v)));
//const cache: Map<number, number> = new Map();

const transform = (stoneVal: number): number[] => {
  if (stoneVal === 0) return [1];
  const nbrOfDigits = `${stoneVal}`.length;
  if (nbrOfDigits % 2 === 0)
    return [
      Number(`${stoneVal}`.substring(0, nbrOfDigits / 2)),
      Number(`${stoneVal}`.substring(nbrOfDigits / 2)),
    ];
  return [stoneVal * 2024];
};

const transformMultiple = (stones: Stones[]): Stones[] => {
  const newStones: Stones[] = [];
  stones.forEach((stone) =>
    transform(stone.val).forEach((v) => {
      const existing = newStones.find((s) => s.val === v);
      if (existing) existing.amount += stone.amount;
      else newStones.push(new Stones(v, stone.amount));
    })
  );
  return newStones;
};

const getNbrOfSteps = (stones: Stones[], steps: number) => {
  let i = 0;
  while (i < steps) {
    stones = transformMultiple(stones);
    i++;
    if (i === 25) printNbrOfSteps(stones, 'Day 11-1');
    if (i === 75) printNbrOfSteps(stones, 'Day 11-2');
  }
};

const printNbrOfSteps = (stones: Stones[], description: string): void => {
  console.log({
    description,
    nbrOfSteps: stones.map((s) => s.amount).reduce((a, b) => a + b, 0),
  });
};

getNbrOfSteps(stones, 75);

export {};
