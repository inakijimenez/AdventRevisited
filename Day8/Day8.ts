import { IImageLayer, ImageLayer } from "./../Classes/ImageLayer";
import { day8Input } from "./Input";

const c = (r, s) => (s.match(r) || []).length;
// Sort by number of 0s and take first element

const part1 = day8Input
  .match(/.{1,150}/g)
  .sort((a, b) => c(/0/g, a) - c(/0/g, b))
  .map(l => c(/1/g, l) * c(/2/g, l))[0];

const part2 = day8Input
  .match(/.{1,150}/g)
  .reduce((a, b) =>
    a
      .toString()
      .split("")
      .map((x, i) => (x == "2" ? b[i] : x))
      .join("")
  )
  .match(/.{1,25}/g);

console.log({ part1, part2 });
part2.forEach(r => {
  console.log(r.split("0").join(" "));
});

function splitInput(input: string, size: number) {
  let splitIndex: number = 0;
  const splits: IImageLayer[] = [];
  while (splitIndex < input.length) {
    splits.push(new ImageLayer(input.slice(splitIndex, splitIndex + size)));
    splitIndex += size;
  }
  return splits;
}

const layerSize = 25 * 6;

const layers: IImageLayer[] = day8Input.match(/.{1,150}/g).map(l => new ImageLayer(l));
const testLayers: IImageLayer[] = splitInput("0222112222120000", 4);

const securityLayer: IImageLayer = layers.sort((l1, l2) => l1.zeros - l2.zeros)[0];
console.log(securityLayer.ones * securityLayer.twos);

const imageLayer: string[] = layers
  .reduce((accLayer, currentLayer) => {
    if (accLayer.length == 0) {
      return currentLayer.image;
    } else {
      const accLayerArray: string[] = accLayer.split("");
      return accLayerArray.map((bit, index) => (bit == "2" ? currentLayer.image[index] : bit)).join("");
    }
  }, "")
  .match(/.{1,25}/g);
imageLayer.forEach(r => {
  console.log(r.split("0").join(" "));
});
// let row = 0;
// const rows = [];
// while (row < imageLayer.length) {
//   rows.push(imageLayer.slice(row, row + 25));
//   row += 25;
// }
