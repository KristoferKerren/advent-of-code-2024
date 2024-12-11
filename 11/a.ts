class Coord {
  constructor(public x: number, public y: number) {}
}

const fs = require('fs');
let stones: number[] = fs
  .readFileSync('11/input.txt', 'utf8')
  .split(' ')
  .map(Number);
const cache: Map<number, number> = new Map();

const transform = (stone: number): number[] => {
  if (stone === 0) return [1];
  const nbrOfDigits = `${stone}`.length;
  if (nbrOfDigits % 2 === 0)
    return [
      Number(`${stone}`.substring(0, nbrOfDigits / 2)),
      Number(`${stone}`.substring(nbrOfDigits / 2)),
    ];
  return [stone * 2024];
};

const transformMultiple = (stones: number[]): number[] => {
  const newStones: number[] = [];
  stones.forEach((stone) => newStones.push(...transform(stone)));
  return newStones;
};

const getNbrOfSteps = (stones: number[], steps: number): number => {
  let i = 0;
  while (i < steps) {
    stones = transformMultiple(stones);
    i++;
  }
  return stones.length;
};

console.log({ nbrOfSteps: getNbrOfSteps(stones, 25) });

export {};
