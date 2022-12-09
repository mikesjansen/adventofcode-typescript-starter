import { Day } from "../day";

type Coord = [number, number]
const getKey = (coord: Coord) => `${coord[0]},${coord[1]}`;

const getGrid = (head: Coord, tails: Coord[]) => {
    const extremes = tails.reduce((prev, curr) => ({
        r1: Math.min(prev.r1, curr[1]),
        r2: Math.max(prev.r2, curr[1]),
        c1: Math.min(prev.c1, curr[0]),
        c2: Math.max(prev.c2, curr[0])
    }), {c1: head[0], c2: head[0], r1: head[1], r2: head[1]});

    const grid = Array(extremes.r2 - extremes.r1 + 1).fill(extremes.c2 - extremes.c1 + 1)
        .map(a => Array(a).fill('.'));
    
    grid[grid.length - 1][0 - extremes.c1] = 's';

    for (let i = tails.length -1; i >=0; i--) {
        const t = tails[i];
        try {
        grid[grid.length - t[1] - 1][t[0] - extremes.c1] = i + 1;}
        catch (e) {
            throw e;
        }
    }

    grid[grid.length - head[1] - 1][head[0] - extremes.c1] = 'H';

   return '\n' + grid.map(g => g.join(' ')).join('\n');

}

const print = (heads: Coord, tails: Coord[]) => console.log(getGrid(heads, tails));

class Day9 extends Day {

    constructor(){
        super(9);
    }

    solveForPartOne(input: string): string {
        const moves = input.split(/\r?\n/);
        let tail: Coord = [0,0];
        let head: Coord = [0,0];
        const tailLocations = new Set<string>([getKey(tail)]);

        moves.forEach(m => {
            const [dir, num] = m.split(' ');
            if (dir === 'R') {
                for(let i=0; i< Number(num); i++) {
                    head[0]++;
                    if (head[0] - 1 > tail[0]) {
                        tail[0]++;
                        if (head[1] !== tail[1]) tail[1]  = head[1];
                    }
                    tailLocations.add(getKey(tail));
                }
            }
            if (dir === 'L') {
                for(let i=0; i< Number(num); i++) {
                    head[0]--;
                    if (head[0] + 1 < tail[0]) {
                        tail[0]--;
                        if (head[1] !== tail[1]) tail[1]  = head[1];
                    }
                    tailLocations.add(getKey(tail));
                }
            }
            if (dir === 'U') {
                for(let i=0; i< Number(num); i++) {

                    head[1]++;
                    if (head[1] - 1 > tail[1]) {
                        tail[1]++;
                        if (head[0] !== tail[0]) tail[0]  = head[0];
                    }
                    tailLocations.add(getKey(tail));
                }
            }
            if (dir === 'D') {
                for(let i=0; i< Number(num); i++) {
                    
                    head[1]--;
                    if (head[1] + 1 < tail[1]) {
                        tail[1]--;
                        if (head[0] !== tail[0]) tail[0]  = head[0];
                    }
                    tailLocations.add(getKey(tail));
                }
            }
        });

       
        return tailLocations.size + ''
    }

    solveForPartTwo(input: string): string {
        const moves = input.split(/\r?\n/);
        let tails: Coord[] = new Array(9).fill(0).map(() => [0,0] as Coord);
        let head: Coord = [0,0];
        const tailLocations = new Set<string>([getKey(tails[8])]);

        moves.forEach(m => {
            const [dir, num] = m.split(' ');

            
            for(let i=0; i< Number(num); i++) {
                let lastMove = [0,0];
                switch (dir) {
                    case 'U': lastMove = [0, 1]; break;
                    case 'D': lastMove = [0, -1]; break;
                    case 'L': lastMove = [-1, 0]; break;
                    case 'R': lastMove = [1, 0]; break;
                }
                head[0] += lastMove[0];
                head[1] += lastMove[1];
                let lead = head;
                let follow = tails[0];
                for (let j = 1; j < 10; j++) {
                    const currMove = [0, 0];
                    if (lastMove[0]) {
                        if (Math.abs(lead[0] - follow[0]) > 1) {
                            currMove[0] = lastMove[0];
                            if (follow[1] < lead[1]) currMove[1]++
                            if (follow[1] > lead[1]) currMove[1]--
                        }
                    }
                    if (lastMove[1] && !currMove[1]) {
                        if (Math.abs(lead[1] - follow[1]) > 1) {
                            currMove[1] = lastMove[1];
                            if (follow[0] < lead[0]) currMove[0]++;
                            if (follow[0] > lead[0]) currMove[0]--;
                        }
                    }
                    follow[0] += currMove[0];
                    follow[1] += currMove[1];
                    lead = follow;
                    follow = tails[j];
                    lastMove = currMove;
                }
                tailLocations.add(getKey(tails[8]));
            }

            
           //  print(head, tails);
           // console.log(tails)
        });
        
        console.log(tailLocations);
        return tailLocations.size + ''
    }
}

export default new Day9;