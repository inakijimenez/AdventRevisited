import { IIntCodeMachine, IntcodeMachine } from "./../Classes/IntcodeMachine";
import { day5Input, test1, test2, test3, test5 } from "./Input";

// part 1
// const intCodeMachine: IIntCodeMachine = new IntcodeMachine(day5Input, 1);
// part 2
const intCodeMachine: IIntCodeMachine = new IntcodeMachine(day5Input);
// const intCodeMachine: IIntCodeMachine = new IntcodeMachine(test1);
// const intCodeMachine: IIntCodeMachine = new IntcodeMachine(test2, 9);
// const intCodeMachine: IIntCodeMachine = new IntcodeMachine(test3, 9);
// const intCodeMachine: IIntCodeMachine = new IntcodeMachine(test5, 0);
intCodeMachine.operateCode(5);
