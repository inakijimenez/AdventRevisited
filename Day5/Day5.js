"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IntcodeMachine_1 = require("./../Classes/IntcodeMachine");
const Input_1 = require("./Input");
// part 1
// const intCodeMachine: IIntCodeMachine = new IntcodeMachine(day5Input, 1);
// part 2
const intCodeMachine = new IntcodeMachine_1.IntcodeMachine(Input_1.day5Input);
// const intCodeMachine: IIntCodeMachine = new IntcodeMachine(test1);
// const intCodeMachine: IIntCodeMachine = new IntcodeMachine(test2, 9);
// const intCodeMachine: IIntCodeMachine = new IntcodeMachine(test3, 9);
// const intCodeMachine: IIntCodeMachine = new IntcodeMachine(test5, 0);
intCodeMachine.operateCode(5);
//# sourceMappingURL=Day5.js.map