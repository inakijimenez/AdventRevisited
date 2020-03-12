import { wire1Input, wire2Input } from "./Input";
import { IPoint, Point } from "./../Classes/Point";
import { IStep, Step } from "./../Classes/Step";

let x = 0;
let y = 0;
let grid = {};

function generateGridPoint(point: IPoint, filler: number) {
	if (!grid[point.x]) {
		grid[point.x] = {};
	}
	if (!grid[point.x][point.y]) {
		grid[point.x][point.y] = filler;
	} else if (grid[point.x][point.y] != filler) {
		grid[point.x][point.y] = 0;
		intersections.push(point);
	}
}

function generatePoints(
	steps: number,
	axis: string,
	growth: number,
	filler: number
): IPoint[] {
	let generatedPoints = 0;
	let segment: IPoint[] = [];
	while (generatedPoints < steps) {
		switch (axis) {
			case "x": {
				x += growth;
				break;
			}
			case "y": {
				y += growth;
				break;
			}
		}
		segment.push(new Point(x, y));
		generateGridPoint(new Point(x, y), filler);
		generatedPoints++;
	}
	return segment;
}

function generateSegment(step: IStep, filler: number): IPoint[] {
	let axis: string;
	let growth: 1 | -1;
	switch (step.direction) {
		case "U": {
			axis = "y";
			growth = 1;
			break;
		}
		case "D": {
			axis = "y";
			growth = -1;
			break;
		}
		case "R": {
			axis = "x";
			growth = 1;
			break;
		}
		case "L": {
			axis = "x";
			growth = -1;
			break;
		}
		default: {
			console.log("WRONG DIRECTION");
		}
	}
	return generatePoints(step.steps, axis, growth, filler);
}

function generateWire(wireInput: string[], filler: number) {
	x = 0;
	y = 0;
	let wire = [];
	wireInput.forEach(input => {
		const step: IStep = new Step(input);
		let segment = generateSegment(step, filler);
		wire.push(...segment);
	});
	return wire;
}
let intersections: IPoint[] = [];

let wire1 = generateWire(wire1Input, 1);
let wire2 = generateWire(wire2Input, 2);

function generateGrid(wire: IPoint[], filler: number) {
	wire.forEach(point => {
		generateGridPoint(point, filler);
	});
}

// generateGrid(wire1, 1);
// generateGrid(wire2, 2);

console.log(grid);
let minDistance = intersections.reduce((distance, point) => {
	const pointDistance: number = Math.abs(point.x) + Math.abs(point.y);
	return pointDistance < distance && pointDistance != 0
		? pointDistance
		: distance;
}, Number.MAX_SAFE_INTEGER);

console.log(minDistance);

const minDelay = intersections.reduce((delay, point) => {
	const interDelay =
		wire1.findIndex(p1 => p1.x == point.x && p1.y == point.y) +
		wire2.findIndex(p1 => p1.x == point.x && p1.y == point.y) +
		2; // +2 porque los wires empiezan en position 0
	return interDelay < delay ? interDelay : delay;
}, Number.MAX_SAFE_INTEGER);

console.log(minDelay);
