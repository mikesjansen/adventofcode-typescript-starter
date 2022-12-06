import { count } from "console";
import { Day } from "../day";

const findMarker = (input: string, size: number) => {
    const counts = new Map<string, number>();
    for(let i=0; i < input.length; i++) {
        const old = input[i-size];
        const toAdd = input[i];
        if (counts.has(old)) counts.set(old, counts.get(old)! - 1);
        if (counts.get(old) === 0) counts.delete(old);
        counts.set(toAdd, (counts.get(toAdd) ?? 0) + 1);
        if (counts.size === size) return (i+1).toString();
    }
    return '';
}

class Day6 extends Day {

    constructor(){
        super(6);
    }

    solveForPartOne(input: string): string {
        return findMarker(input, 4);
    }

    solveForPartTwo(input: string): string {
        return findMarker(input, 14);
    }
}

export default new Day6;