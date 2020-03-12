"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageLayer {
    constructor(image) {
        this.zeros = 0;
        this.ones = 0;
        this.twos = 0;
        this.image = "";
        this.image = image;
        this.zeros = Array.from(image).filter(l => l == "0").length;
        this.ones = Array.from(image).filter(l => l == "1").length;
        this.twos = Array.from(image).filter(l => l == "2").length;
    }
}
exports.ImageLayer = ImageLayer;
//# sourceMappingURL=ImageLayer.js.map