"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Input_1 = require("./Input");
const Point_1 = require("./../Classes/Point");
const Step_1 = require("./../Classes/Step");
let x = 0;
let y = 0;
let grid = {};
function generateGridPoint(point, filler) {
    if (!grid[point.x]) {
        grid[point.x] = {};
    }
    if (!grid[point.x][point.y]) {
        grid[point.x][point.y] = filler;
    }
    else if (grid[point.x][point.y] != filler) {
        grid[point.x][point.y] = 0;
        intersections.push(point);
    }
}
function generatePoints(steps, axis, growth, filler) {
    let generatedPoints = 0;
    let segment = [];
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
        segment.push(new Point_1.Point(x, y));
        generateGridPoint(new Point_1.Point(x, y), filler);
        generatedPoints++;
    }
    return segment;
}
function generateSegment(step, filler) {
    let axis;
    let growth;
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
function generateWire(wireInput, filler) {
    x = 0;
    y = 0;
    let wire = [];
    wireInput.forEach(input => {
        const step = new Step_1.Step(input);
        let segment = generateSegment(step, filler);
        wire.push(...segment);
    });
    return wire;
}
let intersections = [];
let wire1 = generateWire(Input_1.wire1Input, 1);
let wire2 = generateWire(Input_1.wire2Input, 2);
function generateGrid(wire, filler) {
    wire.forEach(point => {
        generateGridPoint(point, filler);
    });
}
// generateGrid(wire1, 1);
// generateGrid(wire2, 2);
console.log(grid);
let minDistance = intersections.reduce((distance, point) => {
    const pointDistance = Math.abs(point.x) + Math.abs(point.y);
    return pointDistance < distance && pointDistance != 0
        ? pointDistance
        : distance;
}, Number.MAX_SAFE_INTEGER);
console.log(minDistance);
const minDelay = intersections.reduce((delay, point) => {
    const interDelay = wire1.findIndex(p1 => p1.x == point.x && p1.y == point.y) +
        wire2.findIndex(p1 => p1.x == point.x && p1.y == point.y) +
        2; // +2 porque los wires empiezan en position 0
    return interDelay < delay ? interDelay : delay;
}, Number.MAX_SAFE_INTEGER);
console.log(minDelay);
//# sourceMappingURL=Day3.js.map