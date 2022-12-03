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
        let sum = 0;
        const lines = input.split(/\r?\n/);
        for(let i=0; i < lines.length; i+=3) {
            const first = new Set(lines[i].split(''))
            const second = new Set(lines[i+1].split(''))
            const third = new Set(lines[i+2].split(''))
            const intersection = [...first.values()].find(f => second.has(f) && third.has(f));
            if (intersection! >= 'a' && intersection! <= 'z') sum += intersection!.charCodeAt(0) - 'a'.charCodeAt(0) + 1
            else sum += intersection!.charCodeAt(0) - 'A'.charCodeAt(0) + 1 + 26;
        }
        return sum.toString();
    }
}

export default new Day3;

//
//CTsVssjPTWPb
//zhfbfqqpbqJq