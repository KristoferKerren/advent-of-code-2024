namespace AdventOfCode23 {
  function getInput(filename: string): Map<string, string[]> {
    const fs = require('fs');
    const map: Map<string, string[]> = new Map();
    const data: string = fs.readFileSync(filename, 'utf8');
    data.split(/\r?\n/).forEach((row) => {
      const [num1, num2] = row.split('-');
      if (map.has(num1)) {
        map.get(num1).push(num2);
      } else {
        map.set(num1, [num2]);
      }
      if (map.has(num2)) {
        map.get(num2).push(num1);
      } else {
        map.set(num2, [num1]);
      }
    });
    return map;
  }

  const checkIfHasComputers = (comp1, comp2, comp3) => {
    if (input.has(comp1) && input.has(comp2) && input.has(comp3)) {
      return (
        input.get(comp1).includes(comp2) &&
        input.get(comp1).includes(comp3) &&
        input.get(comp2).includes(comp1) &&
        input.get(comp2).includes(comp3) &&
        input.get(comp3).includes(comp1) &&
        input.get(comp3).includes(comp2)
      );
    }
    return false;
  };

  const countCommonElements = (arr1: string[], arr2: string[]): number => {
    return arr1.filter((element) => arr2.includes(element)).length;
  };

  const input = getInput('23/input.txt');
  const trios: Set<string> = new Set();
  input.forEach((v, first) => {
    for (var i1 = 0; i1 < v.length; i1++) {
      for (var i2 = i1 + 1; i2 < v.length; i2++) {
        const second = v[i1];
        const third = v[i2];
        if (
          checkIfHasComputers(first, second, third) &&
          (first.startsWith('t') ||
            second.startsWith('t') ||
            third.startsWith('t'))
        ) {
          trios.add([first, second, third].sort().join('-'));
        }
      }
    }
  });
  let currestLongest: string[] = [];
  input.forEach((v, first) => {
    const merged = new Set([...v, first]);
    const compConnections = v.map((vv) => new Set([vv, ...input.get(vv)]));

    let isFound = Array.from(merged).every((m) =>
      compConnections.every((c) => c.has(m))
    );

    while (!isFound) {
      let minIndex = -1;
      let minValue = Infinity;

      compConnections.forEach((c, i) => {
        const amount = Array.from(merged).filter((m) => c.has(m)).length;
        if (amount < minValue) {
          minIndex = i;
          minValue = amount;
        }
      });

      if (minIndex !== -1) {
        merged.delete(Array.from(merged)[minIndex]);
        compConnections.splice(minIndex, 1);
      } else {
        break;
      }

      isFound = Array.from(merged).every((m) =>
        compConnections.every((c) => c.has(m))
      );
    }

    if (Array.from(merged).length > currestLongest.length) {
      currestLongest = Array.from(merged);
    }
  });

  console.log({ Day23a: trios.size, day23b: currestLongest.sort().join(',') });
}

export { AdventOfCode23 };
