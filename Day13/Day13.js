"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IntcodeMachine_1 = require("./../Classes/IntcodeMachine");
const Input_1 = require("./Input");
// part 1
// const arcadeMachine: IIntCodeMachine = new IntcodeMachine(day13Input, 2);
// arcadeMachine.operateCode();
// 205
// part2
Input_1.day13Input[0] = 2;
const arcadeMachine = new IntcodeMachine_1.IntcodeMachine(Input_1.day13Input, 2);
arcadeMachine.operateCode();
// 10292
//# sourceMappingURL=Day13.js.map