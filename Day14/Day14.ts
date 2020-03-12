import { IReaction, IReactionComponent, Reaction, ReactionComponent } from "./../Classes/Reaction";
import { day14Test1, day14Test2, day14Test3, day14Test4, day14Input } from "./Input";

// const reactions: IReaction[] = day14Test1.map(r => new Reaction(r));
// const reactions: IReaction[] = day14Test2.map(r => new Reaction(r));
// const reactions: IReaction[] = day14Test3.map(r => new Reaction(r));
// const reactions: IReaction[] = day14Test4.map(r => new Reaction(r));
const reactions: IReaction[] = day14Input.map(r => new Reaction(r));

const matList = {};
// se crea un mapa de reaccion en cadena donde los output son as keys y los values son los inputs
let reaction = reactions.find(r => r.output.component == "FUEL");
function addReactionMap(reaction: IReaction) {
  matList[reaction.output.component] = { out: reaction.output.quantity };
  reaction.inputs.forEach(input => {
    matList[reaction.output.component][input.component] = { in: input.quantity };
    let re = reactions.find(re => re.output.component == input.component);
    if (re) {
      addReactionMap(re);
    }
  });
}
addReactionMap(reaction);

let mats = {};

//  * producir
function producir(chemical: string, cantidad) {
  if (!mats[chemical]) {
    mats[chemical] = 0;
  }
  if (mats[chemical] >= cantidad) {
    mats[chemical] -= cantidad;
  } else {
    const produccionesNecesarias: number = Math.ceil((cantidad - mats[chemical]) / matList[chemical].out);
    mats[chemical] += produccionesNecesarias * matList[chemical].out - cantidad;
    Object.keys(matList[chemical])
      .filter(k => k != "out")
      .forEach(input => {
        if (input === "ORE") {
          if (!mats[input]) {
            mats[input] = 0;
          }
          mats[input] += matList[chemical][input].in * produccionesNecesarias;
        } else {
          producir(input, produccionesNecesarias * matList[chemical][input].in);
        }
      });
  }
}

producir("FUEL", 1);
// console.log(mats.ORE);
// part1 654909

// part2
// let fuel: number = Math.round(1000000000000 / mats.ORE) - 1;
let fuel = 2870000;
let accumulador: number = fuel / 2;
let eraMayor: boolean;
let esMayor: boolean;
mats.ORE = 0;
while (true) {
  mats = {};
  //fuel++;
  producir("FUEL", fuel);
  accumulador = Math.ceil(accumulador / 2);
  if (mats.ORE > 1000000000000) {
    fuel -= accumulador;
    esMayor = true;
  } else {
    fuel += accumulador;
    esMayor = false;
  }
  if (accumulador == 1 && esMayor != eraMayor) {
    fuel = eraMayor ? fuel : fuel - 1;
    break;
  } else {
    eraMayor = esMayor;
  }
}
console.log(fuel);
// 2876992
// Hace la cuenta +1 pq hace la generacion que se pasa y el metodo es poco eficiente pero funciona. Un metodo de aproximacion por mitades seria mucho mas optimo
//  * hayProducto?
//  *   si
//  *     quitar stock
//  *   no
//  *     es ORE?
//  *       si
//  *         sumar ore
//  *       no
//  *         producir necesario - stock
//  *         stock += sobrante
//  *

// Se crea una lista de materiales necesarios totales para crear los chemical necesarios en la produccion
// Se pasan como parametros el chemical y la cantidad necesaria para la creacion del output
// function getNeededMats(chemical: string, needed: number) {
//   const cMats: string[] = Object.keys(matList[chemical]).filter(m => m != "out" && m != "ORE");

//   cMats.forEach(mat => {
//     if (!mats[mat]) {
//       mats[mat] = 0;
//     }
//     if (!excessMats[mat]) {
//       excessMats[mat] = 0;
//     }
//     // Tener en cuenta el matList[mat].out
//     let cantidadNecesaria: number = matList[chemical][mat].in * needed;
//     // if (excessMats[mat] < cantidadNecesaria) {
//     //   cantidadNecesaria -= excessMats[mat];
//     //   const numProducciones: number = Math.ceil(cantidadNecesaria / matList[mat].out);
//     //   const cantidadProducida: number = matList[mat].out * numProducciones;
//     //   excessMats[mat] = cantidadProducida - cantidadNecesaria;
//     mats[mat] += cantidadNecesaria;
//     getNeededMats(mat, matList[chemical][mat].in);
//     // } else {
//     //   excessMats[mat] -= cantidadNecesaria;
//     // }
//   });
// }

// getNeededMats("FUEL", 1);
// console.log(mats);
// function produceMats(neededMats): number {
//   const oreMats = Object.keys(neededMats).filter(m => Object.keys(matList[m]).some(k => k == "ORE"));
//   return oreMats.reduce((ore, mat) => {
//     const cantidadNecesaria = neededMats[mat]; // cantidad necesaria
//     const cantidadProducida = matList[mat].out; // cantidad que se produce
//     const orePorProduccion = matList[mat].ORE.in; // ore necesario
//     const producciones: number = Math.ceil(cantidadNecesaria / cantidadProducida);
//     return ore + orePorProduccion * producciones;
//   }, 0);
// }

// const ore = produceMats(mats);
// console.log(ore);
