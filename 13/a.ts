class Button {
  constructor(
    public deltaX: number,
    public deltaY: number,
    public cost: number = 0
  ) {}
}

class ClawMachine {
  constructor(
    public buttonA: Button = new Button(0, 0, 0),
    public buttonB: Button = new Button(0, 0, 0),
    public PrizeX: number = 0,
    public PrizeY: number = 0
  ) {}

  getTotalCost(buttonAPress: number, buttonBPress: number): number {
    return buttonAPress * this.buttonA.cost + buttonBPress * this.buttonB.cost;
  }

  get buttonPresses() {
    var buttonA =
      (this.PrizeY * this.buttonB.deltaX - this.PrizeX * this.buttonB.deltaY) /
      (this.buttonB.deltaX * this.buttonA.deltaY -
        this.buttonA.deltaX * this.buttonB.deltaY);
    var buttonB =
      (this.PrizeX - this.buttonA.deltaX * buttonA) / this.buttonB.deltaX;
    if (buttonA % 1 === 0 && buttonB % 1 === 0) {
      return this.getTotalCost(buttonA, buttonB);
    }
    return 0;
  }
}

const fs = require('fs');

function getClawMachines(fileName: string, deltaPrice: number = 0) {
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
        clawMachines.at(-1).PrizeX = deltaPrice + PrizeX;
        clawMachines.at(-1).PrizeY = deltaPrice + PrizeY;
      }
    }
  });

  return clawMachines;
}

const clawMachines13a = getClawMachines('13/input.txt');
let sum13a = clawMachines13a.reduce(
  (acc, clawMachine) => acc + clawMachine.buttonPresses,
  0
);

const clawMachines13b = getClawMachines('13/input.txt', 10000000000000);
let sum13b = clawMachines13b.reduce(
  (acc, clawMachine) => acc + clawMachine.buttonPresses,
  0
);

console.log({ sum13a, sum13b });

export {};
