"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImageLayer_1 = require("./../Classes/ImageLayer");
const Input_1 = require("./Input");
const c = (r, s) => (s.match(r) || []).length;
// Sort by number of 0s and take first element
const part1 = Input_1.day8Input
    .match(/.{1,150}/g)
    .sort((a, b) => c(/0/g, a) - c(/0/g, b))
    .map(l => c(/1/g, l) * c(/2/g, l))[0];
const part2 = Input_1.day8Input
    .match(/.{1,150}/g)
    .reduce((a, b) => a
    .toString()
    .split("")
    .map((x, i) => (x == "2" ? b[i] : x))
    .join(""))
    .match(/.{1,25}/g);
console.log({ part1, part2 });
part2.forEach(r => {
    console.log(r.split("0").join(" "));
});
function splitInput(input, size) {
    let splitIndex = 0;
    const splits = [];
    while (splitIndex < input.length) {
        splits.push(new ImageLayer_1.ImageLayer(input.slice(splitIndex, splitIndex + size)));
        splitIndex += size;
    }
    return splits;
}
const layerSize = 25 * 6;
const layers = Input_1.day8Input.match(/.{1,150}/g).map(l => new ImageLayer_1.ImageLayer(l));
const testLayers = splitInput("0222112222120000", 4);
const securityLayer = layers.sort((l1, l2) => l1.zeros - l2.zeros)[0];
console.log(securityLayer.ones * securityLayer.twos);
const imageLayer = layers
    .reduce((accLayer, currentLayer) => {
    if (accLayer.length == 0) {
        return currentLayer.image;
    }
    else {
        const accLayerArray = accLayer.split("");
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
//# sourceMappingURL=Day8.js.map