import { Day } from "../day";
import { inspect } from 'util'
import { OutgoingMessage } from "http";
import { INSPECT_MAX_BYTES } from "buffer";
import { openStdin } from "process";

type File = { size: number }

type Directory = {
    [k: string]: Directory | File
}

function isFile (item: Directory | File): item is File { return !!item.size; }

const calculateSize = (dir: Directory, ref: { sum: number }, sizes: number[]): number => {
    const contents = Object.keys(dir).filter(k => k !== '..');
    const sum = contents.reduce((prev, curr) => {
        const item = dir[curr];
        if (isFile(item)) return prev + item.size;
        else {
            return prev + calculateSize(item, ref, sizes);
        }
    }, 0);
    if (sum <= 100000) ref.sum += sum;
    sizes.push(sum);
    return sum;
}

const getRoot = (input: string) => {
    const root: Directory = {};
    let current = root;
    const lines = input.split(/\r?\n/);
    for (let i=0; i < lines.length; i++) {
        const line = lines[i];
        if (line === '$ ls') {
            while (lines[++i] && !lines[i].startsWith('$')) {
                const [first, name] = lines[i].split(' ');
                if (!Number.isNaN(+first)) current[name] = { size: +first };
                else current[name] = { '..': current };
            }
            i--;
        }
        else if (line === '$ cd /') {
            current = root;
        }
        // only thing left is cd x 
        else {
            const targetName = line.match(/\$ cd (.*)/)![1];
            const target = current[targetName];
            if (!isFile(target)) current = target;
        }
    }
    return root;
}

class Day7 extends Day {

    constructor(){
        super(7);
    }

    solveForPartOne(input: string): string {
        const root = getRoot(input);

        const total = { sum: 0}
        const sum = calculateSize(root, total, []);
        return total.sum + '';
    }

    solveForPartTwo(input: string): string {
        const root = getRoot(input);

        const total = { sum: 0}
        const sums = [] as number[];
        const usedSpace = calculateSize(root, total, sums);
        const totalSpace = 70000000;
        const unusedSpace = totalSpace - usedSpace;
        const neededSpace = 30000000 - unusedSpace;
        return sums.sort((a, b) => a - b).filter(a => a >  neededSpace)[0] + ''

    }
}

export default new Day7;