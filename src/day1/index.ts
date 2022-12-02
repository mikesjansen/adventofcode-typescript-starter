import { Day } from "../day";

const getElfArray = (input: string) => (input?.split(/\r?\n\r?\n/) ?? [])
    .map(e => e.split(/\r?\n/).reduce((prev, current) => prev + Number(current), 0))

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): string {
        const elves = input?.split(/\r?\n\r?\n/) ?? [];
        const max = getElfArray(input)
            .reduce((prev, current) => prev > current ? prev : current, 0);
        return max.toString();
    }

    solveForPartTwo(input: string): string {
        const elves = input?.split(/\r?\n\r?\n/) ?? [];
        const sums = getElfArray(input).sort((a, b) => b - a);
        debugger
        return (sums[0]+sums[1]+sums[2]).toString();
    }

    getElfArray(input: string) {
        return 
    }
}

export default new Day1;