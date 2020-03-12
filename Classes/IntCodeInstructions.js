"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Instruccion {
    constructor(codigo) {
        this.operacion = codigo[0];
        this.posicion1 = codigo[1];
        this.posicion2 = codigo[2];
        this.posicionResultado = codigo[3];
    }
}
exports.Instruccion = Instruccion;
//# sourceMappingURL=IntCodeInstructions.js.map