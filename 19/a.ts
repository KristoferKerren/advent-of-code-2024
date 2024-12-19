namespace AdventOfCode19a {
  function readInput() {
    const fs = require('fs');
    const data: string = fs.readFileSync('19/input.txt', 'utf8');

    let patterns: string[] = [];
    let towels: string[];
    data.split(/\r?\n/).forEach((row, ind) => {
      if (ind === 0) towels = row.split(', ');
      else if (row.length > 0) {
        patterns.push(row);
      }
    });
    return { towels, patterns };
  }

  export function isPossible(pattern: string, towels: string[]): boolean {
    let potential: string[] = [];
    towels.forEach((towel) => {
      if (pattern.startsWith(towel)) potential.push(towel);
    });
    while (potential.length > 0) {
      let current = potential.shift();
      if (current === pattern) return true;
      towels.forEach((towel) => {
        if (pattern.startsWith(current + towel))
          potential.push(current + towel);
      });
      potential = [...new Set(potential)];
    }
    return false;
  }

  function joinDuplicatePatterns(
    potential: { currPatt: string; nbrOfCases: number }[]
  ): { currPatt: string; nbrOfCases: number }[] {
    let potentialCopy = [...potential];
    const newPotential = [];
    while (potentialCopy.length > 0) {
      let currPatter = potentialCopy[0].currPatt;
      let nbrOfCases = potentialCopy
        .filter((p) => p.currPatt === currPatter)
        .reduce((acc, a) => acc + a.nbrOfCases, 0);
      newPotential.push({ currPatt: currPatter, nbrOfCases });
      potentialCopy = potentialCopy.filter((p) => p.currPatt !== currPatter);
    }
    return newPotential;
  }

  export function getNbrOfCombinations(
    pattern: string,
    towels: string[]
  ): number {
    let count = 0;
    let potential: { currPatt: string; nbrOfCases: number }[] = [];
    towels.forEach((towel) => {
      if (pattern.startsWith(towel))
        potential.push({ currPatt: towel, nbrOfCases: 1 });
    });
    while (potential.length > 0) {
      let current = potential.shift();
      if (current.currPatt === pattern) {
        count += current.nbrOfCases;
        continue;
      }
      towels.forEach((towel) => {
        if (pattern.startsWith(current.currPatt + towel))
          potential.push({
            currPatt: current.currPatt + towel,
            nbrOfCases: current.nbrOfCases,
          });
      });
      potential = joinDuplicatePatterns(potential);
    }
    return count;
  }

  function run() {
    const { towels, patterns } = readInput();
    let res19a = 0;
    let res19b = 0;
    patterns.forEach((pattern) => {
      const nbrOfComb = getNbrOfCombinations(pattern, towels);
      if (nbrOfComb > 0) res19a++;
      res19b += nbrOfComb;
    });
    console.log({ res19a, res19b });
  }

  run();
}

export { AdventOfCode19a };
