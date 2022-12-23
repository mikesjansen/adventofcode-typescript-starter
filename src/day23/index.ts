import { Day } from "../day";

type Elf = {
    id: number;
    location: [number, number];
}

const getKey = (elf: Elf) => `${elf.location[0]},${elf.location[1]}`;
const getNumKey = (y: number, x: number) => `${y},${x}`;

enum Direction {
    N = 0,
    S = 1,
    W = 2,
    E = 3,
}

const getBounds = (elves: Elf[]) => {
    const xMin = elves.reduce((prev, curr) => Math.min(prev, curr.location[1]), Infinity);
    const xMax = elves.reduce((prev, curr) => Math.max(prev, curr.location[1]), -Infinity);
    const yMin = elves.reduce((prev, curr) => Math.min(prev, curr.location[0]), Infinity);
    const yMax = elves.reduce((prev, curr) => Math.max(prev, curr.location[0]), -Infinity);
  
    return {
        xMin, xMax, yMax, yMin
    }
}

const getBoard = (elves: Elf[]) => {
    const {xMin, xMax, yMax, yMin} = getBounds(elves);
    const board = Array(yMax-yMin +1).fill([]).map(f => Array(xMax-xMin+1).fill('.'));
    elves.forEach(e => board[e.location[0]-yMin][e.location[1]-xMin] = '#')
    return board.map(b => b.join('')).join('\n');
};

const print = (elves: Elf[]) => console.log(getBoard(elves));

const getElves = (unparsed: string) => {
    const elves: Elf[] = [];
    const grid = unparsed.trim().split(/\r?\n/).map(r => r.trim().split('')); 
    let elfId = 1;
        grid.forEach((row, i) => row.forEach((c, j) => {
            if ( c === '#' ) elves.push({ id: elfId++, location: [i, j]})
        }));
    return elves;
}

const runSimulation = (input: string, countLimit: number) => {
    const elves = getElves(input);
        
    const locationMaps = new Map<string, Elf>(elves.map(e => [getKey(e), e]));

    const isHappyLittleElf = (elf: Elf) => {
        //if (elf.isHappy) return true;
        for (let x=elf.location[1]-1; x <= elf.location[1]+1; x++)
        for (let y=elf.location[0]-1; y <= elf.location[0]+1; y++)
            if ((x != elf.location[1] || elf.location[0] != y) && locationMaps.has(getNumKey(y, x))) return false;
        return true;
    }

    let startingDir = 0;
    let count =0;
    while(count < countLimit) {
        const moves = new Map<string, {elf: Elf, target: [number, number]}[]>();
        elves.forEach(elf => {
            count;
            if (isHappyLittleElf(elf)) return;
            for(let dir =0; dir < 4; dir++) {
                const targetDir = (dir + startingDir )% 4;
                if (targetDir === Direction.N) {
                    if (
                        !locationMaps.get(getNumKey(elf.location[0] - 1, elf.location[1] -1 )) &&
                        !locationMaps.get(getNumKey(elf.location[0] - 1, elf.location[1])) &&
                        !locationMaps.get(getNumKey(elf.location[0] - 1, elf.location[1] + 1))
                    ) {
                        const target: [number, number] = [elf.location[0]-1, elf.location[1]];
                        const key = getNumKey(target[0], target[1]);
                        moves.set(key, (moves.get(key) ?? []).concat({elf, target}) );
                        break;
                    }
                }
                else if (targetDir === Direction.E) {
                    if (
                        !locationMaps.get(getNumKey(elf.location[0] - 1, elf.location[1] + 1 )) &&
                        !locationMaps.get(getNumKey(elf.location[0], elf.location[1] + 1)) &&
                        !locationMaps.get(getNumKey(elf.location[0] + 1, elf.location[1] + 1))
                    ) {
                        const target: [number, number] = [elf.location[0], elf.location[1] + 1];
                        const key = getNumKey(target[0], target[1]);
                        moves.set(key, (moves.get(key) ?? []).concat({elf, target}) );
                        break;
                    }
                }
                else if (targetDir === Direction.S) {
                    if (
                        !locationMaps.get(getNumKey(elf.location[0] + 1, elf.location[1] - 1 )) &&
                        !locationMaps.get(getNumKey(elf.location[0] + 1, elf.location[1])) &&
                        !locationMaps.get(getNumKey(elf.location[0] + 1, elf.location[1] + 1))
                    ) {
                        const target: [number, number] = [elf.location[0] + 1, elf.location[1]];
                        const key = getNumKey(target[0], target[1]);
                        moves.set(key, (moves.get(key) ?? []).concat({elf, target}) );
                        break;
                    }
                }
                else if (targetDir === Direction.W) {
                    if (
                        !locationMaps.get(getNumKey(elf.location[0] - 1, elf.location[1] - 1 )) &&
                        !locationMaps.get(getNumKey(elf.location[0], elf.location[1] - 1)) &&
                        !locationMaps.get(getNumKey(elf.location[0] + 1, elf.location[1] - 1))
                    ) {
                        const target: [number, number] = [elf.location[0], elf.location[1] - 1];
                        const key = getNumKey(target[0], target[1]);
                        moves.set(key, (moves.get(key) ?? []).concat({elf, target}) );
                        break;
                    }
                }
            }
            
        });
        [...moves.keys()].forEach(move => {
            if (moves.get(move)?.length ==1 ) {
                // do move. update elf + location map
                const m = moves.get(move)![0];
                locationMaps.delete(getKey(m.elf));
                m.elf.location = m.target;
                locationMaps.set(getKey(m.elf), m.elf)
            }

            
        });
        count++;
        startingDir++;
        if (elves.every(isHappyLittleElf)) break;
    }
    return [elves, count] as [Elf[], number];
};

class Day23 extends Day {

    constructor(){
        super(23);
    }

    solveForPartOne(input: string): string {
        const [elves] = runSimulation(input, 10);
        const {xMin, xMax, yMax, yMin} = getBounds(elves);
        
        print(elves);
        const result = (xMax - xMin +1) * (yMax - yMin + 1) - elves.length;
        return result + '';
    }

    solveForPartTwo(input: string): string {
        const [elves, count] = runSimulation(input, Infinity);
        print(elves);
        return count + 1 + '';
    }
}

export default new Day23;