namespace AdventOfCode24 {
  function getInput(filename: string) {
    const fs = require('fs');
    const wires: Map<string, boolean> = new Map();
    const wireConnections: string[][] = [];
    const data: string = fs.readFileSync(filename, 'utf8');
    data.split(/\r?\n/).forEach((row) => {
      if (row.includes(':')) {
        const [wire, value] = row.split(': ');
        wires.set(wire, value === '1');
      } else if (row.includes('->')) {
        const values = row.split(' ');
        wireConnections.push([values[0], values[1], values[2], values[4]]);
      }
    });
    return { wires, wireConnections };
  }

  function getResultOfWiresStartingWithZ(): number {
    const _wires = Array.from(wires.entries()).filter(([key, value]) =>
      key.startsWith('z')
    );
    const _wiresOrdered = _wires
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map((w) => (w[1] ? '1' : '0'))
      .join('');
    return parseInt(_wiresOrdered, 2);
  }

  function runWiresProgram(wires: Map<string, boolean>) {
    let allFound = false;
    while (!allFound) {
      allFound = true;
      wireConnections.forEach((connection) => {
        const [wire1, op, wire2, wire3] = connection;
        if (wires.get(wire1) === undefined || wires.get(wire2) === undefined) {
          allFound = false;
          return;
        }
        if (op === 'AND') {
          wires.set(wire3, wires.get(wire1) && wires.get(wire2));
        } else if (op === 'OR') {
          wires.set(wire3, wires.get(wire1) || wires.get(wire2));
        } else if (op === 'XOR') {
          wires.set(wire3, wires.get(wire1) !== wires.get(wire2));
        }
      });
    }
  }

  const isFaulty = (connection: string[]) => {
    const isZButNotXor =
      connection[1] !== 'XOR' &&
      connection[3].startsWith('z') &&
      connection[3] !== lastZ;
    const isXORButNotXYZ =
      connection[1] === 'XOR' &&
      !connection[3].startsWith('z') &&
      !connection[0].startsWith('x') &&
      !connection[0].startsWith('y') &&
      !connection[2].startsWith('x') &&
      !connection[2].startsWith('y');
    if (isZButNotXor || isXORButNotXYZ) {
      return true;
    }
    const isFirstXOrY =
      (connection[0] === firstX || connection[0] === firstY) &&
      (connection[2] === firstX || connection[2] === firstY);
    if (isFirstXOrY) {
      return false;
    }
    const isXORAndXYButOutputIsNotXORInput =
      connection[1] === 'XOR' &&
      (connection[0].startsWith('x') || connection[0].startsWith('y')) &&
      (connection[2].startsWith('x') || connection[2].startsWith('y')) &&
      !wireConnections.some(
        (wc) =>
          wc[1] === 'XOR' &&
          (wc[0] === connection[3] || wc[2] === connection[3])
      );
    const isAndButOutputIsNotORInput =
      connection[1] === 'AND' &&
      !wireConnections.some(
        (wc) =>
          wc[1] === 'OR' && (wc[0] === connection[3] || wc[2] === connection[3])
      );
    if (isXORAndXYButOutputIsNotXORInput || isAndButOutputIsNotORInput) {
      return true;
    }
    return false;
  };
  const { wires, wireConnections } = getInput('24/input.txt');
  runWiresProgram(wires);
  const lastZ = wireConnections
    .map((w) => w[3])
    .filter((w) => w.startsWith('z'))
    .sort()
    .at(-1);
  const firstX = wireConnections
    .map((w) => [w[0], w[1]])
    .flat()
    .filter((w) => w.startsWith('x'))
    .sort()
    .at(0);
  const firstY = wireConnections
    .map((w) => [w[0], w[1]])
    .flat()
    .filter((w) => w.startsWith('y'))
    .sort()
    .at(0);

  const res24a = getResultOfWiresStartingWithZ();
  const res24b = wireConnections
    .filter(isFaulty)
    .map((c) => c[3])
    .sort()
    .join(',');

  console.log({ res24a, res24b });
}

export { AdventOfCode24 };
