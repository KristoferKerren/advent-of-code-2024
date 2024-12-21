namespace AdventOfCode21a {
  function getInput(isStart: boolean = false): string[] {
    if (isStart) return ['029A', '980A', '179A', '456A', '379A'];
    return ['836A', '540A', '965A', '480A', '789A'];
  }

  function getOppositeStartStop(startStop: string) {
    const [start, stop] = startStop.split('-');
    return `${stop}-${start}`;
  }

  function getOppositeDir(dir: string) {
    return dir
      .split('')
      .reverse()
      .map((d) => {
        if (d === '^') return 'v';
        if (d === 'v') return '^';
        if (d === '<') return '>';
        if (d === '>') return '<';
      })
      .join('');
  }

  //^ (up) < (left) / v (down) / > (right)
  function getSteps() {
    const dirKeypad: Map<string, string> = new Map<string, string>();
    const numKeypad: Map<string, string> = new Map<string, string>();

    dirKeypad.set('A-^', '<');
    dirKeypad.set('A->', 'v');
    dirKeypad.set('A-v', '<v');
    dirKeypad.set('A-<', 'v<<');
    dirKeypad.set('^-<', 'v<');
    dirKeypad.set('^-v', 'v');
    dirKeypad.set('^->', '>v');
    dirKeypad.set('>-<', '<<');
    dirKeypad.set('>-v', '<');
    dirKeypad.set('v-<', '<');
    dirKeypad.forEach((value, key) => {
      dirKeypad.set(getOppositeStartStop(key), getOppositeDir(value));
    });

    numKeypad.set('A-0', '<');
    numKeypad.set('A-1', '^<<');
    numKeypad.set('A-2', '<^');
    numKeypad.set('A-3', '^');
    numKeypad.set('A-4', '^^<<');
    numKeypad.set('A-5', '<^^');
    numKeypad.set('A-6', '^^');
    numKeypad.set('A-7', '^^^<<');
    numKeypad.set('A-8', '<^^^');
    numKeypad.set('A-9', '^^^');
    numKeypad.set('0-1', '^<');
    numKeypad.set('0-2', '^');
    numKeypad.set('0-3', '>^');
    numKeypad.set('0-4', '^^<');
    numKeypad.set('0-5', '^^');
    numKeypad.set('0-6', '>^^');
    numKeypad.set('0-7', '^^^<');
    numKeypad.set('0-8', '^^^');
    numKeypad.set('0-9', '>^^^');
    numKeypad.set('1-2', '>');
    numKeypad.set('1-3', '>>');
    numKeypad.set('1-4', '^');
    numKeypad.set('1-5', '>^');
    numKeypad.set('1-6', '>>^');
    numKeypad.set('1-7', '^^');
    numKeypad.set('1-8', '>^^');
    numKeypad.set('1-9', '>>^^');
    numKeypad.set('2-3', '>');
    numKeypad.set('2-4', '<^');
    numKeypad.set('2-5', '^');
    numKeypad.set('2-6', '>^');
    numKeypad.set('2-7', '<^^');
    numKeypad.set('2-8', '^^');
    numKeypad.set('2-9', '>^^');
    numKeypad.set('3-4', '<<^');
    numKeypad.set('3-5', '<^');
    numKeypad.set('3-6', '^');
    numKeypad.set('3-7', '<<^^');
    numKeypad.set('3-8', '<^^');
    numKeypad.set('3-9', '^^');
    numKeypad.set('4-5', '>');
    numKeypad.set('4-6', '>>');
    numKeypad.set('4-7', '^');
    numKeypad.set('4-8', '>^');
    numKeypad.set('4-9', '>>^');
    numKeypad.set('5-6', '>');
    numKeypad.set('5-7', '<^');
    numKeypad.set('5-8', '^');
    numKeypad.set('5-9', '>^');
    numKeypad.set('6-7', '<<^');
    numKeypad.set('6-8', '<^');
    numKeypad.set('6-9', '^');
    numKeypad.set('7-8', '>');
    numKeypad.set('7-9', '>>');
    numKeypad.set('8-9', '>');
    numKeypad.forEach((value, key) => {
      numKeypad.set(getOppositeStartStop(key), getOppositeDir(value));
    });

    return { dirKeypad, numKeypad };
  }

  export function runCode(
    code: string,
    amountOfDirRobots: number,
    numKeypad: Map<string, string>,
    dirKeypad: Map<string, string>
  ) {
    let numRobotPos = 'A';
    let numRobotSteps: string = code
      .split('')
      .map((c) => {
        let _numRobotSteps = numKeypad.get(`${numRobotPos}-${c}`) + 'A';
        numRobotPos = c;
        return _numRobotSteps;
      })
      .join('');
    let previousRobotSteps = numRobotSteps;
    const dirRobotsSteps: string[] = new Array(amountOfDirRobots).fill('');
    let dirRobotsPos = new Array(amountOfDirRobots).fill('A');
    for (var i = 0; i < amountOfDirRobots; i++) {
      let currRobotSteps: string = previousRobotSteps
        .split('')
        .map((c, ind) => {
          let from = dirRobotsPos[i];
          let to = c;
          let _dirRobotSteps =
            from === to ? 'A' : dirKeypad.get(`${dirRobotsPos[i]}-${c}`) + 'A';
          dirRobotsPos[i] = c;
          return _dirRobotSteps;
        })
        .join('');
      dirRobotsSteps[i] = currRobotSteps;
      previousRobotSteps = currRobotSteps;
    }
    return previousRobotSteps.length;
  }

  export function run() {
    const codes = getInput();
    const { dirKeypad, numKeypad } = getSteps();
    let sum21a = 0;
    codes.forEach((code) => {
      sum21a +=
        Number(code.slice(0, -1)) * runCode(code, 2, numKeypad, dirKeypad);
    });
    let sum21b = 0;
    // codes.forEach((code) => {
    //   sum21b +=
    //     Number(code.slice(0, -1)) * runCode(code, 25, numKeypad, dirKeypad);
    // });
    console.log({ sum21a, sum21b });
  }
}
AdventOfCode21a.run();
export { AdventOfCode21a };
