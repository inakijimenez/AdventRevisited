export interface IStep {
	direction: string;
	steps: number;
}

export class Step implements IStep {
	public direction: string;
	public steps: number;
	constructor(pathStep: string) {
		this.direction = pathStep[0];
		this.steps = parseFloat(pathStep.slice(1));
	}
}
