import { day1InputMass } from "./Input";

function calculateFuel(mass: number): number {
	let fuel = Math.floor(mass / 3) - 2;
	if (fuel > 0) {
		return fuel + calculateFuel(fuel);
	} else {
		return 0;
	}
}

const fuel = day1InputMass.reduce((sum, input) => {
	sum += calculateFuel(input);
	return sum;
}, 0);
console.log(fuel);
