import { Coordinates, ICoordinates, IMoon, Moon } from "./../Classes/Moon";
import { day12Input, day12Test1 } from "./Input";

function copyMoons(ms: IMoon[]): IMoon[] {
  return ms.map(m => {
    const newM: IMoon = new Moon();
    Object.keys(m.position).forEach(k => {
      newM.position[k] = m.position[k];
    });
    Object.keys(m.velocity).forEach(k => {
      newM.velocity[k] = m.velocity[k];
    });
    return newM;
  });
}

const moons: IMoon[] = day12Input.map(cood => {
  const moon = new Moon();
  Object.keys(moon.position).forEach(k => {
    moon.position[k] = cood[k];
  });
  return moon;
});
// const moons: IMoon[] = day12Test1.map(cood => {
//   const moon = new Moon();
//   Object.keys(moon.position).forEach(k => {
//     moon.position[k] = cood[k];
//   });
//   return moon;
// });

const steps: number = 1;

// while (steps <= 1000) {
//   moons.forEach(moon => {
//     moon.updateVelocity(
//       moon.calculateGravity(
//         moons.filter(m => m != moon),
//         1
//       )
//     );
//   });
//   moons.forEach(moon => moon.updatePosition());
//   moonStates.push(copyMoons(moons));
//   steps++;
// }

const totalEnergy: number = moons.reduce((acc, moon) => acc + moon.getTotalEnergy(), 0);
// console.log(totalEnergy);
// part 1 5350

// part2
function newMoonState(previouStates: IMoon[][], currentState: IMoon[]): boolean {
  const newState: boolean = true;
  const prev = previouStates.find(pS => {
    return (
      pS.filter((moon, index) => {
        return (
          moon.position.x === currentState[index].position.x &&
          moon.position.y === currentState[index].position.y &&
          moon.position.z === currentState[index].position.z &&
          moon.velocity.x === currentState[index].velocity.x &&
          moon.velocity.y === currentState[index].velocity.y &&
          moon.velocity.z === currentState[index].velocity.z
        );
      }).length == pS.length
    );
  });
  return !prev;
}

/** cada 166781 la luna 0 vuelve a la posicion inicial */
const moonStates = [];
// empieza en 1 porque ya posicion inicial ya esta precargada
let timeSteps: number = 1;
while (true) {
  timeSteps += 1;

  moons.forEach(moon => {
    moon.updateVelocity(
      moon.calculateGravity(
        moons.filter(m => m != moon),
        1
      )
    );
  });

  moons.forEach(moon => moon.updatePosition());

  if (
    moons[0].position.x === day12Input[0].x &&
    moons[1].position.x === day12Input[1].x &&
    moons[2].position.x === day12Input[2].x &&
    moons[3].position.x === day12Input[3].x
  ) {
    break;
  }
}
console.log(timeSteps);
// x = 167624
// y = 231614
// z = 96236
// 467,034,091,553,512
