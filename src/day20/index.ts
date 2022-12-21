import { Day } from "../day";

type Node = {
    originalIndex: number;
    val: number;
}

const rotate = (rotated: Node[], iterations: number) => {
    for (let iteration = 0; iteration < iterations; iteration++) {
        console.log(iteration);
        for (let i =0; i < rotated.length; i++) {
            let idx = rotated.findIndex(f => f.originalIndex === i);
            const n = rotated[idx].val
            let toMove = n % (rotated.length -1) ;
            if (toMove > 0) {
                while(toMove--) {
                    if (idx+1 === rotated.length) {
                        const actual = rotated.pop()!;
                        const front = rotated.shift()!;
                        rotated.unshift(actual);
                        rotated.unshift(front);
                        idx =1;
                    }
                    else if (idx + 2 === rotated.length) {
                        const end = rotated.pop()!;
                        const actual = rotated.pop()!;
                        rotated.unshift(actual);
                        rotated.push(end);
                        idx = 0;
                    } else {
                        const next = rotated[idx+1];
                        rotated[idx+1] = rotated[idx];
                        rotated[idx] = next;
                        idx++;
                    }
                }
            }
            else {
                while(toMove++) {
                    if (idx === 0) {
                        const actual = rotated.shift()!;
                        const end = rotated.pop()!;
                        rotated.push(actual);
                        rotated.push(end);
                        idx = rotated.length - 2
                    } else if (idx === 1) {
                        const front = rotated.shift()!;
                        const actual = rotated.shift()!;
                        rotated.push(actual);
                        rotated.unshift(front);
                        idx= rotated.length -1;
                    }
                    else {
                        const next = rotated[idx-1];
                        rotated[idx-1] = rotated[idx];
                        rotated[idx] = next;
                        idx--;
                    }
                }
            }
        }
    }
    const zeroIndex = rotated.findIndex(f => f.val === (0));
    const sum = [1000, 2000, 3000].map(s => rotated[(zeroIndex+s)%rotated.length]).reduce((prev, curr) => prev + curr.val, (0));
    return sum;
}

class Day20 extends Day {

    constructor(){
        super(20);
    }

    solveForPartOne(input: string): string {
        const numbers = input.split(/\r?\n/).map(l => l.trim()).map(Number);
        const rotated = numbers.map((n, i) => ({ originalIndex: i, val: n}));
        return rotate(rotated, 1) + '';
    }

    solveForPartTwo(input: string): string {
        const numbers = input.split(/\r?\n/).map(l => l.trim()).map(Number);
        const rotated = numbers.map((n, i) => ({ originalIndex: i, val: (n) * (811589153)}));
        return rotate(rotated, 10) + '';
    }
}

export default new Day20;