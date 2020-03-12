import { inputDay10, test1Day10, test2Day10, test3Day10 } from "./Input";

class Asteroid {
  public x: number;
  public y: number;
  public los: number = 0;
  public vectors: Vector[] = [];
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Vector {
  public angle: number;
  public x: number;
  public y: number;
  public xPositive: boolean;
  public yPositive: boolean;
  public distance: number;
  constructor(originX: number, originY: number, asteroidX: number, asteroidY: number) {
    this.x = asteroidX;
    this.y = asteroidY;
    this.distance = Math.abs(asteroidX - originX + asteroidY - originY);
    this.angle = (Math.atan2(asteroidX - originX, asteroidY - originY) * 180) / Math.PI + 180;
    this.xPositive = asteroidX - originX > 0;
    this.yPositive = asteroidY - originY > 0;
  }
}

// generar mapa
// const stellarMap: string[][] = test1Day10.map(row => row.split(""));
const stellarMap: string[][] = inputDay10.map(row => row.split(""));
// const stellarMap: string[][] = test3Day10.map(row => row.split(""));
// const stellarMap: string[][] = test2Day10.map(row => row.split(""));

const asteroids: Asteroid[] = [];
stellarMap.forEach((row, y) => {
  row.forEach((point, x) => {
    if (point == "#") {
      asteroids.push(new Asteroid(x, y));
    }
  });
});

const best: Asteroid = asteroids.reduce((bestAsteroid, asteroid) => {
  // calcular todos los angulos del resto de los asteroides con respecto al actual y la direccion del vector
  asteroid.vectors = asteroids
    .filter(a => a != asteroid)
    // calcular angulos
    .map(a => new Vector(asteroid.x, asteroid.y, a.x, a.y));

  // comparar angulos y direccion
  // se devuleve solo uno de cada vector
  const vectorSet = asteroid.vectors.reduce((acc, v) => {
    if (
      !acc.some(
        accV => v.angle == accV.angle && v.xPositive == accV.xPositive && v.yPositive == accV.yPositive
      )
    ) {
      acc.push(v);
    }
    return acc;
  }, []);

  asteroid.los = vectorSet.length;

  return bestAsteroid.los < asteroid.los ? asteroid : bestAsteroid;
}, new Asteroid(0, 0));

console.log(best);
// {los: 227, x: 11, y: 13}

const sortedVectors = best.vectors
  // .sort((a, b) => a.angle - b.angle)
  .sort((a, b) => {
    if (a.angle == b.angle) {
      return a.distance - b.distance;
    }
    return b.angle > a.angle ? 1 : -1;
  });

let shooted: number = 1;
let lastShootedAngle: number = 361;
while (shooted <= 200) {
  const nextShootIndex: number =
    sortedVectors.findIndex(v => v.angle < lastShootedAngle && v.angle != lastShootedAngle) != -1
      ? sortedVectors.findIndex(v => v.angle < lastShootedAngle)
      : sortedVectors.findIndex(v => v.angle < 361);

  lastShootedAngle = sortedVectors[nextShootIndex].angle;
  if (shooted == 200) {
    console.log(sortedVectors[nextShootIndex]);
    console.log(sortedVectors[nextShootIndex].x * 100 + sortedVectors[nextShootIndex].y);
  } else {
    sortedVectors.splice(nextShootIndex, 1);
  }
  shooted++;
}
// 206 too low
// 1206 high
