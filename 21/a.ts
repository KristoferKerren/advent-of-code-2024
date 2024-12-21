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
    numKeypad: Map<string, string>,
    dirKeypad: Map<string, string>
  ) {
    const numRobotSteps: string[] = [];
    const dirRobot1Steps: string[] = [];
    const dirRobot2Steps: string[] = [];
    let numRobotPos = 'A';
    let dirRobot1Pos = 'A';
    let dirRobot2Pos = 'A';
    code.split('').forEach((c) => {
      let _numRobotSteps = numKeypad.get(`${numRobotPos}-${c}`) + 'A';
      numRobotSteps.push(_numRobotSteps);
      numRobotPos = c;
      _numRobotSteps.split('').forEach((s) => {
        let _dirRobot1Steps =
          dirRobot1Pos === s
            ? 'A'
            : dirKeypad.get(`${dirRobot1Pos}-${s}`) + 'A';
        dirRobot1Steps.push(_dirRobot1Steps);
        dirRobot1Pos = s;
        _dirRobot1Steps.split('').forEach((d) => {
          let _dirRobot2Steps =
            dirRobot2Pos === d
              ? 'A'
              : dirKeypad.get(`${dirRobot2Pos}-${d}`) + 'A';
          dirRobot2Steps.push(_dirRobot2Steps);
          dirRobot2Pos = d;
        });
      });
    });
    return dirRobot2Steps.join('').length;
  }

  export function run() {
    const codes = getInput();
    const { dirKeypad, numKeypad } = getSteps();
    let sum = 0;
    codes.forEach((code) => {
      const amount = runCode(code, numKeypad, dirKeypad);
      console.log({ code, amount });
      sum += Number(code.slice(0, -1)) * amount;
    });
    console.log(sum);
  }
}
AdventOfCode21a.run();
export { AdventOfCode21a };
