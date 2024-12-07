const fs = require('fs');
const data: string = fs.readFileSync('7/7-input.txt', 'utf8');

class Equation {
  constructor(public sum: number, public factors: number[]) {}
}

const equations: Equation[] = [];
data.split(/\r?\n/).forEach((row) => {
  const eq = new Equation(
    Number(row.split(': ')[0]),
    row.split(': ')[1].split(' ').map(Number)
  );
  equations.push(eq);
});

const calculateSum = (eq: Equation, signs): number => {
  if (eq.factors.length - signs.length > 1) {
    return -1;
  }
  let sum = eq.factors[0];
  for (let i = 1; i < eq.factors.length; i++) {
    if (signs[i - 1] === '+') {
      sum += eq.factors[i];
    } else {
      sum *= eq.factors[i];
    }
  }
  return sum;
};

const canBeSolved = (eq: Equation, signs: string[] = []): boolean => {
  const sum = calculateSum(eq, signs);
  if (sum > eq.sum) {
    return false;
  }
  if (sum === -1) {
    return canBeSolved(eq, [...signs, '+']) || canBeSolved(eq, [...signs, '*']);
  }
  if (sum === eq.sum) {
    return true;
  }
};

const canBe = equations.filter((eq) => canBeSolved(eq));
const sum = canBe.reduce((acc, curr) => acc + curr.sum, 0);
console.log({ sum });

export {};
