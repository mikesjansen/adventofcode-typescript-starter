import { Day } from "../day";

const between = (val: number, start: number, end: number) => val >= start && val <= end;

const contained = (val: number[], range: number[]) => between(val[0], range[0], range[1]) && between(val[1], range[0], range[1]);

const overlaps = (val: number[], range: number[]) => between(val[0], range[0], range[1]) || between(val[1], range[0], range[1]);

class Day4 extends Day {

    constructor(){
        super(4);
    }

    solveForPartOne(input: string): string {
        return input.split(/\r?\n/)
            .map(l => l.split(','))
            .map(l => [l[0].split('-').map(Number), l[1].split('-').map(Number)])
            .map(r => (contained(r[0], r[1])) || (contained(r[1], r[0])) ? 1 : 0)
            .reduce((prev, curr) => prev + curr, 0 as number).toString();
    }

    solveForPartTwo(input: string): string {
        return input.split(/\r?\n/)
            .map(l => l.split(','))
            .map(l => [l[0].split('-').map(Number), l[1].split('-').map(Number)])
            .map(r => (overlaps(r[0], r[1]) || overlaps(r[1], r[0])) ? 1 : 0)
            .reduce((prev, curr) => prev + curr, 0 as number).toString();
    }
}

export default new Day4;