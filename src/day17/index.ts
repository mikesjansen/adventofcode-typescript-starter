import { readFileSync } from "fs";
import { getgid } from "process";
import { Day } from "../day";

const shapes = [
    (grid: string[][]) =>( {
        canLeft: (position: [number, number]) => {
            if (position[1] == 0) return false;
            if (grid[position[0]][position[1] - 1] === '#') return false;
            return true;
        },
        canRight: (position: [number, number]) => {
            if (position[1] + 4 >= 7) return false;
            if (grid[position[0]][position[1]+4] === '#') return false;
            return true;
        },
        canDown: (position: [number, number]) => {
            if (position[0] - 1 < 0) return false;
            for (let i = 0; i < 4; i++)
                if (grid[position[0] - 1][position[1] + i] === '#') return false;
            return true;
        },
        place: (position: [number, number], char: string) => {
            for (let i = 0; i < 4; i++)
                grid[position[0]][position[1] + i] = char;
        },
        height: 3
    }),
    (grid: string[][]) =>( {
        canLeft: (position: [number, number]) => {
            if (position[1] == 0) return false;
            if (grid[position[0]][position[1] ] === '#') return false;
            if (grid[position[0] - 1][position[1] - 1] === '#') return false;
            if (grid[position[0] - 2][position[1] ] === '#') return false;
            return true;
        },
        canRight: (position: [number, number]) => {
            if (position[1] + 3  >= 7) return false;
            if (grid[position[0]][position[1] + 2 ] === '#') return false;
            if (grid[position[0] - 1][position[1] + 3] === '#') return false;
            if (grid[position[0] - 2][position[1] + 2] === '#') return false;
            return true;
        },
        canDown: (position: [number, number]) => {
            if (position[0] - 3 < 0) return false;
            if (grid[position[0] - 2][position[1]] === '#') return false;
            if (grid[position[0] - 3][position[1] + 1] === '#') return false;
            if (grid[position[0] - 2][position[1] + 2] === '#') return false;
            return true;
        },
        place: (position: [number, number], char: string) => {
            grid[position[0]][position[1] + 1] = char;
            grid[position[0] - 1][position[1]] = char;
            grid[position[0] - 1][position[1] + 1] = char;
            grid[position[0] - 1][position[1] + 2] = char;
            grid[position[0] - 2][position[1] + 1] = char;
        },
        height: 5,
    }),
    (grid: string[][]) =>( {
        canLeft: (position: [number, number]) => {
            if (position[1] == 0) return false;
            if (grid[position[0]][position[1] + 1 ] === '#') return false;
            if (grid[position[0] - 1][position[1] + 1] === '#') return false;
            if (grid[position[0] - 2][position[1] - 1] === '#') return false;
            return true;
        },
        canRight: (position: [number, number]) => {
            if (position[1] + 3 >= 7) return false;
            if (grid[position[0]][position[1] + 3 ] === '#') return false;
            if (grid[position[0] - 1][position[1] + 3] === '#') return false;
            if (grid[position[0] - 2][position[1] + 3] === '#') return false;
            return true;
        },
        canDown: (position: [number, number]) => {
            if (position[0] - 3 < 0 ) return false;
            for (let i = 0; i < 3; i++)
                if (grid[position[0] - 3][position[1] + i] === '#') return false;
            return true;
        },
        place: (position: [number, number], char: string) => {
            grid[position[0]][position[1] + 2] = char;
            grid[position[0] - 1][position[1] + 2] = char;
            grid[position[0] - 2][position[1] + 2] = char;
            grid[position[0] - 2][position[1] + 1] = char;
            grid[position[0] - 2][position[1] + 0] = char;
        },
        height: 5
    }),
    (grid: string[][]) =>( {
        canLeft: (position: [number, number]) => {
            if (position[1] == 0) return false;
            for (let i = 0; i < 4; i++)
                if (grid[position[0] - i][position[1] - 1] === '#') return false;
            return true;
        },
        canRight: (position: [number, number]) => {
            if (position[1] + 1 >= 7) return false;
            for (let i = 0; i < 4; i++)
            if (grid[position[0] - i][position[1] + 1] === '#') return false;
            return true;
        },
        canDown: (position: [number, number]) => {
            if (position[0] - 4 < 0) return false;
            if (grid[position[0] - 4][position[1]] === '#') return false;
            return true;
        },
        place: (position: [number, number], char: string) => {
            for (let i = 0; i < 4; i++)
                grid[position[0] - i ][position[1]] = char;
        },
        height: 6
    }),
    (grid: string[][]) =>( {
        canLeft: (position: [number, number]) => {
            if (position[1] == 0) return false;
            if (grid[position[0]][position[1] - 1] === '#') return false;
            if (grid[position[0] - 1][position[1] - 1] === '#') return false;
            return true;
        },
        canRight: (position: [number, number]) => {
            if (position[1] + 2 >= 7) return false
            if (grid[position[0]][position[1] + 2] === '#') return false;
            if (grid[position[0] - 1][position[1] + 2] === '#') return false;
            return true;
        },
        canDown: (position: [number, number]) => {
            if (position[0] - 2 < 0) return false;
            if (grid[position[0] - 2][position[1]] === '#') return false;
            if (grid[position[0] - 2][position[1] + 1] === '#') return false;
            return true;
        },
        place: (position: [number, number], char: string) => {
            grid[position[0]][position[1]] = char;
            grid[position[0]][position[1] + 1] = char;
            grid[position[0] - 1][position[1]] = char;
            grid[position[0] - 1][position[1] + 1] = char;
        },
        height: 4
    }),
]

