"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Robot {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.painted = false;
        this.direction = "up";
    }
    moveRobot(dir, count = 1) {
        // dir 0 left
        // dir 1 right
        switch (this.direction) {
            case "up": {
                if (dir === 0) {
                    this.direction = "left";
                    this.x -= count;
                }
                else if (dir === 1) {
                    this.direction = "right";
                    this.x += count;
                }
                break;
            }
            case "down": {
                if (dir === 0) {
                    this.direction = "right";
                    this.x += count;
                }
                else if (dir === 1) {
                    this.direction = "left";
                    this.x -= count;
                }
                break;
            }
            case "right": {
                if (dir === 0) {
                    this.direction = "up";
                    this.y += count;
                }
                else if (dir === 1) {
                    this.direction = "down";
                    this.y -= count;
                }
                break;
            }
            case "left": {
                if (dir === 0) {
                    this.direction = "down";
                    this.y -= count;
                }
                else if (dir === 1) {
                    this.direction = "up";
                    this.y += count;
                }
                break;
            }
        }
    }
}
exports.Robot = Robot;
//# sourceMappingURL=PaintingRobot.js.map