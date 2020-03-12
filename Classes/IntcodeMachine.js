"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameInstruction_1 = require("./GameInstruction");
const PaintingRobot_1 = require("./PaintingRobot");
class Instruccion {
    constructor(codigo) {
        this.modoPosicion1 = 0;
        this.modoPosicion2 = 0;
        this.modoPosicionResultado = 0;
        this.input = null;
        this.pointerIncrease = 4;
        this.opCode = codigo[0].toString();
        this.decomposeOpCode();
        if (this.operacion == 3 || this.operacion == 4) {
            this.posicion1 = null;
            this.posicion2 = null;
            this.posicionResultado = codigo[1];
            this.pointerIncrease = 2;
        }
        else if (this.operacion == 5 || this.operacion == 6) {
            this.posicion1 = codigo[1];
            this.posicion2 = codigo[2];
            this.pointerIncrease = 3;
        }
        else if (this.operacion == 9) {
            this.posicion1 = codigo[1];
            this.pointerIncrease = 2;
        }
        else {
            this.posicion1 = codigo[1];
            this.posicion2 = codigo[2];
            this.posicionResultado = codigo[3];
            this.pointerIncrease = 4;
        }
    }
    decomposeOpCode() {
        if (this.opCode.length == 1) {
            this.operacion = parseFloat(this.opCode);
            this.modoPosicion1 = 0;
            this.modoPosicion2 = 0;
            this.modoPosicionResultado = 0;
        }
        else {
            this.operacion = parseFloat(this.opCode.slice(this.opCode.length - 2));
            this.modoPosicion1 = this.opCode[this.opCode.length - 3]
                ? parseFloat(this.opCode[this.opCode.length - 3])
                : 0;
            this.modoPosicion2 = this.opCode[this.opCode.length - 4]
                ? parseFloat(this.opCode[this.opCode.length - 4])
                : 0;
            this.modoPosicionResultado = this.opCode[this.opCode.length - 5]
                ? parseFloat(this.opCode[this.opCode.length - 5])
                : 0;
        }
    }
}
exports.Instruccion = Instruccion;
class IntcodeMachine {
    // mode 1 = robot, 2 = arcade
    constructor(inputInstructions, mode) {
        this.opIndex = 0;
        this.input = [];
        this.relativeBaseOffset = 0;
        this.phaseUsed = false;
        this.robotMode = false;
        this.arcadeMode = false;
        // Day13
        this.gameMatrix = [];
        this.gameInstruction = null;
        this.paintedBlocks = 0;
        this.joystick = null;
        this.ballPosition = 0;
        // Day11 part2
        this.panel = [[1]];
        // Day11 part1
        // private panel: number[][] = [[0]];
        this.robot = null;
        this.paintedPanels = 0;
        this.operateCode = (phase, inputNumber) => {
            this.output = null;
            if (inputNumber != undefined) {
                this.inputNumber = inputNumber;
            }
            if (phase != undefined) {
                this.phase = phase;
            }
            let intructionReturn = 0;
            while (intructionReturn == 0 && this.opIndex <= this.input.length) {
                // operateInstruction
                const instruction = new Instruccion(this.input.slice(this.opIndex));
                const op1 = !!instruction.modoPosicion1
                    ? instruction.modoPosicion1 == 1
                        ? instruction.posicion1
                        : this.input[instruction.posicion1 + this.relativeBaseOffset]
                    : this.input[instruction.posicion1];
                const op2 = !!instruction.modoPosicion2
                    ? instruction.modoPosicion2 == 1
                        ? instruction.posicion2
                        : this.input[instruction.posicion2 + this.relativeBaseOffset]
                    : this.input[instruction.posicion2];
                const posicionResultado = !!instruction.modoPosicionResultado
                    ? instruction.modoPosicionResultado == 1
                        ? instruction.posicionResultado
                        : instruction.posicionResultado + this.relativeBaseOffset
                    : instruction.posicionResultado;
                this.opIndex += instruction.pointerIncrease;
                switch (instruction.operacion) {
                    case 1: {
                        this.input[posicionResultado] = op1 + op2;
                        break;
                    }
                    case 2: {
                        this.input[posicionResultado] = op1 * op2;
                        break;
                    }
                    case 3: {
                        if (!this.robotMode) {
                            if (this.arcadeMode) {
                                if (this.ballPosition == this.joystick) {
                                    instruction.input = 0;
                                }
                                else if (this.ballPosition > this.joystick) {
                                    instruction.input = 1;
                                    this.joystick++;
                                }
                                else {
                                    instruction.input = -1;
                                    this.joystick--;
                                }
                            }
                            else {
                                if (!this.phaseUsed) {
                                    this.phaseUsed = true;
                                    instruction.input = this.phase;
                                }
                                else {
                                    instruction.input = this.inputNumber;
                                }
                            }
                        }
                        else {
                            // robot mode
                            instruction.input =
                                this.panel[this.robot.x] && this.panel[this.robot.x][this.robot.y]
                                    ? this.panel[this.robot.x][this.robot.y]
                                    : 0;
                            if (this.panel[this.robot.x] == undefined ||
                                this.panel[this.robot.x][this.robot.y] == undefined) {
                                this.paintedPanels++;
                            }
                        }
                        if (instruction.modoPosicion1 == 0) {
                            this.input[posicionResultado] = instruction.input;
                        }
                        else if (instruction.modoPosicion1 == 2) {
                            const posicion = posicionResultado + this.relativeBaseOffset;
                            this.input[posicion] = instruction.input;
                        }
                        break;
                    }
                    case 4: {
                        const output = !!instruction.modoPosicion1
                            ? instruction.modoPosicion1 == 1
                                ? instruction.posicionResultado
                                : this.input[posicionResultado + this.relativeBaseOffset]
                            : this.input[posicionResultado];
                        // console.log(output);
                        this.output = output;
                        if (this.robotMode) {
                            if (!this.robot.painted) {
                                this.robot.painted = true;
                                if (!this.panel[this.robot.x]) {
                                    this.panel[this.robot.x] = [];
                                }
                                this.panel[this.robot.x][this.robot.y] = output;
                            }
                            else {
                                this.robot.painted = false;
                                this.robot.moveRobot(output, 1);
                            }
                        }
                        else if (this.arcadeMode) {
                            if (!this.gameInstruction) {
                                this.gameInstruction = new GameInstruction_1.GameInstruction();
                            }
                            switch (this.gameInstruction.outputcount) {
                                case 0: {
                                    this.gameInstruction.x = output;
                                    this.gameInstruction.outputcount++;
                                    break;
                                }
                                case 1: {
                                    this.gameInstruction.y = output;
                                    this.gameInstruction.outputcount++;
                                    break;
                                }
                                case 2: {
                                    console.log(output);
                                    this.gameInstruction.fill = output;
                                    if (this.gameInstruction.x == -1 && this.gameInstruction.y == 0) {
                                        console.log("SCORE " + output);
                                    }
                                    else {
                                        this.paintGameMatrix(this.gameInstruction);
                                    }
                                    this.gameInstruction = null;
                                    break;
                                }
                            }
                        }
                        intructionReturn = output == 99 ? 1 : 0;
                        break;
                    }
                    case 5: {
                        this.opIndex = op1 != 0 ? op2 : this.opIndex;
                        break;
                    }
                    case 6: {
                        this.opIndex = op1 == 0 ? op2 : this.opIndex;
                        break;
                    }
                    case 7: {
                        this.input[posicionResultado] = op1 < op2 ? 1 : 0;
                        break;
                    }
                    case 8: {
                        this.input[posicionResultado] = op1 == op2 ? 1 : 0;
                        break;
                    }
                    case 9: {
                        this.relativeBaseOffset +=
                            instruction.modoPosicion1 == 0
                                ? this.input[instruction.posicion1]
                                : instruction.modoPosicion1 == 1
                                    ? instruction.posicion1
                                    : this.input[instruction.posicion1 + this.relativeBaseOffset];
                        break;
                    }
                    case 99: {
                        console.log("MACHINE ENDED");
                        const paintedPannel = [];
                        if (this.robotMode) {
                            console.log(this.paintedPanels);
                            // remapeo de indices negativos del array
                            this.panel.forEach(row => {
                                console.log(row.length);
                                const paintedRow = [];
                                let xIndex = -5;
                                while (xIndex <= 0) {
                                    paintedRow[xIndex + 5] = row[xIndex] ? row[xIndex] : 0;
                                    paintedRow[xIndex + 5] = paintedRow[xIndex + 5] == 0 ? " " : "X";
                                    xIndex++;
                                }
                                paintedPannel.push(paintedRow);
                            });
                            paintedPannel.forEach(row => {
                                console.log(row);
                            });
                        }
                        else if (this.arcadeMode) {
                            const blocks = this.countBlocks();
                            console.log(blocks);
                        }
                        intructionReturn = 1;
                        break;
                    }
                    default: {
                        console.log("ERROR ENDED");
                        intructionReturn = -1;
                        break;
                    }
                }
            }
            return this.output;
        };
        this.input = inputInstructions;
        switch (mode) {
            case 1: {
                this.robotMode = true;
                break;
            }
            case 2: {
                this.arcadeMode = true;
            }
        }
        if (this.robotMode) {
            this.robot = new PaintingRobot_1.Robot();
        }
    }
    countBlocks() {
        return this.gameMatrix.reduce((rowAcc, row) => {
            return (rowAcc +
                row.reduce((pixelAcc, pixel) => {
                    return pixel == 2 ? pixelAcc + 1 : pixelAcc;
                }, 0));
        }, 0);
    }
    paintGameMatrix(gameInstruction) {
        if (!this.gameMatrix[gameInstruction.x]) {
            this.gameMatrix[gameInstruction.x] = [];
        }
        if (!this.gameMatrix[gameInstruction.x][gameInstruction.y]) {
            if (gameInstruction.fill == 4) {
                this.ballPosition = gameInstruction.x;
            }
            else if (gameInstruction.fill == 3) {
                this.joystick = gameInstruction.x;
            }
            this.gameMatrix[gameInstruction.x][gameInstruction.y] = gameInstruction.fill;
            if (gameInstruction.fill == 2) {
                this.paintedBlocks++;
            }
        }
        else if (gameInstruction.fill === 4) {
            this.ballPosition = gameInstruction.x;
            if (this.gameMatrix[gameInstruction.x][gameInstruction.y] != 1 &&
                this.gameMatrix[gameInstruction.x][gameInstruction.y] != 3) {
                this.gameMatrix[gameInstruction.x][gameInstruction.y] = 0;
            }
        }
    }
}
exports.IntcodeMachine = IntcodeMachine;
//# sourceMappingURL=IntcodeMachine.js.map