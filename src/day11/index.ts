import { Day } from "../day";

interface Monkey {
    items: number[];
    // incoming: number[];
    operation: (old: number) => number;
    throw: (score: number) => number;
    inspected: number;
    mod: number;
}

const getOperation = (line: string) => {
    const match = line.match(/: new = (.*) ([+*]) (.*)/);
    return (old: number) => {
        const op1: number = match![1] === 'old' ? old : Number(match![1]);
        const op2: number = match![3] === 'old' ? old : Number(match![3]);
        return match![2] === '+' ? op1 + op2 : op1 * op2;
    }
};

const getThrow = (testLine: string, trueLine: string, falseLine: string) => {
    const test = Number(testLine.match(/(\d+)$/)![1]);
    const yes = Number(trueLine.match(/(\d+)$/)![1]);
    const no = Number(falseLine.match(/(\d+)$/)![1]);
    return (score: number) => score % test === (Number(0)) ? yes : no;
}

const getMonkey = (lines: string[]): Monkey => ({
    items: lines[1].match(/: (.+)$/)![1].split(', ').map(Number),
    // incoming: [],
    operation: getOperation(lines[2]),
    throw: getThrow(lines[3], lines[4], lines[5]),
    inspected: Number(0),
    mod: Number(lines[3].match(/(\d+)$/)![1]),
});

class Day11 extends Day {

    constructor(){
        super(11);
    }

    solveForPartOne(input: string): string {

        const monkeys = input.split(/\r?\n\r?\n/)
            .map(m => getMonkey(m.split(/\r?\n/)));

        for(let round =0; round < 20; round++) {
             monkeys.forEach(monkey => {
               monkey.items.forEach(item => {
                    const score = Math.floor(monkey.operation(item)/Number(3));
                    const target = monkey.throw(score);
                    monkeys[target].items.push(score);
                    monkey.inspected++;
                })
                monkey.items = [];
            })
        }
        const sorted =  monkeys.sort((a, b) => b.inspected - a.inspected)
        return (sorted[0].inspected * sorted[1].inspected) + '';
    }

    solveForPartTwo(input: string): string {
        const monkeys = input.split(/\r?\n\r?\n/)
            .map(m => getMonkey(m.split(/\r?\n/)));

        const max = monkeys.reduce((prev, curr) => prev * curr.mod, 1);

        for(let round =0; round < 10000; round++) {
            monkeys.forEach((monkey, i) => {
                monkey.items.forEach(item => {
                    const score = (monkey.operation(item)) % max;
                    const target = monkey.throw(score);
                    monkeys[target].items.push(score);
                    monkey.inspected++;
                })
                monkey.items = [];
            })
        }
        const sorted =  monkeys.sort((a, b) => b.inspected > a.inspected ? 1 : -1)
        return (sorted[0].inspected * sorted[1].inspected) + '';
    }
}

export default new Day11;