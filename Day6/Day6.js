"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Orbit_1 = require("./../Classes/Orbit");
const Input_1 = require("./Input");
// part1
// const orbitMap: IOrbitMap = new OrbitMap(day6Input);
// const orbitMap: IOrbitMap = new OrbitMap(test1);
// const saltos: number = orbitMap.calculateIndirectOrbits();
// console.log(saltos);
// part2
// const orbitMap: IOrbitMap = new OrbitMap(test2);
const orbitMap = new Orbit_1.OrbitMap(Input_1.day6Input);
console.log(orbitMap.calculateMinimunTransfers("YOU", "SAN"));
//# sourceMappingURL=Day6.js.map