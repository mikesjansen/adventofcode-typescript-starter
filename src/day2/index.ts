import { Day } from "../day";

const POINTS: Record<string, number> = {
    X: 1, Y: 2, Z:3
}

const ROUND1: Record<string, Record<string, number>> = {
    X: {
        A: 3,
        B: 0,
        C: 6
    },
    Y: {
        A: 6,
        B: 3,
        C: 0
    },
    Z: {
        A: 0,
        B: 6,
        C: 3,
    }
}

const ROUND2: Record<string, Record<string, string>> = {
    A: {
        X: 'Z',
        Y: 'X',
        Z: 'Y'
    },
    B: {
        X: 'X',
        Y: 'Y',
        Z: 'Z',
    },
    C: {
        X: 'Y',
        Y: 'Z',
        Z: 'X',
    }
}

const VICTORY: Record<string, number> = { X: 0, Y: 3, Z: 6};

class Day2 extends Day {

    constructor(){
        super(2);
    }

    solveForPartOne(input: string): string {
        const rounds = 
            input.split(/\r?\n/)
            .map(r => r.split(' '))
            .map(r => POINTS[r[1]] + ROUND1[r[1]][r[0]])
            .reduce((prev, curr) => prev + curr, 0);
        return rounds.toString();
    }

    solveForPartTwo(input: string): string {
        const rounds = 
            input.split(/\r?\n/)
            .map(r => r.split(' '))
            .map(r => POINTS[ROUND2[r[0]][r[1]]] + VICTORY[r[1]])
            .reduce((prev, curr) => prev + curr, 0);
        return rounds.toString();
    }
}


export default new Day2;