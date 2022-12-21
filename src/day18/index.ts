import { Day } from "../day";

const groupBy = (keyfn: (p: Point) => string, values: Point[]) => {
    const val: Record<string, Point[]> = {};
    values.forEach(p => {
        const key = keyfn(p)
        val[key] = (val[key] ?? []).concat(p);
    });
    return val;
};

type Point = {
    x: number;
    y: number;
    z: number;
    seen: Set<string>;
};

const canEscape = (point: [number, number, number], matrix: boolean[][][]) => {
   const keyFn = (p: [number, number, number]) => `${p[0]}_${p[1]}_${p[2]}`;
    const seen = new Set<string>();
    const toCheck = [point];
    while (toCheck.length) {
        const current = toCheck.shift()!;
        if (current[0] < 0 || current[0] > matrix.length - 1) return true;
        if (current[1] < 0 || current[1] > matrix[0].length - 1) return true;
        if (current[2] < 0 || current[2] > matrix[0][0].length - 1) return true;
        seen.add(keyFn(current));
        if (!matrix[current[0]][current[1]][current[2]]) {
            const newPoints: Array<[number, number, number]> = [
                [current[0] - 1, current[1], current[2]],
                [current[0] + 1, current[1], current[2]],
                [current[0], current[1] + 1, current[2]],
                [current[0], current[1] - 1, current[2]],
                [current[0], current[1], current[2] + 1],
                [current[0], current[1], current[2] - 1],
            ];
            toCheck.unshift(...newPoints.filter(p => !seen.has(keyFn(p))))
        }

    }
    return false;
}

const markSeen = (points: Point[]) => {
    const xySame = groupBy((p) => `${p.x}_${p.y}`, points.sort((a, b) => a.z - b.z ))
        Object.values(xySame).forEach(same => {
            for (let i = 0; i < same.length - 1; i++) {
                if (same[i].z + 1 === same[i+1].z) {
                    same[i].seen.add('z1');
                    same[i+1].seen.add('z2');
                }
            }
        });
        const xzSame = groupBy((p) => `${p.x}_${p.z}`, points.sort((a, b) => a.y - b.y ))
        Object.values(xzSame).forEach(same => {
            for (let i = 0; i < same.length - 1; i++) {
                if (same[i].y + 1 === same[i+1].y) {
                    same[i].seen.add('y1');
                    same[i+1].seen.add('y2');
                }
            }
        });
        const yzSame = groupBy((p) => `${p.y}_${p.z}`, points.sort((a, b) => a.x - b.x ))
        Object.values(yzSame).forEach(same => {
            for (let i = 0; i < same.length - 1; i++) {
                if (same[i].x + 1 === same[i+1].x) {
                    same[i].seen.add('x1');
                    same[i+1].seen.add('x2');
                }
            }
        });
        
}

const getPoints = (input: string) => input.split(/\r?\n/)
.map(line => {
        const p = line.trim().split(',').map(Number);
        return {x: p[0], y: p[1], z: p[2], seen: new Set() } as Point;
    });

class Day18 extends Day {

    constructor(){
        super(18);
    }

    solveForPartOne(input: string): string {
        const points = getPoints(input);

        markSeen(points);
        
        const score = points.map(p => 6 - p.seen.size).reduce((prev, curr) => prev + curr, 0);
        
        return score + '';
    }

    solveForPartTwo(input: string): string {
        const points = getPoints(input);

        markSeen(points);
        
        const boundaries = points.reduce((prev, curr) => ({
            x: Math.max(prev.x, curr.x),
            y: Math.max(prev.y, curr.y),
            z: Math.max(prev.z, curr.z),
        }), { x: -Infinity, y: -Infinity, z: -Infinity})

        const fullMatrix = Array(boundaries.x+1)
                            .fill(false)
                            .map(a => Array(boundaries.y+1).fill(false)
                                .map(b => Array(boundaries.z+1).fill(false))
                            )

                            
        points.forEach(p => fullMatrix[p.x][p.y][p.z] = true)
       
        let score = 0;
        points.forEach(p => {
            if (!p.seen.has('x2') && canEscape([p.x-1, p.y, p.z], fullMatrix)) score++;
            if (!p.seen.has('x1') && canEscape([p.x+1, p.y, p.z], fullMatrix)) score++;
            if (!p.seen.has('y2') && canEscape([p.x, p.y-1, p.z], fullMatrix)) score++;
            if (!p.seen.has('y1') && canEscape([p.x, p.y+1, p.z], fullMatrix)) score++;
            if (!p.seen.has('z1') && canEscape([p.x, p.y, p.z + 1], fullMatrix)) score++;
            if (!p.seen.has('z2') && canEscape([p.x, p.y, p.z - 1], fullMatrix)) score++;
        })

        return score + '';
    }
}

export default new Day18;