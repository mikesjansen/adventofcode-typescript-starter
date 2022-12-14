import { getgid } from "process";
import { Day } from "../day";


const print = (grid: string[][]) => {
    console.log(grid.map(row => row.join('')).join('\n'));
};

const getMax = (lines: number[][][]) =>  lines
    .flatMap(line => line)
    .reduce((prev, curr) => [Math.min(prev[0], curr[0]), Math.max(prev[1], curr[0]), Math.max(prev[2], curr[1])], [Infinity, 0, 0]);

const pourSand = (grid: string[][], xOffset: number, part: number) => {
    let moreSand = true;

        let numDropped = 0;

        while(moreSand) {
            let point = [0, 500 - xOffset];
            let stopped = false;
            while (!stopped) {
                if (!grid[point[0]+1]) {
                    stopped = true;
                    moreSand = false;
                }
                else if (grid[point[0]+1][point[1]] === '.') {
                    point = [point[0]+1,point[1]]
                } else if (!grid[point[0]+1][point[1] - 1]) {
                    stopped = true;
                    moreSand = false;
                } else if (grid[point[0]+1][point[1] - 1] === '.') {
                    point = [point[0]+1,point[1] -1]
                } else if (!grid[point[0]+1][point[1] + 1]) { 
                    stopped = true;
                    moreSand = false;
                } else if (grid[point[0]+1][point[1] + 1] === '.') {
                    point = [point[0]+1,point[1] + 1]
                }
                else {
                    stopped = true;
                }
            }
            
            if (moreSand) {
                grid[point[0]][point[1]] = 'o';
                numDropped++;
            }
            if (part === 2 && stopped && point[0] === 0 && point[1] === 500 - xOffset) {
                moreSand = false;
            }
        }
        return numDropped;
}

const getGrid = (lines: number[][][], max: number[]) => {
    const grid = Array(max[2] + 1).fill('').map(() => Array(max[1] - max[0] + 1).fill('.'));
    const xOffset = max[0];
    grid[0][500 - xOffset] = '+';

    lines.forEach(line => {
        for(let i=0; i< line.length - 1; i++) {
            const start = line[i];
            const end = line[i+1];
            if (start[0] === end[0]) {
                if (start[1] > end[1]) {

                    for(let j = start[1]; j >= end[1]; j--) grid[j][start[0] - xOffset] = '#';
                } else {
                    for(let j = start[1]; j <= end[1]; j++) grid[j][start[0] - xOffset] = '#';
                }
            } else {
                if(start[0] > end[0]) {
                    for (let j = start[0]; j >= end[0]; j--) grid[start[1]][j - xOffset] = '#'
                } else {
                    for (let j = start[0]; j <= end[0]; j++) grid[start[1]][j - xOffset] = '#'
                }
            }
        }
    });
    return grid;
} 

class Day14 extends Day {

    constructor(){
        super(14);
    }

    solveForPartOne(input: string): string {
        const lines = input.split(/\r?\n/).map(line => line.split(' -> ').map(point => point.split(',').map(Number)));

        const max = getMax(lines);

        const xOffset = max[0];
        const grid = getGrid(lines, max);

        const numDropped = pourSand(grid, xOffset, 1);

        // print(grid);
        return numDropped + '';
    }

    solveForPartTwo(input: string): string {
        const lines = input.split(/\r?\n/).map(line => line.split(' -> ').map(point => point.split(',').map(Number)));

        const max = getMax(lines);
        // I could just do the math and figure out the max possible base of a triangle for height h
        // but I'm lazy and 1000 is plenty
        max[0] = 0;
        max[1] = 1000;
        max[2] += 2;
        const xOffset = max[0];
        const grid = getGrid(lines, max)

        for(let i =0; i < grid[grid.length-1].length; i++) grid[grid.length -1][i] = '#';

        const numDropped = pourSand(grid, xOffset, 2);

        // print(grid);
        return numDropped + '';
    }
}

export default new Day14;