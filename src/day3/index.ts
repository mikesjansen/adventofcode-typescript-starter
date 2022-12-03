import { Day } from "../day";

class Day3 extends Day {

    constructor(){
        super(3);
    }

    solveForPartOne(input: string): string {
        const results = input.split(/\r?\n/)
            .map((m) => {
                const first = new Set(m.substring(0, m.length/2).split(''));
                const second = new Set(m.substring(m.length/2).split(''));
                const intersection = [...first.values()].find(f => second.has(f));
                if (intersection! >= 'a' && intersection! <= 'z') return intersection!.charCodeAt(0) - 'a'.charCodeAt(0) + 1
                return intersection!.charCodeAt(0) - 'A'.charCodeAt(0) + 1 + 26;
            });
        return results!.reduce((prev, curr) => prev + curr, 0).toString();
    }

    solveForPartTwo(input: string): string {
        return input.split(/\r?\n/)
            .reduce((prev, curr, i) => {
                prev[Math.floor(i/3)] = (prev[Math.floor(i/3)] ?? []).concat(curr);
                return prev;
            }, [] as string[][])
            .reduce((prev, curr) => {
                const first = new Set(curr[0].split(''))
                const second = new Set(curr[1].split(''))
                const third = new Set(curr[2].split(''))
                const intersection = [...first.values()].find(f => second.has(f) && third.has(f));
                if (intersection! >= 'a' && intersection! <= 'z') return prev + intersection!.charCodeAt(0) - 'a'.charCodeAt(0) + 1
                return prev + intersection!.charCodeAt(0) - 'A'.charCodeAt(0) + 1 + 26;
            }, 0)
            .toString();
    }
}

export default new Day3;

//
//CTsVssjPTWPb
//zhfbfqqpbqJq