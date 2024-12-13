class Button {
  constructor(
    public deltaX: number,
    public deltaY: number,
    public cost: number
  ) {}
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
        clawMachines.at(-1).PrizeX = PrizeX;
        clawMachines.at(-1).PrizeY = PrizeY;
      }
    }
  });

  return clawMachines;
}

const getCheapeastPrice = (clawMachine: ClawMachine) => {
  for (var buttonAPress = 1; buttonAPress < 100; buttonAPress++) {
    for (var buttonBPress = 1; buttonBPress < 100; buttonBPress++) {
      if (clawMachine.getIsSolved(buttonAPress, buttonBPress)) {
        return clawMachine.getTotalCost(buttonAPress, buttonBPress);
      }
    }
  }
  return 0;
};

const clawMachines = getClawMachines('13/input.txt');

console.log(clawMachines[0]);
let sum = 0;
clawMachines.forEach((clawMachine) => {
  const cost = getCheapeastPrice(clawMachine);
  sum += cost;
});

console.log({ sum });

export {};
