import { Day } from "../day";

const getCycles = (input: string) => {
    const commands = input.split(/\r?\n/).map(c => c.split(' '));
        
    const cycles = [] as number[];
    let x = 1;
    commands.forEach(c => {
        if (c[0] === 'noop') {
            cycles.push(x);
        }
        else {
            cycles.push(x, x);
            x += Number(c[1])
        }

    });
    cycles.push(x);
    return cycles;
}

class Day10 extends Day {

    constructor(){
        super(10);
    }

    solveForPartOne(input: string): string {
        const cycles = getCycles(input);

        const total =
            [20, 60, 100, 140, 180, 220]
                .map(c => cycles[c-1] * c)
                .reduce((prev, curr) => prev + curr, 0)

        console.log(cycles[19])
        return total + '';
    }

    solveForPartTwo(input: string): string {
        const cycles = getCycles(input);

        const results = cycles.map((c, i) => {
            if (Math.abs(c - i % 40) <= 1) return '#';
            return '.'
        });

        return '\n' + results.join('').match(/.{1,40}/g)?.join('\n')
    }
}

export default new Day10;