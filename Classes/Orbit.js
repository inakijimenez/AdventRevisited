"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrbitMap {
    constructor(inputMap) {
        this.planetDictionary = {};
        this.calculateIndirectOrbits = () => {
            return Object.keys(this.planetDictionary).reduce((total, key) => {
                return (total += this.calculateOrbits(key));
            }, 0);
        };
        this.calculateOrbits = (key) => {
            return !!this.planetDictionary[key] ? 1 + this.calculateOrbits(this.planetDictionary[key]) : 0;
        };
        this.calculateMinimunTransfers = (from, to) => {
            const routeFrom = this.getRoute(from);
            const routeTo = this.getRoute(to);
            const closestPlanet = this.getClosestPlanet(routeFrom, routeTo);
            const transfersFromClosest = routeFrom.findIndex(p => p == closestPlanet) - 1;
            const transfersToClosest = routeTo.findIndex(p => p == closestPlanet) - 1;
            return transfersFromClosest + transfersToClosest;
        };
        this.getClosestPlanet = (routeFrom, routeTo) => {
            return routeFrom.find(f => routeTo.some(t => t == f));
        };
        this.getRoute = (planet, route = []) => {
            route.push(planet);
            return !!this.planetDictionary[planet] ? this.getRoute(this.planetDictionary[planet], route) : route;
        };
        inputMap.forEach(o => {
            const [center, orbitant] = o.split(")");
            if (!this.planetDictionary[orbitant]) {
                this.planetDictionary[orbitant] = center;
            }
        });
    }
}
exports.OrbitMap = OrbitMap;
//# sourceMappingURL=Orbit.js.map