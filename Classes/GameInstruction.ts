export interface IGameInstruction {
  x: number;
  y: number;
  fill: number;
  outputcount: number;
}

export class GameInstruction implements IGameInstruction {
  public x: number = 0;
  public y: number = 0;
  public fill: number = 0;
  public outputcount: number = 0;
}
