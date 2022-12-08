import { Day } from "../day";

interface Tree {
    id: number;
    val: number;
}

class Day8 extends Day {

    constructor(){
        super(8);
    }

    solveForPartOne(input: string): string {
        let id = 0;
        const grid = input.split(/\r?\n/)
            .map(row => row.split('').map(cell => ({ id: id++, val: Number(cell)})));

        const visible = new Set<number>();

        const markVisible = (list: Tree[]) => {
            let highest = -1;
            for(let i=0; i< list.length; i++) {
                if (list[i].val > highest) {
                    highest = list[i].val;
                    visible.add(list[i].id)
                }
            }
        }
        
        grid.forEach(row => {
            markVisible(row);
            markVisible(row.reverse())
        })

        grid[0].forEach((c, i) => {
            const column = grid.map((_, row) => grid[row][i])
            markVisible(column)
            markVisible(column.reverse())
        });

        return visible.size + '';
    }

    solveForPartTwo(input: string): string {
        let id = 0;
        const grid = input.split(/\r?\n/)
            .map(row => row.split('').map(cell => ({ id: id++, val: Number(cell)})));

        const getScore = (row: number, col: number) => {
            if (row === 0 || row === grid.length -1) return 0;
            if (col === 0 || col === grid[0].length -1) return 0;
            let score = 1;
            const val = grid[row][col].val;
            
            let index = grid.slice(0, row).reverse().findIndex(r => r[col].val >= val);
            score *= index >=0 ? index + 1 : row;

            index = grid.slice(row + 1).findIndex(r => r[col].val >= val);
            score *= index >= 0 ? index + 1 : grid.length - row - 1;

            index = grid[row].slice(0, col).reverse().findIndex( r => r.val >= val);
            score *= index >= 0 ? index + 1 : col;

            index = grid[row].slice(col+1).findIndex(r =>  r.val >= val);
            score *= index >= 0 ? index +1 : grid[0].length - col - 1;

            return score;
        }

        let maxScore = 0;
        for(let row = 0; row < grid.length; row++) 
            for(let col =0; col < grid[row].length; col++) {
                const score = getScore(row, col);
                maxScore = Math.max(maxScore, score);
            }

        return maxScore + '';
    }
}

export default new Day8;