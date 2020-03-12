export interface IRobot {
  x: number;
  y: number;
  direction: string;
  painted: boolean;
  moveRobot(dir: number, count: number);
}

export class Robot implements IRobot {
  public x: number = 0;
  public y: number = 0;
  public painted: boolean = false;
  public direction: string = "up";

  public moveRobot(dir: number, count: number = 1) {
    // dir 0 left
    // dir 1 right
    switch (this.direction) {
      case "up": {
        if (dir === 0) {
          this.direction = "left";
          this.x -= count;
        } else if (dir === 1) {
          this.direction = "right";
          this.x += count;
        }
        break;
      }
      case "down": {
        if (dir === 0) {
          this.direction = "right";
          this.x += count;
        } else if (dir === 1) {
          this.direction = "left";
          this.x -= count;
        }
        break;
      }
      case "right": {
        if (dir === 0) {
          this.direction = "up";
          this.y += count;
        } else if (dir === 1) {
          this.direction = "down";
          this.y -= count;
        }
        break;
      }
      case "left": {
        if (dir === 0) {
          this.direction = "down";
          this.y -= count;
        } else if (dir === 1) {
          this.direction = "up";
          this.y += count;
        }
        break;
      }
    }
  }
}
