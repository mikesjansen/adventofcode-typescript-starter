import { Day } from "../day";

const processInput = (input: string): [string[][], string[]] => {
    const sections = input.split(/\r?\n\r?\n/);
    const cargo = sections[0].split(/\r?\n/).reverse();
    const numStacks = Number(cargo.shift()?.trim().split(/\s+/).pop());

    const stacks = Array.from(Array(numStacks), () => [] as string[])
    cargo.forEach(c => {
        for (let i = 0; i < numStacks; i++) {
            let item = c[1 + 4*i]?.trim();
            debugger;
            if (item) stacks[i].push(item);
        }
    });
    const commands = sections[1].split(/\r?\n/);
    return [stacks, commands];
}

const parseMove = (move: string) => {
    const vals = move.match(/move (\d+) from (\d+) to (\d+)/);
    return [Number(vals![1]), Number(vals![2]), Number(vals![3])]
}


class Day5 extends Day {

    constructor(){
        super(5);
    }

    solveForPartOne(input: string): string {
        const [stacks, commands] = processInput(input);
        commands.forEach(c => {
            const vals = parseMove(c);
            for (let i = 0; i < vals[0]; i++) {
                const crate = stacks[vals[1]-1].pop();
                stacks[vals[2] -1].push(crate!)
            }
        });

        return stacks.map(s => s.pop()).join('');
    }

    solveForPartTwo(input: string): string {
        const [stacks, commands] = processInput(input);
        
        commands.forEach(c => {
            const vals = parseMove(c);
            const inProcess = [];
            for (let i = 0; i < vals[0]; i++) {
                const crate = stacks[vals![1]-1].pop();
                inProcess.push(crate);
            }
            while(inProcess.length)  stacks[vals[2] -1].push(inProcess.pop()!)
        });

        return stacks.map(s => s.pop()).join('');
    }
}

export default new Day5;