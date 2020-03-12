"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IntcodeMachine_1 = require("./../Classes/IntcodeMachine");
const Input_1 = require("./Input");
const brain = new IntcodeMachine_1.IntcodeMachine(Input_1.inputDay11, 1);
// part 1
brain.operateCode();
// 2238
// part2
// De lado y con remapeo de indices negativos a mano
// PKFPAZRP
//# sourceMappingURL=Day11.js.map