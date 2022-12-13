import { Day } from "../day";

type Item = number | Item[];

type Result = 'eq' | boolean;

const validate = (left: Item, right: Item): Result => {
    if (Array.isArray(left) && Array.isArray(right)) {
        for(let i=0; i < left.length; i++) {
            if (right[i] === undefined) return false;
            const val = validate(left[i], right[i]);
            if (val !== 'eq') return val;
        }
        return left.length === right.length ? 'eq' : left.length < right.length;
    }
    else if (Array.isArray(left)) return validate(left, [right]);
    else if (Array.isArray(right)) return validate([left], right);
    else return left === right ? 'eq' : left < right;
}

class Day13 extends Day {

    constructor(){
        super(13);
    }

    solveForPartOne(input: string): string {
        const sum = input.trim().split(/\r?\n\r?\n/)
            .map(line => line.trim().split(/\r?\n/).map(p => JSON.parse(p) as Item))
            .map(pair => validate(pair[0], pair[1]))
            .map((s, i) => ({s, i: i+1}));

            return sum.filter(f => !!f.s)
            .reduce((prev, curr) => prev + curr.i, 0) + ''
    }

    solveForPartTwo(input: string): string {
        input = '[[2]]\n[[6]]\r\n\r\n' + input;
        const result  = input.trim().split(/\r?\n\r?\n/)
            .flatMap(line => line.trim().split(/\r?\n/).map(p => JSON.parse(p) as Item))
            .sort((a, b) => validate(a, b) ? -1 : 1)

        const index1 = result.findIndex(r => Array.isArray(r) && r.length === 1 && Array.isArray(r[0]) && r.length === 1 && (r[0][0] === 2)) + 1
        const index2 = result.findIndex(r => Array.isArray(r) && r.length === 1 && Array.isArray(r[0]) && r.length === 1 && (r[0][0] === 6)) + 1

        return '' +  (index1 * index2)
    }
}

export default new Day13;