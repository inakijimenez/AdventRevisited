export interface ICoordinates {
  x: number;
  y: number;
  z: number;
}

export class Coordinates implements ICoordinates {
  public x: number = 0;
  public y: number = 0;
  public z: number = 0;
}

export interface IMoon {
  position: ICoordinates;
  velocity: ICoordinates;
  calculateGravity(otherMoon: IMoon[], gravity: number): ICoordinates;
  updateVelocity(gravity: ICoordinates);
  updatePosition();
  getTotalEnergy(): number;
}

export class Moon implements IMoon {
  public position: ICoordinates = new Coordinates();
  public velocity: ICoordinates = new Coordinates();
  public calculateGravity(otherMoons: IMoon[], gravity: number): ICoordinates {
    return otherMoons.reduce((acc, moon) => {
      const velocitychange: ICoordinates = new Coordinates();
      Object.keys(velocitychange).forEach(k => {
        if (this.position[k] < moon.position[k]) {
          acc[k] += gravity;
        } else if (this.position[k] > moon.position[k]) {
          acc[k] -= gravity;
        }
        // acc[k] =
        //   this.position[k] < moon.position[k]
        //     ? acc[k] + gravity
        //     : this.position[k] > moon.position[k]
        //     ? acc[k] + gravity * -1
        //     : 0;
      });
      return acc;
    }, new Coordinates());
  }
  public updateVelocity(gravity: ICoordinates) {
    Object.keys(gravity).forEach(k => {
      this.velocity[k] += gravity[k];
    });
  }
  public updatePosition() {
    Object.keys(this.position).forEach(k => {
      this.position[k] += this.velocity[k];
    });
  }

  public getTotalEnergy(): number {
    return this.getKineticEnergy() * this.getPotentialEnergy();
  }
  private getPotentialEnergy(): number {
    return Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z);
  }
  private getKineticEnergy(): number {
    return Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z);
  }
}
