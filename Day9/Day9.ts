import { IIntCodeMachine, IntcodeMachine } from "./../Classes/IntcodeMachine";
import { day9Input, day9Test1, day9Test2 } from "./Input";

// const machine: IIntCodeMachine = new IntcodeMachine(day9Test1);
// const machine: IIntCodeMachine = new IntcodeMachine(day9Test2);
const machine: IIntCodeMachine = new IntcodeMachine(day9Input);
// part 1
// machine.operateCode(1);
// part 2
machine.operateCode(2);
