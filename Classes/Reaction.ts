export interface IReactionComponent {
  component: string;
  quantity: number;
}
export class ReactionComponent {
  public component: string;
  public quantity: number;
  constructor(comp: string) {
    this.component = comp.split(" ")[1];
    this.quantity = parseFloat(comp.split(" ")[0]);
  }
}
export interface IReaction {
  inputs: IReactionComponent[];
  output: IReactionComponent;
}

export class Reaction implements IReaction {
  public inputs: IReactionComponent[] = [];
  public output: IReactionComponent = null;
  constructor(reaction: string) {
    const inComponents: string = reaction.split(" => ")[0];
    const outComponent: string = reaction.split(" => ")[1];
    this.inputs.push(...inComponents.split(", ").map(c => new ReactionComponent(c)));
    this.output = new ReactionComponent(outComponent);
  }
}
