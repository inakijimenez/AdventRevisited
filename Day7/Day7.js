"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IntcodeMachine_1 = require("./../Classes/IntcodeMachine");
const Input_1 = require("./Input");
const test1Amplifier1 = new IntcodeMachine_1.IntcodeMachine(Input_1.test1Instructions);
// console.log(test1Amplifier1.operateCode(0));
const signal = 0;
const phaseSetting = [0, 0, 0, 0, 0];
const phaseSetting2 = [5, 5, 5, 5, 5];
function uniquePhases(p) {
    return Array.from(new Set(p)).length == p.length;
}
function increasePhase(p, maxPhase, minPhase) {
    let changed = false;
    let pIndex = 0;
    while (!changed && pIndex < p.length) {
        if (p[pIndex] < maxPhase) {
            p[pIndex]++;
            changed = true;
        }
        else if (pIndex < p.length - 1) {
            p[pIndex] = minPhase;
        }
        else {
            p[pIndex]++;
        }
        pIndex++;
    }
    if (uniquePhases(p)) {
        return p;
    }
    else {
        return increasePhase(p, maxPhase, minPhase);
    }
}
function operateAmplifiers(phases, intCodeInput) {
    return phases.reduce((input, phase) => {
        const amplifier = new IntcodeMachine_1.IntcodeMachine(intCodeInput);
        return amplifier.operateCode(phase, input);
    }, 0);
}
function getLoopSignal(amplifiers, phases) {
    let output = 0;
    let ampId = 0;
    let thrusterSignal = 0;
    while (output !== null) {
        output = amplifiers[ampId].operateCode(phases[ampId], output);
        if (ampId < 4) {
            ampId++;
        }
        else {
            ampId = 0;
            thrusterSignal = output !== null ? output : thrusterSignal;
        }
    }
    return thrusterSignal;
}
function getLoopMaxSignal(phases, maxSignal, intCodeInput, maxPhase) {
    const amplifier1 = new IntcodeMachine_1.IntcodeMachine([...intCodeInput]);
    const amplifier2 = new IntcodeMachine_1.IntcodeMachine([...intCodeInput]);
    const amplifier3 = new IntcodeMachine_1.IntcodeMachine([...intCodeInput]);
    const amplifier4 = new IntcodeMachine_1.IntcodeMachine([...intCodeInput]);
    const amplifier5 = new IntcodeMachine_1.IntcodeMachine([...intCodeInput]);
    if (phases[phases.length - 1] <= maxPhase) {
        if (!uniquePhases(phases)) {
            phases = increasePhase(phases, 9, 5);
        }
        const outputSignal = getLoopSignal([amplifier1, amplifier2, amplifier3, amplifier4, amplifier5], phases);
        maxSignal = maxSignal > outputSignal ? maxSignal : outputSignal;
        const newPhase = increasePhase(phases, 9, 5);
        return getLoopMaxSignal(newPhase, maxSignal, intCodeInput, maxPhase);
    }
    else {
        return maxSignal;
    }
}
function getMaxOutputSignal(phases, intCodeInput, maxSignal, maxPhase) {
    if (phases[phases.length - 1] <= maxPhase) {
        if (!uniquePhases(phases)) {
            phases = increasePhase(phases, 4, 0);
        }
        const outputSignal = operateAmplifiers(phases, intCodeInput);
        // console.log(outputSignal);
        maxSignal = maxSignal > outputSignal ? maxSignal : outputSignal;
        const newPhase = increasePhase(phases, 4, 0);
        return getMaxOutputSignal(newPhase, intCodeInput, maxSignal, maxPhase);
    }
    else {
        return maxSignal;
    }
}
// console.log(getMaxOutputSignal(phaseSetting, test1Instructions, signal));
// console.log(getMaxOutputSignal(phaseSetting, test2Instructions, signal));
// console.log(getMaxOutputSignal(phaseSetting, test3Instructions, signal));
// part 1 solution
console.log(getMaxOutputSignal(phaseSetting, Input_1.aplifierInstructions, signal, 4));
// console.log(test1Amplifier1.input);
// part2
// console.log(getLoopMaxSignal(phaseSetting2, 0, part2test1Instructions, 9));
// console.log(getLoopMaxSignal(phaseSetting2, 0, part2test2Instructions, 9));
console.log(getLoopMaxSignal(phaseSetting2, 0, Input_1.aplifierInstructions, 9));
//# sourceMappingURL=Day7.js.map