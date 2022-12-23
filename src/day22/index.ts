
import { Day } from "../day";

const getGrid = (grid: string) => {
    const initial = grid.split(/\r?\n/).map(r => r.split(''));
    const maxLength = initial.map(m => m.length).reduce((prev, curr) => Math.max(prev, curr));

    initial.forEach(r => {while(r.length < maxLength) r.push(' ')});
    return initial;
};


const print = (grid: string[][]) => {
    console.log(grid.map(r => r.join('')).join('\n'))
}

type Dir = 'v' | '^' | '>' | '<';
type Turn = 'L' | 'R';
type Point = { x: number, y: number };

const TURNS: Record<Turn, Record<Dir, Dir>> = {
    'L': {
        '^': '<',
        '<': 'v',
        'v': '>',
        '>': '^',
    },
    'R': {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^',
    }
}

const DIRECTIONS: Record<Dir, Point> = {
    '<': {x: -1, y: 0},
    '>': {x: 1, y: 0},
    '^': {x:0, y: -1},
    'v': {x:0, y: 1},
}

 const scoreFacing = (facing: Dir) => {
    switch (facing) {
        case '>': return 0;
        case '<': return 2;
        case '^': return 3;
        case 'v': return 1;
    }
 }

 const getNextPotential = (transition: Transition, potential: Point, direction: Point) => {
    //Test Case
        if (
            potential.x + direction.x >= 0 &&
            potential.x + direction.x < transition.grid[0].length &&
            potential.y  + direction.y>= 0 &&
            potential.y + direction.y < transition.grid.length)
            return { x: potential.x + direction.x, y: potential.y + direction.y, direction, face: transition.face}

        if (potential.x + direction.x < 0) return transition["<"](potential)
        if (potential.x + direction.x >= transition.grid[0].length) return transition[">"](potential);
        if (potential.y + direction.y < 0) return transition["^"]( potential);
        if (potential.y + direction.y >= transition.grid.length) return transition["v"](potential);
        throw new Error('no get here');
 }

 //const squareSize = 4;
 const squareSize = 50;
 type TransitionFunction = (potentional: Point) => {x: number, y: number, face: number, direction: Point};

 type Transition = {
    grid: string[][];
    '^': TransitionFunction;
    'v': TransitionFunction;
    '<': TransitionFunction;
    '>': TransitionFunction;
    face: number;
    startRow: number;
    startCol: number;
 }
 const getInvidiualGrid = (grid: string[][]): Record<number, Transition> => ({
//TEST
    // 1: {
    //     grid: grid.slice(0, squareSize).map(r => r.slice(squareSize*2, squareSize*3)),
    //     '^': potential => ({ x: squareSize - potential.x -1, y: squareSize -1, face: 2, direction: DIRECTIONS['v']}),
    //     '<': potential => ({ x: potential.y, y: 0, face: 3, direction: DIRECTIONS['v']}),
    //     '>': potential => ({ x: squareSize-1, y: squareSize - potential.y -1, face: 6, direction: DIRECTIONS['<']}),
    //     'v': potential => ({ x: potential.x, y: 0, face: 4, direction: DIRECTIONS['v']}),
    //     face: 1,
    //     startCol: squareSize*2,
    //     startRow: 0,
    // },
    // 2: {
    //     grid: grid.slice(squareSize, squareSize*2).map(r => r.slice(0, squareSize)),
    //     '^': potential => ({ x: squareSize - potential.x -1, y: 0, face: 1, direction: DIRECTIONS['v']}),
    //     '<': potential => ({ x: potential.y, y: squareSize-1, face: 6, direction: DIRECTIONS['^']}),
    //     '>': potential => ({ x: 0, y: potential.y, face: 3, direction: DIRECTIONS['>']}),
    //     'v': potential => ({ x: squareSize - potential.x -1, y: squareSize-1, face: 5, direction: DIRECTIONS['^']}),
    //     face: 2,
    //     startCol: 0,
    //     startRow: squareSize
    // },
    // 3: {
    //     grid: grid.slice(squareSize, squareSize*2).map(r => r.slice(squareSize, squareSize*2)),
    //     '^': potential => ({ x: 0, y: potential.x, face: 1, direction: DIRECTIONS['>']}),
    //     '<': potential => ({ x: potential.y, y: squareSize-1, face: 2, direction: DIRECTIONS['<']}),
    //     '>': potential => ({ x:0, y: potential.y, face: 4, direction: DIRECTIONS['>']}),
    //     'v': potential => ({ x: 0, y: squareSize-potential.x - 1, face: 5, direction: DIRECTIONS['>']}),
    //     face: 3,
    //     startRow: squareSize,
    //     startCol: squareSize,
    // },
    // 4: {
    //     grid: grid.slice(squareSize, squareSize*2).map(r => r.slice(squareSize*2, squareSize*3)),
    //     '^': potential => ({ x: potential.x, y: squareSize-1, face: 1, direction: DIRECTIONS['^']}),
    //     '<': potential => ({ x: squareSize-1, y: potential.y, face: 3, direction: DIRECTIONS['<']}),
    //     '>': potential => ({ x: squareSize-potential.y - 1, y: 0, face: 6, direction: DIRECTIONS['v']}),
    //     'v': potential => ({ x: potential.x, y: 0, face: 5, direction: DIRECTIONS['v']}),
    //     face: 4,
    //     startRow: squareSize,
    //     startCol: squareSize*2
    // },
    // 5: {
    //     grid: grid.slice(squareSize*2).map(r => r.slice(squareSize*2, squareSize*3)),
    //     '^': potential => ({ x: potential.x, y: squareSize-1, face: 4, direction: DIRECTIONS['^']}),
    //     '<': potential => ({ x: squareSize-potential.y - 1, y: squareSize-1, face: 3, direction: DIRECTIONS['^']}),
    //     '>': potential => ({ x: 0, y: potential.y, face: 6, direction: DIRECTIONS['>']}),
    //     'v': potential => ({ x: squareSize- potential.x - 1, y: squareSize-1, face: 2, direction: DIRECTIONS['^']}),
    //     face: 5,
    //     startCol: squareSize * 2,
    //     startRow: squareSize*2,
    // },
    // 6: {
    //     grid: grid.slice(squareSize*2).map(r => r.slice(squareSize*3)),
    //     '^': potential => ({ x: squareSize - 1, y: squareSize-potential.x -1, face: 4, direction: DIRECTIONS['<']}),
    //     '<': potential => ({ x: squareSize-1, y: potential.y, face: 5, direction: DIRECTIONS['<']}),
    //     '>': potential => ({ x: squareSize-1, y: squareSize - potential.y - 1, face: 1, direction: DIRECTIONS['>']}),
    //     'v': potential => ({ x: 0, y: squareSize-potential.x - 1, face: 2, direction: DIRECTIONS['>']}),
    //     face: 6,
    //     startCol: squareSize*3,
    //     startRow: squareSize*2

    // }
//REAL: 
1: {
    grid: grid.slice(0, squareSize).map(r => r.slice(squareSize, squareSize*2)),
    '^': potential => ({ x: 0 , y: potential.x , face: 6, direction: DIRECTIONS['>']}),
    '<': potential => ({ x: 0, y: squareSize-potential.y-1, face: 4, direction: DIRECTIONS['>']}),
    '>': potential => ({ x: 0, y: potential.y, face: 2, direction: DIRECTIONS['>']}),
    'v': potential => ({ x: potential.x, y: 0, face: 3, direction: DIRECTIONS['v']}),
    face: 1,
    startCol: squareSize,
    startRow: 0,
},
2: {
    grid: grid.slice(0, squareSize).map(r => r.slice(squareSize*2)),
    '^': potential => ({ x: potential.x, y: squareSize-1 , face: 6, direction: DIRECTIONS['^']}),
    '<': potential => ({ x: squareSize - 1, y: potential.y, face: 1, direction: DIRECTIONS['<']}),
    '>': potential => ({ x: squareSize -1, y: squareSize - potential.y - 1, face: 5, direction: DIRECTIONS['<']}),
    'v': potential => ({ x:squareSize-1 , y: potential.x, face: 3, direction: DIRECTIONS['<']}),
    face: 2,
    startCol: squareSize*2,
    startRow: 0,
},
3: {
    grid: grid.slice(squareSize, squareSize*2).map(r => r.slice(squareSize, squareSize*2)),
    '^': potential => ({ x: potential.x , y: squareSize-1, face: 1, direction: DIRECTIONS['^']}),
    '<': potential => ({ x: potential.y, y: 0, face: 4, direction: DIRECTIONS['v']}),
    '>': potential => ({ x: potential.y, y: squareSize-1, face: 2, direction: DIRECTIONS['^']}),
    'v': potential => ({ x: potential.x, y: 0, face: 5, direction: DIRECTIONS['v']}),
    face: 3,
    startCol: squareSize,
    startRow: squareSize,
},
4: {
    grid: grid.slice(squareSize*2, squareSize*3).map(r => r.slice(0, squareSize)),
    '^': potential => ({ x: 0, y: potential.x, face: 3, direction: DIRECTIONS['>']}),
    '<': potential => ({ x: 0, y: squareSize-potential.y-1, face: 1, direction: DIRECTIONS['>']}),
    '>': potential => ({ x: 0, y: potential.y, face: 5, direction: DIRECTIONS['>']}),
    'v': potential => ({ x: potential.x, y: 0, face: 6, direction: DIRECTIONS['v']}),
    face: 4,
    startCol: 0,
    startRow: squareSize*2,
},
5: {
    grid: grid.slice(squareSize*2, squareSize*3).map(r => r.slice(squareSize, squareSize*2)),
    '^': potential => ({ x: potential.x, y: squareSize-1, face: 3, direction: DIRECTIONS['^']}),
    '<': potential => ({ x: squareSize-1, y: potential.y, face: 4, direction: DIRECTIONS['<']}),
    '>': potential => ({ x: squareSize-1, y: squareSize-potential.y-1, face: 2, direction: DIRECTIONS['<']}),
    'v': potential => ({ x: squareSize-1, y: potential.x, face: 6, direction: DIRECTIONS['<']}),
    face: 5,
    startCol: squareSize*2,
    startRow: squareSize*2,
},
6: {
    grid: grid.slice(squareSize*3).map(r => r.slice(0, squareSize)),
    '^': potential => ({ x: potential.x, y: squareSize-1, face: 4, direction: DIRECTIONS['^']}),
    '<': potential => ({ x: potential.y, y: 0, face: 1, direction: DIRECTIONS['v']}),
    '>': potential => ({ x: potential.y, y: squareSize-1, face: 5, direction: DIRECTIONS['^']}),
    'v': potential => ({ x: potential.x, y: 0, face: 2, direction: DIRECTIONS['v']}),
    face: 6,
    startCol: 0,
    startRow: squareSize*3,
},

 });

 const directionToFace = (dir: Point): Dir => {
    
    if (dir.x == 0) return dir.y == 1 ? 'v' : '^';
    if (dir.y == 0) return dir.x == 1 ? '>' : '<';
    throw new Error('Impossible')
 }


