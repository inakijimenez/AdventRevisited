import { day2Input } from "./Input";
import { IInstruction, Instruccion } from "./../Classes/IntCodeInstructions";

function operateInstruction(
	input: Array<number>,
	instruccion: IInstruction
): number {
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

function intCodeMachine(input: Array<number>, opIndex: number) {
	let instruccion: IInstruction = new Instruccion(
		input.slice(opIndex, opIndex + 4)
	);
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
day2Input[1] = 12;
day2Input[2] = 2;
// intCodeMachine(day2Input, 0);
// part1 solution

// part2 solution
function checkOperations(
	input: Array<number>,
	noun: number,
	verb: number,
	expectedOutput: number
) {
	const opInput = [...input];
	opInput[1] = noun;
	opInput[2] = verb;
	intCodeMachine(opInput, 0);
	if (opInput[0] == expectedOutput) {
		console.log("OPERACION TERMINADA " + noun + " " + verb);
		let result = noun * 100 + verb;
		console.log("RESULTADO " + result);
	} else {
		if (noun < 99) {
			noun++;
		} else if (verb < 99) {
			verb++;
			noun = 0;
		} else {
			return;
		}
		checkOperations(input, noun, verb, expectedOutput);
	}
}

checkOperations(day2Input, 0, 0, 19690720);
