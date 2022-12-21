import { Day } from "../day";

type Valve = {
    name: string;
    flow: number;
    index: number;
    tunnels: Valve[];
    costs: Record<string, number>
}

const getValves = (input: string) => {
    const lines = input.split(/\r?\n/);
        const valves = new Map<string, Valve>(lines.map((l, i) => [l.match(/Valve (\w\w) has/)![1],
        {
            name: l.match(/Valve (\w\w) has/)![1],
            index: i,
            tunnels: [],
            costs: {},
            flow: Number(l.match(/rate=(\d+)/)![1])
        }]))

        lines.forEach(line => {
            const match = line.match(/Valve (\w\w) has.*to valves? (.*)/);
            const valve = valves.get(match![1])!;
            valve.costs = Object.fromEntries([...valves.keys()].map(k => [k, k === valve.name ? 0 : Infinity]));
            match![2].split(', ').forEach(v => valve.tunnels.push(valves.get(v)!))
        });

        // Run djikstra from a starting point of each room
        // so we know how much it costs to jump between each
        [...valves.values()].forEach(element => {
            const unvisited = element.costs;
            const visited = {} as Record<string, number>;
            while (Object.keys(unvisited).length) {
                const keys = Object.keys(unvisited);
                const visitingIndex = keys.reduce((prev, curr, i) => unvisited[curr] <( unvisited[prev] ?? Infinity) ? curr : prev, keys[0]);
                const visiting = valves.get(visitingIndex)!;
                
                visiting?.tunnels.forEach(t => {
                    if (unvisited[t.name])
                        unvisited[t.name] = Math.min(unvisited[visitingIndex] + 1, unvisited[t.name] );
                });
                
                visited[visiting?.name] = unvisited[visitingIndex];
                delete unvisited[visitingIndex];

            }
            element.costs = visited;
        });
    return valves;
}

const getPaths = (valves: Map<string, Valve>, currentValve: Valve, timeRemaining: number) => {
    const toCheck = [{
        currentValve,
        done: false, timeRemaining, released: 0,
        roomsLeft: Object.keys(currentValve.costs).filter(c => c != currentValve.name),
        seen: [] as string[],
    }];

    for(let i=0; i < toCheck.length; i++) {
        const check = toCheck[i];
        if (check.timeRemaining <= 0 || check.done) continue;
        let added = false;
        check.roomsLeft.forEach(costKey => {
            if (valves.get(costKey)!.flow && check.currentValve.costs[costKey] < check.timeRemaining - 1) {
                toCheck.push({
                    currentValve: valves.get(costKey)!,
                    done: false,
                    timeRemaining: check.timeRemaining - check.currentValve.costs[costKey] - 1,
                    released: check.released + (check.timeRemaining - check.currentValve.costs[costKey] - 1) * valves.get(costKey)!.flow,
                    roomsLeft: check.roomsLeft.filter(r => r != costKey),
                    seen: check.seen.concat(costKey),
                });
                added = true;
            }
        })
        if (!added) check.done = true;
    }
    return toCheck;
}

const getBestScore = (valves: Map<string, Valve>, currentValve: Valve, timeRemaining: number): number => {
    const toCheck = getPaths(valves, currentValve, timeRemaining);
    return toCheck.filter(c => c.done).sort((a,b)=> b.released-a.released)[0].released;
}

class Day16 extends Day {

    constructor() {
        super(16);
    }

    solveForPartOne(input: string): string {
        
        const valves = getValves(input);
        let timeRemaining = 30;
        let currentValve = valves.get('AA')!;

        const score = getBestScore(valves, currentValve!, timeRemaining)
        return score + '';
    }

    

    solveForPartTwo(input: string): string {
        
        const valves = getValves(input);
        let timeRemaining = 26;
        let currentValve = valves.get('AA')!;
        const paths = getPaths(valves, currentValve!, timeRemaining);

        let max = -1;
        for (let i =0; i < paths.length - 1; i++) {
            const p1Set = new Set([...paths[i].seen]);
            for (let j = i+1; j < paths.length; j++) {
                if (paths[j].seen.every(s => !p1Set.has(s))) {
                    const r = paths[i].released + paths[j].released;
                    if (r > max) max = r;
                }
            }
        }
       
        return max + '';
    }
}

export default new Day16;