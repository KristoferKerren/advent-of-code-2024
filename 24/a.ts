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

  const { wires, wireConnections } = getInput('24/input.txt');
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
  const zWires = Array.from(wires.entries()).filter(([key, value]) =>
    key.startsWith('z')
  );
  const zWiresOrdered = zWires
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map((w) => (w[1] ? '1' : '0'))
    .join('');
  const res = parseInt(zWiresOrdered, 2);

  console.log({ wires, zWires, zWiresOrdered, res });
}

export { AdventOfCode24 };
