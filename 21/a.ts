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
    dirKeypad.set('^->', '>v');
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
    dirKeypad: Map<string, string>,
    testThis: string = null
  ) {
    let from = 'A';
    let previousRobotSteps = code.split('').map((to) => {
      let _numRobotSteps = numKeypad.get(`${from}-${to}`) + 'A';
      from = to;
      return _numRobotSteps;
    });

    let doubleA = 0;

    for (var i = 1; i <= amountOfDirRobots; i++) {
      console.log({
        len: previousRobotSteps.length,
        previousRobotSteps,
      });

      previousRobotSteps = previousRobotSteps
        .map((chocke) => {
          return getFromCache(chocke, dirKeypad);
        })
        .flat();

      previousRobotSteps.forEach((s) => {
        if (s === 'A') {
          s = '';
          doubleA++;
        }
        while (s.includes('<<')) {
          s = s.replace('<<', '<');
          doubleA++;
        }
        while (s.includes('^^')) {
          s = s.replace('^^', '^');
          doubleA++;
        }
        while (s.includes('vv')) {
          s = s.replace('vv', 'v');
          doubleA++;
        }
        while (s.includes('>>')) {
          s = s.replace('>>', '>');
          doubleA++;
        }
      });
      previousRobotSteps.filter((s) => s.length);
    }
    // console.log({
    //   previousRobotSteps,
    //   len: previousRobotSteps.length,
    //   doubleA,
    // });
    console.log({ length: previousRobotSteps.length, doubleA });
    return previousRobotSteps.join('').length;
  }

  // 14,30, 70
  // 2: 248684
  // 10: 397725906
  const cache = new Map<string, string[]>();
  function getFromCache(key: string, dirKeypad: Map<string, string>): string[] {
    if (cache.has(key)) {
      return cache.get(key);
    }
    let from = 'A';
    let steps = key
      .split('')
      .map((to) => {
        let _dirRobotSteps =
          from === to ? 'A' : dirKeypad.get(`${from}-${to}`) + 'A';
        from = to;
        return _dirRobotSteps;
      })
      .join('')
      .match(/.*?A|.+$/g);
    cache.set(key, steps);
    return steps;
  }

  export function run() {
    const codes = getInput();
    const { dirKeypad, numKeypad } = getSteps();
    let sum21a = 0;
    //runCode(codes[0], 3, numKeypad, dirKeypad);
    // console.log(getFromCache('<', dirKeypad));
    // runCode(codes[0], 6, numKeypad, dirKeypad);
    // console.log(getFromCache('^', dirKeypad));
    // runCode(codes[0], 3, numKeypad, dirKeypad, '>');
    // console.log(getFromCache('>', dirKeypad));
    // runCode(codes[0], 3, numKeypad, dirKeypad, 'v');
    // console.log(getFromCache('v', dirKeypad));
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
