export interface IInstruction {
	operacion: number;
	posicion1: number;
	posicion2: number;
	posicionResultado: number;
}

export class Instruccion implements IInstruction {
	public operacion: number;
	public posicion1: number;
	public posicion2: number;
	public posicionResultado: number;
	constructor(codigo: Array<number>) {
		this.operacion = codigo[0];
		this.posicion1 = codigo[1];
		this.posicion2 = codigo[2];
		this.posicionResultado = codigo[3];
	}
}
