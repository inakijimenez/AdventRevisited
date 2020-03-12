"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Step {
    constructor(pathStep) {
        this.direction = pathStep[0];
        this.steps = parseFloat(pathStep.slice(1));
    }
}
exports.Step = Step;
//# sourceMappingURL=Step.js.map