const getTopRows = (grid: string[][], maxHeight: number, rows: number) => {
    return grid.slice(maxHeight - rows, maxHeight).map(r => r.join('')).join('');
}

const print = (board: string[][], maxHeight: number) => {
    console.log(getGrid(board, maxHeight))
}

const getGrid = (board: string[][], maxHeight: number) =>
    board.slice(0, maxHeight + 3).reverse().map(b => b.join('')).join('\n')

const process = (input: string, numBlocks: number) => {
    const jets = input.split('');
        const board = Array(2022000 * 4).fill('').map(a => Array(7).fill('.'))
        let maxHeight = 0;
        const seenHeights = new Map<number, number>();
        let y = 0;
        const cache = new Map<string, {i: number; maxHeight: number }>();
        for (let i = 0; i < numBlocks ; i++) {
            const shape = shapes[i % shapes.length](board);
            const current = [maxHeight + shape.height , 2] as [number, number];
            const printCurrent = (dir: string) => {
                if (i !== -14) return;
                shape.place(current, '@');
                print(board, maxHeight+ shape.height + 1);
                shape.place(current, '.')
                console.log(dir)
            }
            const key = `${i % shapes.length}:${y}:${getTopRows(board, maxHeight, 100)}`;
            const loop = cache.get(key);
            if (loop) {
                if (loop) console.log(loop);
                const remaining = numBlocks - i;
                const iDiff = i - loop.i
                const heightDiff = maxHeight - seenHeights.get(loop.i - 1)! - 1;
                const multiples = Math.floor(remaining/iDiff);
                
                i += (iDiff)* multiples;
                maxHeight += heightDiff * multiples;
                const extraToRun = remaining % iDiff;
                const partial = seenHeights.get(loop.i + extraToRun)!;
                maxHeight = maxHeight + partial - seenHeights.get(loop.i)!
                return maxHeight + '';
            }
            while(true) {
                
                printCurrent(jets[y]);
               if (jets[y] == '>') {
                if (shape.canRight(current)) {
                    current[1]++;
                }
               } else {
                if (shape.canLeft(current)) current[1]--;
               }

               y = (y + 1) % jets.length;
               if (shape.canDown(current)) {
                current[0]--;
                }
               else {
                shape.place(current, '#');
                const newMaxHeight = Math.max(maxHeight, current[0] + 1);
                if (i > 100) cache.set(key, {i, maxHeight: newMaxHeight});
                maxHeight = newMaxHeight;
                seenHeights.set(i+1, maxHeight);
                break;
               }
               
            }
        }
        return maxHeight + '';
}

class Day17 extends Day {

    constructor(){
        super(17);
    }

    solveForPartOne(input: string): string {
        return process(input, 2022);
    }

    solveForPartTwo(input: string): string {
        return process(input, 100000000000);
    }
}

export default new Day17;