class Button {
  constructor(
    public deltaX: number,
    public deltaY: number,
    public cost: number = 0
  ) {}

  divideBy(button: Button): number {
    const xResult = this.deltaX / button.deltaX;
    if (xResult % 1 === 0 && button.deltaY * xResult === this.deltaY) {
      return xResult;
    }
    return -1;
  }
}

class ClawMachine {
  constructor(
    public buttonA: Button = new Button(0, 0, 0),
    public buttonB: Button = new Button(0, 0, 0),
    public PrizeX: number = 0,
    public PrizeY: number = 0
  ) {}

  getIsSolved(buttonAPress: number, buttonBPress: number): boolean {
    return (
      buttonAPress * this.buttonA.deltaX +
        buttonBPress * this.buttonB.deltaX ===
        this.PrizeX &&
      buttonAPress * this.buttonA.deltaY +
        buttonBPress * this.buttonB.deltaY ===
        this.PrizeY
    );
  }

  getTotalCost(buttonAPress: number, buttonBPress: number): number {
    return buttonAPress * this.buttonA.cost + buttonBPress * this.buttonB.cost;
  }

  getRestCost(buttonAPress: number): Button {
    return new Button(
      this.PrizeX - buttonAPress * this.buttonA.deltaX,
      this.PrizeY - buttonAPress * this.buttonA.deltaY
    );
  }
}

const fs = require('fs');

function getClawMachines(fileName: string) {
  const clawMachines: ClawMachine[] = [];
  const data: string = fs.readFileSync(fileName, 'utf8');
  data.split(/\r?\n/).forEach((row, x) => {
    if (row.length > 1) {
      if (row.startsWith('Button A:')) {
        const [deltaX, deltaY] = row.substring(11).split(', Y+').map(Number);
        clawMachines.push(new ClawMachine(new Button(deltaX, deltaY, 3)));
      } else if (row.startsWith('Button B:')) {
        const [deltaX, deltaY] = row.substring(11).split(', Y+').map(Number);
        clawMachines.at(-1).buttonB = new Button(deltaX, deltaY, 1);
      } else if (row.startsWith('Prize:')) {
        const [PrizeX, PrizeY] = row.substring(9).split(', Y=').map(Number);
        clawMachines.at(-1).PrizeX = 10000000000000 + PrizeX;
        clawMachines.at(-1).PrizeY = 10000000000000 + PrizeY;
      }
    }
  });

  return clawMachines;
}

const getCheapeastPrice = (clawMachine: ClawMachine) => {
  var buttonA =
    (clawMachine.PrizeY * clawMachine.buttonB.deltaX -
      clawMachine.PrizeX * clawMachine.buttonB.deltaY) /
    (clawMachine.buttonB.deltaX * clawMachine.buttonA.deltaY -
      clawMachine.buttonA.deltaX * clawMachine.buttonB.deltaY);
  var buttonB =
    (clawMachine.PrizeX - clawMachine.buttonA.deltaX * buttonA) /
    clawMachine.buttonB.deltaX;
  console.log({ clawMachine, buttonA, buttonB });
  if (buttonA % 1 === 0 && buttonB % 1 === 0) {
    return clawMachine.getTotalCost(buttonA, buttonB);
  }
  return 0;
};

const clawMachines = getClawMachines('13/input.txt');

let sum = 0;
clawMachines.forEach((clawMachine) => {
  const cost = getCheapeastPrice(clawMachine);
  sum += cost;
});

console.log({ sum });

export {};
