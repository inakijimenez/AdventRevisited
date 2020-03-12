"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IntcodeMachine_1 = require("./../Classes/IntcodeMachine");
const Input_1 = require("./Input");
// const machine: IIntCodeMachine = new IntcodeMachine(day9Test1);
// const machine: IIntCodeMachine = new IntcodeMachine(day9Test2);
const machine = new IntcodeMachine_1.IntcodeMachine(Input_1.day9Input);
// part 1
// machine.operateCode(1);
// part 2
machine.operateCode(2);
//# sourceMappingURL=Day9.js.map