class Day22 extends Day {

    constructor(){
        super(22);
    }

    solveForPartOne(input: string): string {
        const inputs = input.split(/r?\n\r?\n/);
        
        const grid = getGrid(inputs[0]);
        // Doing this hack since I know the input
        const firstColumn = grid[0].findIndex(r => r === '.');
        
        let currentPosition: Point = {y: 0, x:firstColumn};
        let facing: Dir = '>';

        const moves = 
            [...inputs[1].matchAll((/(\d+)([LR]|$)/g))]
                .map(m => [Number(m[1]), m[2]] as [number, Turn]);

        moves.slice(1,1).forEach(move => {
            const direction = DIRECTIONS[facing];
            let numSteps = move[0];
            const potential = {...currentPosition};
            while(numSteps > 0) {
                potential.x = (potential.x + direction.x + grid[0].length) % grid[0].length;
                potential.y = (potential.y + direction.y + grid.length) % grid.length;

                if (grid[potential.y][potential.x] === '.') {
                    currentPosition.x = potential.x;
                    currentPosition.y = potential.y;
                    numSteps--;
                }
                else if (grid[potential.y][potential.x] === '#') break;
            }
            if (move[1])
                facing = TURNS[move[1]][facing]
        });

        grid[currentPosition.y][currentPosition.x] = facing;
        //print(grid);
       return 1000 * (currentPosition.y + 1) + 4 * (currentPosition.x +1) + scoreFacing(facing) + '';
    }

