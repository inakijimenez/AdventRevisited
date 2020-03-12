"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coordinates {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
}
exports.Coordinates = Coordinates;
class Moon {
    constructor() {
        this.position = new Coordinates();
        this.velocity = new Coordinates();
    }
    calculateGravity(otherMoons, gravity) {
        return otherMoons.reduce((acc, moon) => {
            const velocitychange = new Coordinates();
            Object.keys(velocitychange).forEach(k => {
                if (this.position[k] < moon.position[k]) {
                    acc[k] += gravity;
                }
                else if (this.position[k] > moon.position[k]) {
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
    updateVelocity(gravity) {
        Object.keys(gravity).forEach(k => {
            this.velocity[k] += gravity[k];
        });
    }
    updatePosition() {
        Object.keys(this.position).forEach(k => {
            this.position[k] += this.velocity[k];
        });
    }
    getTotalEnergy() {
        return this.getKineticEnergy() * this.getPotentialEnergy();
    }
    getPotentialEnergy() {
        return Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z);
    }
    getKineticEnergy() {
        return Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z);
    }
}
exports.Moon = Moon;
//# sourceMappingURL=Moon.js.map