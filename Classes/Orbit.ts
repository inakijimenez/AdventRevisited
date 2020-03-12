export interface IOrbitMap {
  planetDictionary: {};
  calculateOrbits(key: string, map, jumps?: number): number;
  calculateIndirectOrbits();
  calculateMinimunTransfers(from: string, to: string): number;
}

export class OrbitMap implements IOrbitMap {
  public planetDictionary = {};
  constructor(inputMap: string[]) {
    inputMap.forEach(o => {
      const [center, orbitant] = o.split(")");
      if (!this.planetDictionary[orbitant]) {
        this.planetDictionary[orbitant] = center;
      }
    });
  }

  public calculateIndirectOrbits = (): number => {
    return Object.keys(this.planetDictionary).reduce((total, key) => {
      return (total += this.calculateOrbits(key));
    }, 0);
  };

  public calculateOrbits = (key: string): number => {
    return !!this.planetDictionary[key] ? 1 + this.calculateOrbits(this.planetDictionary[key]) : 0;
  };

  public calculateMinimunTransfers = (from: string, to: string): number => {
    const routeFrom: string[] = this.getRoute(from);
    const routeTo: string[] = this.getRoute(to);
    const closestPlanet: string = this.getClosestPlanet(routeFrom, routeTo);
    const transfersFromClosest = routeFrom.findIndex(p => p == closestPlanet) - 1;
    const transfersToClosest = routeTo.findIndex(p => p == closestPlanet) - 1;

    return transfersFromClosest + transfersToClosest;
  };

  private getClosestPlanet = (routeFrom: string[], routeTo: string[]): string => {
    return routeFrom.find(f => routeTo.some(t => t == f));
  };

  private getRoute = (planet: string, route: string[] = []): string[] => {
    route.push(planet);
    return !!this.planetDictionary[planet] ? this.getRoute(this.planetDictionary[planet], route) : route;
  };
}
