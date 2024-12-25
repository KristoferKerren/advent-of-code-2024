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
        wireConnections.push([values[0], values[1], values[2], values.at(-1)]);
      }
    });
    return { wires, wireConnections };
  }

  function getResultOfWiresStartingWith(start: string): number {
    const _wires = Array.from(wires.entries()).filter(([key, value]) =>
      key.startsWith(start)
    );
    const _wiresOrdered = _wires
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map((w) => (w[1] ? '1' : '0'))
      .join('');
    return parseInt(_wiresOrdered, 2);
  }

  function getXYZWireResults(wires: Map<string, boolean>) {
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
    const xWires = getResultOfWiresStartingWith('x');
    const yWires = getResultOfWiresStartingWith('y');
    const zWires = getResultOfWiresStartingWith('z');
    return { xWires, yWires, zWires };
  }

  const { wires, wireConnections } = getInput('24/input.txt');
  const { xWires, yWires, zWires } = getXYZWireResults(wires);
  console.log({ res24a: zWires });

  const wiresNotXAndY = Array.from(wires.entries())
    .filter(([key]) => !key.startsWith('x') && !key.startsWith('y'))
    .map(([key, value]) => key);
  console.log({ wiresNotXAndY });
  for (var i1 = 0; i1 < wiresNotXAndY.length; i1++) {
    console.log(i1);
    for (var i2 = i1 + 1; i2 < wiresNotXAndY.length; i2++) {
      console.log(i2);
      for (var i3 = i2 + 1; i3 < wiresNotXAndY.length; i3++) {
        console.log(i3);
        for (var i4 = i3 + 1; i4 < wiresNotXAndY.length; i4++) {
          console.log(i4);
          for (var i5 = i4 + 1; i5 < wiresNotXAndY.length; i5++) {
            console.log(i5);
            for (var i6 = i5 + 1; i6 < wiresNotXAndY.length; i6++) {
              console.log(i6);
              for (var i7 = i6 + 1; i7 < wiresNotXAndY.length; i7++) {
                console.log(i7);
                for (var i8 = i7 + 1; i8 < wiresNotXAndY.length; i8++) {
                  console.log(i8);
                }
              }
            }
          }
        }
      }
    }
  }

  const sum = xWires + yWires;

  console.log({ xWires, yWires, sum, zWires });
  console.log({ wires });
}

export { AdventOfCode24 };
