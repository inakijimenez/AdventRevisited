"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReactionComponent {
    constructor(comp) {
        this.component = comp.split(" ")[1];
        this.quantity = parseFloat(comp.split(" ")[0]);
    }
}
exports.ReactionComponent = ReactionComponent;
class Reaction {
    constructor(reaction) {
        this.inputs = [];
        this.output = null;
        const inComponents = reaction.split(" => ")[0];
        const outComponent = reaction.split(" => ")[1];
        this.inputs.push(...inComponents.split(", ").map(c => new ReactionComponent(c)));
        this.output = new ReactionComponent(outComponent);
    }
}
exports.Reaction = Reaction;
//# sourceMappingURL=Reaction.js.map