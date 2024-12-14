import { log } from 'console';

class Robot {
  constructor(
    public x: number,
    public y: number,
    public vx: number,
    public vy: number
  ) {}
}

const fs = require('fs');

function getRobots(fileName: string) {
  const robots: Robot[] = [];
  const data: string = fs.readFileSync(fileName, 'utf8');
  data.split(/\r?\n/).forEach((row) => {
    const [x, y] = row.replace('p=', '').split(' v=')[0].split(',').map(Number);
    const [vx, vy] = row.split(' v=')[1].split(',').map(Number);
    robots.push(new Robot(x, y, vx, vy));
  });
  return robots;
}

function getCoordsAfterNbrOfSeconds(
  robot: Robot,
  nbrOfSeconds: number,
  xMax: number,
  yMax: number
) {
  robot.x = (robot.x + (robot.vx + xMax + 1) * nbrOfSeconds) % (xMax + 1);
  robot.y = (robot.y + (robot.vy + yMax + 1) * nbrOfSeconds) % (yMax + 1);
  return robot;
}

function getResultAtEnd(robotsAtEnd: Robot[], xMax: number, yMax: number) {
  const nbrOfFirstQuadrant = robotsAtEnd.filter(
    (r) => r.x < xMax / 2 && r.y < yMax / 2
  ).length;
  const nbrOfSecondQuadrant = robotsAtEnd.filter(
    (r) => r.x > xMax / 2 && r.y < yMax / 2
  ).length;
  const nbrOfThirdQuadrant = robotsAtEnd.filter(
    (r) => r.x < xMax / 2 && r.y > yMax / 2
  ).length;
  const nbrOfFourthQuadrant = robotsAtEnd.filter(
    (r) => r.x > xMax / 2 && r.y > yMax / 2
  ).length;
  return (
    nbrOfFirstQuadrant *
    nbrOfSecondQuadrant *
    nbrOfThirdQuadrant *
    nbrOfFourthQuadrant
  );
}

function logMap(robots: Robot[], xMax: number, yMax: number) {
  console.log('Map:');
  console.log([...Array(xMax + 1)].map((_) => '-').join(''));
  for (let y = 0; y < yMax + 1; y++) {
    const row = [...Array(xMax + 1)]
      .map((_, x) => {
        const robot = robots.find((r) => r.x === x && r.y === y);
        return robot ? '#' : ' ';
      })
      .join('');
    console.log(`|${row}|`);
  }
  console.log([...Array(xMax)].map((_) => '-').join(''));
}

let xMax = 100;
let yMax = 102;
let robots = getRobots('14/input.txt');
robots = robots.map((r) => getCoordsAfterNbrOfSeconds(r, 100, xMax, yMax));
console.log({ resultOf14a: getResultAtEnd(robots, xMax, yMax) });

robots = getRobots('14/input.txt');
let i = 1;
while (i < 10000000) {
  robots = robots.map((r) => getCoordsAfterNbrOfSeconds(r, 1, xMax, yMax));
  const isChristmas = robots.filter((r) => {
    const nbrOfNeighbours = robots.filter(
      (rr) => Math.abs(r.x - rr.x) <= 1 && Math.abs(r.y - rr.y) <= 1
    ).length;
    return nbrOfNeighbours >= 9;
  }).length;
  if (isChristmas > 2) {
    logMap(robots, xMax, yMax);
    console.log({ resultOf14b: i });
    i = 10000000;
  }
  i++;
}

export {};
