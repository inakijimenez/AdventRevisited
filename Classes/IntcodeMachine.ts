import { GameInstruction, IGameInstruction } from "./GameInstruction";
import { IRobot, Robot } from "./PaintingRobot";

export interface IInstruction {
  opCode: string;
  operacion: number;
  posicion1: number;
  modoPosicion1: number;
  posicion2: number;
  modoPosicion2: number;
  posicionResultado: number;
  modoPosicionResultado: number;
  input: number;
  pointerIncrease: number;
  decomposeOpCode();
}

export class Instruccion implements IInstruction {
  public opCode: string;
  public operacion: number;
  public posicion1: number;
  public modoPosicion1: number = 0;
  public posicion2: number;
  public modoPosicion2: number = 0;
  public posicionResultado: number;
  public modoPosicionResultado: number = 0;
  public input: number = null;
  public pointerIncrease: number = 4;
  constructor(codigo: number[]) {
    this.opCode = codigo[0].toString();
    this.decomposeOpCode();
    if (this.operacion == 3 || this.operacion == 4) {
      this.posicion1 = null;
      this.posicion2 = null;
      this.posicionResultado = codigo[1];
      this.pointerIncrease = 2;
    } else if (this.operacion == 5 || this.operacion == 6) {
      this.posicion1 = codigo[1];
      this.posicion2 = codigo[2];
      this.pointerIncrease = 3;
    } else if (this.operacion == 9) {
      this.posicion1 = codigo[1];
      this.pointerIncrease = 2;
    } else {
      this.posicion1 = codigo[1];
      this.posicion2 = codigo[2];
      this.posicionResultado = codigo[3];
      this.pointerIncrease = 4;
    }
  }

  public decomposeOpCode() {
    if (this.opCode.length == 1) {
      this.operacion = parseFloat(this.opCode);
      this.modoPosicion1 = 0;
      this.modoPosicion2 = 0;
      this.modoPosicionResultado = 0;
    } else {
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

export interface IIntCodeMachine {
  opIndex: number;
  input: number[];
  inputNumber: number;
  output: number;
  phase: number;
  relativeBaseOffset: number;
  operateCode(phase?: number, inputNumber?: number): number;
  paintGameMatrix(gameInstruction: IGameInstruction);
}

export class IntcodeMachine implements IIntCodeMachine {
  public opIndex: number = 0;
  public input: number[] = [];
  public inputNumber: number;
  public output: number;
  public phase: number;
  public relativeBaseOffset: number = 0;
  private phaseUsed: boolean = false;
  private robotMode: boolean = false;
  private arcadeMode: boolean = false;
  // Day13
  private gameMatrix: number[][] = [];
  private gameInstruction: IGameInstruction = null;
  private paintedBlocks: number = 0;
  private joystick: number = null;
  private ballPosition: number = 0;
  // Day11 part2
  private panel: number[][] = [[1]];
  // Day11 part1
  // private panel: number[][] = [[0]];
  private robot: IRobot = null;
  private paintedPanels: number = 0;
  // mode 1 = robot, 2 = arcade
  constructor(inputInstructions: number[], mode?: number) {
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
      this.robot = new Robot();
    }
  }

  public operateCode = (phase?: number, inputNumber?: number): number => {
    this.output = null;
    if (inputNumber != undefined) {
      this.inputNumber = inputNumber;
    }
    if (phase != undefined) {
      this.phase = phase;
    }

    let intructionReturn: number = 0;
    while (intructionReturn == 0 && this.opIndex <= this.input.length) {
      // operateInstruction
      const instruction = new Instruccion(this.input.slice(this.opIndex));
      const op1: number = !!instruction.modoPosicion1
        ? instruction.modoPosicion1 == 1
          ? instruction.posicion1
          : this.input[instruction.posicion1 + this.relativeBaseOffset]
        : this.input[instruction.posicion1];
      const op2: number = !!instruction.modoPosicion2
        ? instruction.modoPosicion2 == 1
          ? instruction.posicion2
          : this.input[instruction.posicion2 + this.relativeBaseOffset]
        : this.input[instruction.posicion2];
      const posicionResultado: number = !!instruction.modoPosicionResultado
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
              } else if (this.ballPosition > this.joystick) {
                instruction.input = 1;
                this.joystick++;
              } else {
                instruction.input = -1;
                this.joystick--;
              }
            } else {
              if (!this.phaseUsed) {
                this.phaseUsed = true;
                instruction.input = this.phase;
              } else {
                instruction.input = this.inputNumber;
              }
            }
          } else {
            // robot mode
            instruction.input =
              this.panel[this.robot.x] && this.panel[this.robot.x][this.robot.y]
                ? this.panel[this.robot.x][this.robot.y]
                : 0;
            if (
              this.panel[this.robot.x] == undefined ||
              this.panel[this.robot.x][this.robot.y] == undefined
            ) {
              this.paintedPanels++;
            }
          }

          if (instruction.modoPosicion1 == 0) {
            this.input[posicionResultado] = instruction.input;
          } else if (instruction.modoPosicion1 == 2) {
            const posicion = posicionResultado + this.relativeBaseOffset;
            this.input[posicion] = instruction.input;
          }
          break;
        }
        case 4: {
          const output: number = !!instruction.modoPosicion1
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
            } else {
              this.robot.painted = false;
              this.robot.moveRobot(output, 1);
            }
          } else if (this.arcadeMode) {
            if (!this.gameInstruction) {
              this.gameInstruction = new GameInstruction();
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
                } else {
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
          } else if (this.arcadeMode) {
            const blocks: number = this.countBlocks();
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

  private countBlocks(): number {
    return this.gameMatrix.reduce((rowAcc, row) => {
      return (
        rowAcc +
        row.reduce((pixelAcc, pixel) => {
          return pixel == 2 ? pixelAcc + 1 : pixelAcc;
        }, 0)
      );
    }, 0);
  }

  public paintGameMatrix(gameInstruction: IGameInstruction) {
    if (!this.gameMatrix[gameInstruction.x]) {
      this.gameMatrix[gameInstruction.x] = [];
    }
    if (!this.gameMatrix[gameInstruction.x][gameInstruction.y]) {
      if (gameInstruction.fill == 4) {
        this.ballPosition = gameInstruction.x;
      } else if (gameInstruction.fill == 3) {
        this.joystick = gameInstruction.x;
      }
      this.gameMatrix[gameInstruction.x][gameInstruction.y] = gameInstruction.fill;
      if (gameInstruction.fill == 2) {
        this.paintedBlocks++;
      }
    } else if (gameInstruction.fill === 4) {
      this.ballPosition = gameInstruction.x;
      if (
        this.gameMatrix[gameInstruction.x][gameInstruction.y] != 1 &&
        this.gameMatrix[gameInstruction.x][gameInstruction.y] != 3
      ) {
        this.gameMatrix[gameInstruction.x][gameInstruction.y] = 0;
      }
    }
  }
}
