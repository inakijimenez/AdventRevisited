"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Input_1 = require("./Input");
function calculateFuel(mass) {
    let fuel = Math.floor(mass / 3) - 2;
    if (fuel > 0) {
        return fuel + calculateFuel(fuel);
    }
    else {
        return 0;
    }
}
const fuel = Input_1.day1InputMass.reduce((sum, input) => {
    sum += calculateFuel(input);
    return sum;
}, 0);
console.log(fuel);
//# sourceMappingURL=Day1.js.map