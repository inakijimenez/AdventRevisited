import { maxRange, minRange } from "./Input";

function isInRange(input: number[]): boolean {
	const inputNumber = parseFloat(input.join(""));
	return inputNumber >= minRange && inputNumber <= maxRange;
}

function partOfBiggerGroup(input: number[], matchingPosition: number): boolean {
	return (
		matchingPosition < input.length - 1 &&
		input[matchingPosition] == input[matchingPosition + 1]
	);
}

function adjacentsAreSame(input: number[]): boolean {
	let startingPosition = 0;
	while (startingPosition <= input.length - 2) {
		if (input[startingPosition] == input[startingPosition + 1]) {
			if (!partOfBiggerGroup(input, startingPosition + 1)) {
				return true;
			} else {
				const firstOutOfGroupPosition: number = input.findIndex(
					(number, index) =>
						index > startingPosition + 2 && number != input[startingPosition]
				);
				if (
					firstOutOfGroupPosition > startingPosition + 2 &&
					adjacentsAreSame(input.slice(firstOutOfGroupPosition))
				) {
					return true;
				}
			}
			return false;
		}
		startingPosition++;
	}
	return false;
}

function neverDecreases(input: number[]): boolean {
	let startingPosition = 0;
	while (startingPosition <= input.length - 2) {
		if (input[startingPosition] > input[startingPosition + 1]) {
			return false;
		}
		startingPosition++;
	}
	return true;
}

const input = minRange
	.toString()
	.split("")
	.map(p => +p);
let passwords: number = 0;

function increaseNumber(input: number[], position: number): number[] {
	if (input[position] < 9) {
		input[position]++;
		return input;
	} else {
		input[position] = 0;
		return increaseNumber(input, position - 1);
	}
}

function checkNumbers(input: number[]) {
	while (isInRange(input)) {
		if (adjacentsAreSame(input) && neverDecreases(input)) {
			passwords++;
		}
		increaseNumber(input, input.length - 1);
	}
}

checkNumbers(input);
console.log(passwords);
// 1363 high