    solveForPartTwo(input: string): string {
        const inputs = input.split(/r?\n\r?\n/);
        
        const transitions = getInvidiualGrid(getGrid(inputs[0]));
        let currentTransition = transitions[1];
        // Doing this hack since I know the input
        const firstColumn = transitions[1].grid[0].findIndex(r => r === '.');
        
        let currentPosition: Point = {y: 0, x:firstColumn};
        let facing: Dir = '>';

        const moves = 
            [...inputs[1].matchAll((/(\d+)([LR]|$)/g))]
                .map(m => [Number(m[1]), m[2]] as [number, Turn]);

        moves.forEach(move => {
            let direction = DIRECTIONS[facing];
            let numSteps = move[0];
            let potential = {...currentPosition};
            let potentialFacing = facing;
            let potentialDirection = direction;
            let potentialTransition = currentTransition;
            while(numSteps > 0) {
                const next = getNextPotential(potentialTransition, potential, direction);
                potential = { x: next.x, y: next.y};
                potentialTransition = transitions[next.face];
        
                potentialDirection = next.direction;
                potentialFacing = directionToFace(direction);
                
                if (potentialTransition.grid[potential.y][potential.x] === '.') {
                    currentPosition.x = potential.x;
                    currentPosition.y = potential.y;
                    numSteps--;
                    currentTransition = potentialTransition;
                    direction = next.direction;
                    facing = directionToFace(direction);
                }
                else if (potentialTransition.grid[potential.y][potential.x] === '#') break;
            }
            if (move[1])
                facing = TURNS[move[1]][facing]
            currentTransition.grid[currentPosition.y][currentPosition.x] = facing;
            print(currentTransition.grid)
            currentTransition.grid[currentPosition.y][currentPosition.x] = '.'
            console.log(currentTransition.face)
           // return;
        });

        //grid[currentPosition.y][currentPosition.x] = facing;
        //print(grid);
       return 1000 * (currentTransition.startRow + currentPosition.y + 1) + 4 * (currentTransition.startCol + currentPosition.x +1) + scoreFacing(facing) + '';
    }
}

export default new Day22;