import { basePattern, input, test1, test2 } from "./Input";

class Signal {
  public signalNumbers: number[] = [];
  constructor(inputSig: string) {
    this.signalNumbers.push(...inputSig.split("").map(n => parseInt(n)));
  }
}

// const signal = new Signal(test1);
// const signal = new Signal(test2);
// const signal = new Signal("03036732577212944063491565474664");
// const signal = new Signal(input);

// function generatePatterns(bPattern: number[], length: number): number[][] {
//   const patterns: number[][] = [];

//   while (patterns.length < length) {
//     const newPattern: number[] = [];
//     // [0,1,0,1]
//     bPattern.forEach(p => {
//       let rep: number = 0;
//       while (rep <= patterns.length) {
//         newPattern.push(p);
//         rep++;
//       }
//     });
//     while (newPattern.length <= length) {
//       newPattern.push(...newPattern);
//     }
//     newPattern.shift();

//     patterns.push(newPattern);
//   }
//   return patterns;
// }

// const ps = generatePatterns(basePattern, signal.signalNumbers.length);

// function operatePhase(pattern: number[][], sig: string): string {
//   const output: string[] = [];
//   for (let i = 0; i < sig.length; i++) {
//     output.push(
//       Math.abs(sig.split("").reduce((acc, n, index) => acc + parseFloat(n) * pattern[i][index], 0)).toString()
//     );
//   }
//   return output.map(o => parseFloat(o[o.length - 1])).join("");
// }

// let out = operatePhase(ps, signal.signalNumbers.join(""));
// let phase: number = 1;
// while (phase < 100) {
//   out = operatePhase(ps, out);
//   phase++;
// }
// // Part 1
// console.log(out.slice(0, 8));

// Part 2
// function generatePattern(bPattern: number[], length: number): number[] {
//   const newPattern: number[] = [];
//   // [0,1,0,1]
//   bPattern.forEach(p => {
//     let rep: number = 0;
//     while (rep <= length) {
//       newPattern.push(p);
//       rep++;
//     }
//   });
//   return newPattern;
// }

// function operatePhase(sig: string): string {
//   const output: string[] = [];
//   for (let i = 0; i < sig.length; i++) {
//     const ps = generatePattern(basePattern, i);
//     let patternPosition: number = 1;

//     // La posicion por la que se va a empezar a operar en el array de pattern
//     let startingPosition: number = ps.findIndex(p => p != 0);
//     patternPosition = startingPosition;
//     let signalStartingPosition: number = startingPosition - 1;
//     output.push(
//       Math.abs(
//         sig
//           .split("")
//           .slice(signalStartingPosition)
//           .reduce((acc, n) => {
//             acc = acc + parseFloat(n) * ps[patternPosition];
//             if (patternPosition < ps.length - 1) {
//               patternPosition++;
//             } else {
//               patternPosition = 0;
//             }
//             return acc;
//           }, 0)
//       ).toString()
//     );
//   }
//   return output.map(o => parseFloat(o[o.length - 1])).join("");
// }

// let out = operatePhase(signal.signalNumbers.join(""));
// let phase: number = 1;
// while (phase < 100) {
//   out = operatePhase(out);
//   phase++;
// }
// // Part 1
// console.log(out.slice(0, 8));

// Part 2
// const signal = new Signal(input);
// const signal = new Signal("03036732577212944063491565474664");
const signal = new Signal(input);
let signalIterator: number = 1;
let inputSignal: string = signal.signalNumbers.join("");
const signalRepeat = inputSignal;
while (signalIterator < 10000) {
  inputSignal += signalRepeat;
  signalIterator++;
}
let offset: number = +signal.signalNumbers.slice(0, 7).join("");
console.log(inputSignal.length);

inputSignal = inputSignal.slice(offset);
console.log(inputSignal.length);

function operateBackwards(sig: string): string {
  let counter = 1;
  let out: string = "";
  let sum: number = 0;
  while (counter <= sig.length) {
    sum += +sig[sig.length - counter];
    out = sum.toString().slice(sum.toString().length - 1) + out;
    counter++;
  }
  return out;
}
let output = operateBackwards(inputSignal);
console.log(output.length);
let phase = 1;
while (phase < 100) {
  output = operateBackwards(output);
  phase++;
}
console.log(output.slice(0, 8));
// 05334833 low
