import { IIntCodeMachine, IntcodeMachine } from "./../Classes/IntcodeMachine";
import { day13Input } from "./Input";

// part 1
// const arcadeMachine: IIntCodeMachine = new IntcodeMachine(day13Input, 2);
// arcadeMachine.operateCode();
// 205

// part2
day13Input[0] = 2;
const arcadeMachine: IIntCodeMachine = new IntcodeMachine(day13Input, 2);
arcadeMachine.operateCode();
// 10292
