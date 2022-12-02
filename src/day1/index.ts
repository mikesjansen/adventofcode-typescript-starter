import { Day } from "../day";

const getElfArray = (input: string) => (input?.split(/\r?\n\r?\n/) ?? [])
    .map(e => e.split(/\r?\n/).reduce((prev, current) => prev + Number(current), 0))

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): string {
        const max = getElfArray(input)
            .reduce((prev, current) => prev > current ? prev : current, 0);
        return max.toString();
    }

    solveForPartTwo(input: string): string {
        const sums = getElfArray(input).sort((a, b) => b - a);
        return (sums[0]+sums[1]+sums[2]).toString();
    }
}

export default new Day1;