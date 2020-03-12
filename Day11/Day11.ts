import { IntcodeMachine } from "./../Classes/IntcodeMachine";
import { inputDay11 } from "./Input";

const brain = new IntcodeMachine(inputDay11, 1);
// part 1
brain.operateCode();
// 2238
// part2
// De lado y con remapeo de indices negativos a mano
// PKFPAZRP
