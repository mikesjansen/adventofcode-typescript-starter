import { cp } from "fs";
import { Day } from "../day";

type Sensor = {
    beacon: number[]
    sensor: number[];
    distance: number;
}

const print = (grid: number[][]) => {
    console.log(grid[0].map((_, i) => grid.map(col => col[i] ).join('')).join('\n'))
}

const getManhatten = (a: number[], b: number[]) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])

class Day15 extends Day {

    constructor() {
        super(15);
    }

    solveForPartOne(input: string): string {
        const lines: Sensor[] = input.split(/\r?\n/).map(line => line.match(/x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/))
            .map(line => line?.slice(1).map(Number))
            .map(line => ({ 
                sensor: [line![0], line![1]], 
                beacon: [line![2], line![3]], 
                distance: getManhatten([line![0], line![1]],[line![2],line![3]]) }));

        const max = lines.reduce((prev, curr) => [Math.max(prev[0], curr.sensor[0], curr.beacon[0]), Math.max(prev[1], curr.sensor[1], curr.beacon[1])], [0, 0])
        const min = lines.reduce((prev, curr) => [Math.min(prev[0], curr.sensor[0], curr.beacon[0]), Math.min(prev[1], curr.sensor[1], curr.beacon[1])], [0, 0])

        const xOffset = max[0] - min[0];
        const TARGET_ROW = 2000000;
        let impossible = 0;
        min[0] -= 2000;
        max[0] += 2000;
        console.log(min, max)
        for (let col = min[0]; col <= max[0] + 1; col++) {
            for(let i =0; i < lines.length; i++) {
                const beaconDistance = lines[i].distance;
                const cellDistance = getManhatten([col, TARGET_ROW], lines[i].sensor);
                if (!(col === lines[i].beacon[0] && TARGET_ROW === lines[i].beacon[1]) && cellDistance <= beaconDistance) {
                    impossible++;
                    break;
                }
            }
        }

        return impossible + '';
    }

    solveForPartTwo(input: string): string {
        const lines: Sensor[] = input.split(/\r?\n/).map(line => line.match(/x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/))
        .map(line => line?.slice(1).map(Number))
        .map(line => ({ 
            sensor: [line![0], line![1]], 
            beacon: [line![2], line![3]], 
            distance: getManhatten([line![0], line![1]],[line![2],line![3]]) }));

    const max = lines.reduce((prev, curr) => [Math.max(prev[0], curr.sensor[0], curr.beacon[0]), Math.max(prev[1], curr.sensor[1], curr.beacon[1])], [0, 0])
    const min = lines.reduce((prev, curr) => [Math.min(prev[0], curr.sensor[0], curr.beacon[0]), Math.min(prev[1], curr.sensor[1], curr.beacon[1])], [0, 0])

    let impossible = 0;
    for( let row = 0; row <= 4000000; row++) {
        const columns = new Set<number>();
        const ranges = lines.map(line => {
            const verticalDistance = Math.abs(line.sensor[1] - row);
            if (verticalDistance < line.distance)
                return [Math.max(0, line.sensor[0] - (line.distance - verticalDistance)), Math.min(4000000, line.sensor[0] + (line.distance - verticalDistance))];
            return null;
        }).filter(r => r).map(r => r as number[]).sort((a, b) => a[0] - b[0]);

        const prev = ranges[0];
        if (prev[0] !== 0) return row + '';
        for(let i=1; i < ranges.length; i++) {
            if (ranges![i][0] > prev[1] + 1) return (ranges[i][0]-1) * 4000000 + row + '';
            else prev[1] = Math.max(ranges[i][1], prev[1]);
        }
    }

    return 'You should not get here';
    }
}

export default new Day15;