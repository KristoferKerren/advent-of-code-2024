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
    const dirKeypadOptions1: Map<string, string> = new Map<string, string>();
    dirKeypadOptions1.set('A-^', '<');
    dirKeypadOptions1.set('A->', 'v');
    dirKeypadOptions1.set('A-v', '<v'); //'v<');
    dirKeypadOptions1.set('A-<', 'v<<');
    dirKeypadOptions1.set('^-<', 'v<');
    dirKeypadOptions1.set('^->', '>v'); //'v>');
    dirKeypadOptions1.set('>-v', '<');
    dirKeypadOptions1.set('v-<', '<');
    dirKeypadOptions1.set('^-A', '>');
    dirKeypadOptions1.set('>-A', '^');
    dirKeypadOptions1.set('v-A', '^>'); //'>^');
    dirKeypadOptions1.set('<-A', '>>^');
    dirKeypadOptions1.set('<-^', '>^');
    dirKeypadOptions1.set('>-^', '^<'); //'<^');
    dirKeypadOptions1.set('v->', '>');
    dirKeypadOptions1.set('<-v', '>');

    const dirKeypadOptions2: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions3: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions4: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions5: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions6: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions7: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions8: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions9: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions10: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions11: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions12: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions13: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions14: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions15: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    const dirKeypadOptions16: Map<string, string> = new Map<string, string>(
      dirKeypadOptions1
    );
    dirKeypadOptions2.set('A-v', 'v<');
    dirKeypadOptions3.set('^->', 'v>');
    dirKeypadOptions4.set('v-A', '>^');
    dirKeypadOptions5.set('>-^', '<^');

    dirKeypadOptions6.set('A-v', 'v<');
    dirKeypadOptions6.set('^->', 'v>');

    dirKeypadOptions7.set('A-v', 'v<');
    dirKeypadOptions7.set('v-A', '>^');

    dirKeypadOptions8.set('A-v', 'v<');
    dirKeypadOptions8.set('>-^', '<^');

    dirKeypadOptions9.set('^->', 'v>');
    dirKeypadOptions9.set('>-^', '<^');

    dirKeypadOptions10.set('^->', 'v>');
    dirKeypadOptions10.set('v-A', '>^');

    dirKeypadOptions11.set('v-A', '>^');
    dirKeypadOptions11.set('>-^', '<^');

    dirKeypadOptions12.set('A-v', 'v<');
    dirKeypadOptions12.set('^->', 'v>');
    dirKeypadOptions12.set('v-A', '>^');

    dirKeypadOptions13.set('A-v', 'v<');
    dirKeypadOptions13.set('^->', 'v>');
    dirKeypadOptions13.set('>-^', '<^');

    dirKeypadOptions14.set('A-v', 'v<');
    dirKeypadOptions14.set('v-A', '>^');
    dirKeypadOptions14.set('>-^', '<^');

    dirKeypadOptions15.set('^->', 'v>');
    dirKeypadOptions15.set('v-A', '>^');
    dirKeypadOptions15.set('>-^', '<^');

    dirKeypadOptions16.set('A-v', 'v<');
    dirKeypadOptions16.set('^->', 'v>');
    dirKeypadOptions16.set('v-A', '>^');
    dirKeypadOptions16.set('>-^', '<^');

    return [
      dirKeypadOptions1,
      dirKeypadOptions2,
      dirKeypadOptions3,
      dirKeypadOptions4,
      dirKeypadOptions5,
      dirKeypadOptions6,
      dirKeypadOptions7,
      dirKeypadOptions8,
      dirKeypadOptions9,
      dirKeypadOptions10,
      dirKeypadOptions11,
      dirKeypadOptions12,
      dirKeypadOptions13,
      dirKeypadOptions14,
      dirKeypadOptions15,
      dirKeypadOptions16,
    ];
  }

  function getTotalAmount(arr: { amount: number; steps: string }[]) {
    return arr.reduce((acc, curr) => {
      return acc + curr.amount * curr.steps.length;
    }, 0);
  }

  export function runCode(
    amountOfDirRobots: number,
    dirKeypad: Map<string, string>,
    numRobotSteps: string[] = []
  ) {
    numRobotSteps = numRobotSteps;
    let previousRobotSteps = numRobotSteps.map((s) => {
      return { steps: s, amount: 1 };
    });

    for (var i = 1; i <= amountOfDirRobots; i++) {
      previousRobotSteps = previousRobotSteps
        .map((chocke) => {
          return getFromCacheLeRi(chocke.steps, chocke.amount, dirKeypad);
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

  let cacheLeRi = new Map<string, string[]>();
  function getFromCacheLeRi(
    key: string,
    amount: number,
    dirKeypad: Map<string, string>
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
          from === to ? 'A' : dirKeypad.get(`${from}-${to}`) + 'A';
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

  export function run() {
    const codes = getInput();
    const dirKeypads = getSteps();
    const numRobotSteps = [
      // 836A
      [
        ['<^^^A', 'vv>A', '^A', 'vvA'],
        ['<^^^A', '>vvA', '^A', 'vvA'],
        ['^^^<A', 'vv>A', '^A', 'vvA'],
        ['^^^<A', '>vvA', '^A', 'vvA'],
      ],
      // 540A
      [
        ['<^^A', '<A', '>vvA', '>A'],
        ['^^<A', '<A', '>vvA', '>A'],
      ],
      // 965A
      [
        ['^^^A', 'vA', '<A', 'vv>A'],
        ['^^^A', 'vA', '<A', '>vvA'],
      ],
      // 480A
      [
        ['^^<<A', '>^A', 'vvvA', '>A'],
        ['<^^<A', '>^A', 'vvvA', '>A'],
        ['^^<<A', '^>A', 'vvvA', '>A'],
      ],
      // 789A
      [
        ['^^^<<A', '>A', '>A', 'vvvA'],
        ['<^^^<A', '>A', '>A', 'vvvA'],
      ],
    ];
    const minClicks21a = numRobotSteps.map((steps) => {
      const buttonClicks = steps.map((s) => {
        return runCode(2, dirKeypads[0], s);
      });
      return Math.min(...buttonClicks);
    });
    let sum21a = minClicks21a.reduce(
      (acc, curr, ind) => acc + Number(codes[ind].slice(0, -1)) * curr,
      0
    );

    const minClicks21b = numRobotSteps.map((steps) => {
      let _minClicks21b: number = 999999999999999;
      dirKeypads.forEach((dirKeypad) => {
        const buttonClicks = steps.map((s) => {
          const runCodeRes = runCode(25, dirKeypad, s);
          cacheLeRi = new Map<string, string[]>(); // Clear cache
          return runCodeRes;
        });
        _minClicks21b = Math.min(_minClicks21b, Math.min(...buttonClicks));
      });
      return _minClicks21b;
    });
    console.log({ minClicks21b });
    let sum21b = minClicks21b.reduce(
      (acc, curr, ind) => acc + Number(codes[ind].slice(0, -1)) * curr,
      0
    );

    console.log({ sum21a, sum21b });
    //Mina fel svar:
    // 426277361847744
    // 425688640275264
    // 404782946131480
    // 407521640871536
    // 364644222998880
    // 364485993501600
    // 361504925903280
    // 361346696406000
    // 349738773993670
    // 307055584161760
  }
}
AdventOfCode21a.run();
export { AdventOfCode21a };
