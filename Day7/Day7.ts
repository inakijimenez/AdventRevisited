import { IIntCodeMachine, IntcodeMachine } from "./../Classes/IntcodeMachine";
import {
  aplifierInstructions,
  part2test1Instructions,
  part2test2Instructions,
  test1Instructions,
  test2Instructions,
  test3Instructions
} from "./Input";

const test1Amplifier1: IIntCodeMachine = new IntcodeMachine(test1Instructions);

// console.log(test1Amplifier1.operateCode(0));

const signal: number = 0;
const phaseSetting = [0, 0, 0, 0, 0];
const phaseSetting2 = [5, 5, 5, 5, 5];

function uniquePhases(p: number[]): boolean {
  return Array.from(new Set(p)).length == p.length;
}

function increasePhase(p: number[], maxPhase: number, minPhase: number): number[] {
  let changed: boolean = false;
  let pIndex = 0;
  while (!changed && pIndex < p.length) {
    if (p[pIndex] < maxPhase) {
      p[pIndex]++;
      changed = true;
    } else if (pIndex < p.length - 1) {
      p[pIndex] = minPhase;
    } else {
      p[pIndex]++;
    }
    pIndex++;
  }
  if (uniquePhases(p)) {
    return p;
  } else {
    return increasePhase(p, maxPhase, minPhase);
  }
}

function operateAmplifiers(phases: number[], intCodeInput: number[]): number {
  return phases.reduce((input, phase) => {
    const amplifier: IIntCodeMachine = new IntcodeMachine(intCodeInput);
    return amplifier.operateCode(phase, input);
  }, 0);
}

function getLoopSignal(amplifiers: IIntCodeMachine[], phases: number[]): number {
  let output: number = 0;
  let ampId: number = 0;
  let thrusterSignal: number = 0;

  while (output !== null) {
    output = amplifiers[ampId].operateCode(phases[ampId], output);
    if (ampId < 4) {
      ampId++;
    } else {
      ampId = 0;
      thrusterSignal = output !== null ? output : thrusterSignal;
    }
  }
  return thrusterSignal;
}

function getLoopMaxSignal(
  phases: number[],
  maxSignal: number,
  intCodeInput: number[],
  maxPhase: number
): number {
  const amplifier1: IIntCodeMachine = new IntcodeMachine([...intCodeInput]);
  const amplifier2: IIntCodeMachine = new IntcodeMachine([...intCodeInput]);
  const amplifier3: IIntCodeMachine = new IntcodeMachine([...intCodeInput]);
  const amplifier4: IIntCodeMachine = new IntcodeMachine([...intCodeInput]);
  const amplifier5: IIntCodeMachine = new IntcodeMachine([...intCodeInput]);
  if (phases[phases.length - 1] <= maxPhase) {
    if (!uniquePhases(phases)) {
      phases = increasePhase(phases, 9, 5);
    }
    const outputSignal: number = getLoopSignal(
      [amplifier1, amplifier2, amplifier3, amplifier4, amplifier5],
      phases
    );
    maxSignal = maxSignal > outputSignal ? maxSignal : outputSignal;
    const newPhase = increasePhase(phases, 9, 5);
    return getLoopMaxSignal(newPhase, maxSignal, intCodeInput, maxPhase);
  } else {
    return maxSignal;
  }
}

function getMaxOutputSignal(
  phases: number[],
  intCodeInput: number[],
  maxSignal: number,
  maxPhase: number
): number {
  if (phases[phases.length - 1] <= maxPhase) {
    if (!uniquePhases(phases)) {
      phases = increasePhase(phases, 4, 0);
    }
    const outputSignal: number = operateAmplifiers(phases, intCodeInput);
    // console.log(outputSignal);
    maxSignal = maxSignal > outputSignal ? maxSignal : outputSignal;
    const newPhase = increasePhase(phases, 4, 0);
    return getMaxOutputSignal(newPhase, intCodeInput, maxSignal, maxPhase);
  } else {
    return maxSignal;
  }
}

// console.log(getMaxOutputSignal(phaseSetting, test1Instructions, signal));
// console.log(getMaxOutputSignal(phaseSetting, test2Instructions, signal));
// console.log(getMaxOutputSignal(phaseSetting, test3Instructions, signal));
// part 1 solution
console.log(getMaxOutputSignal(phaseSetting, aplifierInstructions, signal, 4));

// console.log(test1Amplifier1.input);

// part2
// console.log(getLoopMaxSignal(phaseSetting2, 0, part2test1Instructions, 9));
// console.log(getLoopMaxSignal(phaseSetting2, 0, part2test2Instructions, 9));
console.log(getLoopMaxSignal(phaseSetting2, 0, aplifierInstructions, 9));
