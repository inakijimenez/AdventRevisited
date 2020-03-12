"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Input_1 = require("./Input");
const IntCodeInstructions_1 = require("./../Classes/IntCodeInstructions");
function operateInstruction(input, instruccion) {
    switch (instruccion.operacion) {
        case 1: {
            input[instruccion.posicionResultado] =
                input[instruccion.posicion1] + input[instruccion.posicion2];
            return 0;
        }
        case 2: {
            input[instruccion.posicionResultado] =
                input[instruccion.posicion1] * input[instruccion.posicion2];
            return 0;
        }
        case 99: {
            return 1;
        }
        default: {
            return -1;
        }
    }
}
function intCodeMachine(input, opIndex) {
    let instruccion = new IntCodeInstructions_1.Instruccion(input.slice(opIndex, opIndex + 4));
    let resultadoOperacion = operateInstruction(input, instruccion);
    switch (resultadoOperacion) {
        case 0: {
            opIndex += 4;
            intCodeMachine(input, opIndex);
            break;
        }
        case 1: {
            console.log("MACHINE ENDED");
            break;
        }
        case -1: {
            console.log("ERROR ENDED");
            break;
        }
        default: {
            console.log("WTF HAPPENED");
            break;
        }
    }
}
Input_1.day2Input[1] = 12;
Input_1.day2Input[2] = 2;
// intCodeMachine(day2Input, 0);
// part1 solution
// part2 solution
function checkOperations(input, noun, verb, expectedOutput) {
    const opInput = [...input];
    opInput[1] = noun;
    opInput[2] = verb;
    intCodeMachine(opInput, 0);
    if (opInput[0] == expectedOutput) {
        console.log("OPERACION TERMINADA " + noun + " " + verb);
        let result = noun * 100 + verb;
        console.log("RESULTADO " + result);
    }
    else {
        if (noun < 99) {
            noun++;
        }
        else if (verb < 99) {
            verb++;
            noun = 0;
        }
        else {
            return;
        }
        checkOperations(input, noun, verb, expectedOutput);
    }
}
checkOperations(Input_1.day2Input, 0, 0, 19690720);
//# sourceMappingURL=Day2.js.map