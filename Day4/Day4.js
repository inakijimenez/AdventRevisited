"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Input_1 = require("./Input");
function isInRange(input) {
    const inputNumber = parseFloat(input.join(""));
    return inputNumber >= Input_1.minRange && inputNumber <= Input_1.maxRange;
}
function partOfBiggerGroup(input, matchingPosition) {
    return (matchingPosition < input.length - 1 &&
        input[matchingPosition] == input[matchingPosition + 1]);
}
function adjacentsAreSame(input) {
    let startingPosition = 0;
    while (startingPosition <= input.length - 2) {
        if (input[startingPosition] == input[startingPosition + 1]) {
            if (!partOfBiggerGroup(input, startingPosition + 1)) {
                return true;
            }
            else {
                const firstOutOfGroupPosition = input.findIndex((number, index) => index > startingPosition + 2 && number != input[startingPosition]);
                if (firstOutOfGroupPosition > startingPosition + 2 &&
                    adjacentsAreSame(input.slice(firstOutOfGroupPosition))) {
                    return true;
                }
            }
            return false;
        }
        startingPosition++;
    }
    return false;
}
function neverDecreases(input) {
    let startingPosition = 0;
    while (startingPosition <= input.length - 2) {
        if (input[startingPosition] > input[startingPosition + 1]) {
            return false;
        }
        startingPosition++;
    }
    return true;
}
const input = Input_1.minRange
    .toString()
    .split("")
    .map(p => +p);
let passwords = 0;
function increaseNumber(input, position) {
    if (input[position] < 9) {
        input[position]++;
        return input;
    }
    else {
        input[position] = 0;
        return increaseNumber(input, position - 1);
    }
}
function checkNumbers(input) {
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
//# sourceMappingURL=Day4.js.map