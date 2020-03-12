export interface IPoint {
	x: number;
	y: number;
}

export class Point implements IPoint {
	public x: number = 0;
	public y: number = 0;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
