import { IOrbitMap, OrbitMap } from "./../Classes/Orbit";
import { day6Input, test1, test2 } from "./Input";

// part1
// const orbitMap: IOrbitMap = new OrbitMap(day6Input);
// const orbitMap: IOrbitMap = new OrbitMap(test1);

// const saltos: number = orbitMap.calculateIndirectOrbits();
// console.log(saltos);

// part2
// const orbitMap: IOrbitMap = new OrbitMap(test2);
const orbitMap: IOrbitMap = new OrbitMap(day6Input);
console.log(orbitMap.calculateMinimunTransfers("YOU", "SAN"));
