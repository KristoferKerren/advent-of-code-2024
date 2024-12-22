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
    const dirKeypadLeRi: Map<string, string> = new Map<string, string>();
    const dirKeypadUpDo: Map<string, string> = new Map<string, string>();
    const numKeypad: Map<string, string> = new Map<string, string>();

    dirKeypadLeRi.set('A-^', '<');
    dirKeypadLeRi.set('A->', 'v');
    dirKeypadLeRi.set('A-v', '<v');
    dirKeypadLeRi.set('A-<', 'v<<');
    dirKeypadLeRi.set('^-<', 'v<');
    dirKeypadLeRi.set('^->', '>v');
    dirKeypadLeRi.set('>-v', '<');
    dirKeypadLeRi.set('v-<', '<');
    dirKeypadLeRi.forEach((value, key) => {
      dirKeypadLeRi.set(getOppositeStartStop(key), getOppositeDir(value));
    });

    dirKeypadUpDo.set('A-^', '<');
    dirKeypadUpDo.set('A->', 'v');
    dirKeypadUpDo.set('A-v', 'v<');
    dirKeypadUpDo.set('A-<', 'v<<');
    dirKeypadUpDo.set('^-<', 'v<');
    dirKeypadUpDo.set('^->', 'v>');
    dirKeypadUpDo.set('>-v', '<');
    dirKeypadUpDo.set('v-<', '<');
    dirKeypadUpDo.forEach((value, key) => {
      dirKeypadUpDo.set(getOppositeStartStop(key), getOppositeDir(value));
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
    numKeypad.set('0-1', '<^');
    numKeypad.set('0-2', '^');
    numKeypad.set('0-3', '>^');
    numKeypad.set('0-4', '^^<');
    numKeypad.set('0-5', '^^');
    numKeypad.set('0-6', '>^^');
    numKeypad.set('0-7', '<^^^');
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

    return { dirKeypadLeRi, dirKeypadUpDo, numKeypad };
  }

  function getTotalAmount(arr: { amount: number; steps: string }[]) {
    return arr.reduce((acc, curr) => {
      return acc + curr.amount * curr.steps.length;
    }, 0);
  }

  export function runCode(
    code: string,
    amountOfDirRobots: number,
    numKeypad: Map<string, string>,
    dirKeypadLeRi: Map<string, string>,
    dirKeypadUpDo: Map<string, string>,
    forceNumRobotSteps: string[] = []
  ) {
    let from = 'A';
    let numRobotSteps = code.split('').map((to) => {
      let _numRobotSteps = numKeypad.get(`${from}-${to}`) + 'A';
      from = to;
      return _numRobotSteps;
    });

    if (forceNumRobotSteps?.length) {
      numRobotSteps = forceNumRobotSteps;
    }

    let previousRobotSteps = numRobotSteps.map((s) => {
      return { steps: s, amount: 1 };
    });

    for (var i = 1; i <= amountOfDirRobots; i++) {
      previousRobotSteps = previousRobotSteps
        .map((chocke) => {
          const leriStep = getFromCacheLeRi(
            chocke.steps,
            chocke.amount,
            dirKeypadLeRi
          );
          const updoStep = getFromCacheUpDo(
            chocke.steps,
            chocke.amount,
            dirKeypadUpDo
          );
          const _leRi = getTotalAmount(leriStep);
          const _upDo = getTotalAmount(updoStep);
          return _leRi <= _upDo ? leriStep : updoStep;
        })
        .flat();

      previousRobotSteps = previousRobotSteps.reduce((acc, curr) => {
        const existing = acc.find((item) => item.steps === curr.steps);
        if (existing) {
          existing.amount += curr.amount;
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
    }
    return getTotalAmount(previousRobotSteps);
  }

  const cacheLeRi = new Map<string, string[]>();
  function getFromCacheLeRi(
    key: string,
    amount: number,
    dirKeypadLeRi: Map<string, string>
  ) {
    if (cacheLeRi.has(key)) {
      return cacheLeRi.get(key).map((s) => {
        return { steps: s, amount };
      });
    }
    let from = 'A';
    let steps: string[] = key
      .split('')
      .map((to) => {
        let _dirRobotSteps =
          from === to ? 'A' : dirKeypadLeRi.get(`${from}-${to}`) + 'A';
        from = to;
        return _dirRobotSteps;
      })
      .join('')
      .match(/.*?A|.+$/g);
    cacheLeRi.set(key, steps);
    return steps.map((s) => {
      return { steps: s, amount };
    });
  }

  const cacheUpDo = new Map<string, string[]>();
  function getFromCacheUpDo(
    key: string,
    amount: number,
    dirKeypadUpDo: Map<string, string>
  ) {
    if (cacheUpDo.has(key)) {
      return cacheUpDo.get(key).map((s) => {
        return { steps: s, amount };
      });
    }
    let from = 'A';
    let steps: string[] = key
      .split('')
      .map((to) => {
        let _dirRobotSteps =
          from === to ? 'A' : dirKeypadUpDo.get(`${from}-${to}`) + 'A';
        from = to;
        return _dirRobotSteps;
      })
      .join('')
      .match(/.*?A|.+$/g);
    cacheUpDo.set(key, steps);
    return steps.map((s) => {
      return { steps: s, amount };
    });
  }

  export function run() {
    const codes = getInput();
    const { dirKeypadLeRi, dirKeypadUpDo, numKeypad } = getSteps();
    const numRobots = [
      ['<^^^A', 'vv>A', '^A', 'vvA'], // 836A
      ['<^^A', '<A', '>vvA', '>A'], // 540A
      ['^^^A', 'vA', '<A', 'vv>A'], // 965A
      ['^^<<A', '^>A', 'vvvA', '>A'], // 480A
      ['^^^<<A', '>A', '>A', 'vvvA'], // 789A
    ];
    let sum21a = 0;
    codes.forEach((code) => {
      sum21a +=
        Number(code.slice(0, -1)) *
        runCode(code, 2, numKeypad, dirKeypadLeRi, dirKeypadUpDo);
    });
    let sum21b = 0;
    codes.forEach((code, ind) => {
      sum21b +=
        Number(code.slice(0, -1)) *
        runCode(
          code,
          25,
          numKeypad,
          dirKeypadLeRi,
          dirKeypadUpDo,
          numRobots[ind]
        );
    });
    console.log({ sum21a, sum21b });
    //Mina fel svar:
    // 426277361847744
    // 425688640275264
    // 404782946131480
    // 407521640871536
  }
}
AdventOfCode21a.run();
export { AdventOfCode21a };
