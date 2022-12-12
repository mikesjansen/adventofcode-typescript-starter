import { Day } from "../day";

type Node = {
    x: number;
    y: number;
    height: number;
    dest: boolean;
    visited: boolean;
    score: number;
};

const print = (nodes: Node[][]) => {
    console.log(nodes.map(r => r.map(c => c.score.toString().padEnd(3)).join(' ')).join('\n'))
}

const getNode = (val: string, x: number, y: number, part: number = 1): Node => {
    const char = val[0];
    const dest = char === 'E';
    const start = char === 'S' || (part === 2 && char === 'a');

    return {
        x,
        y,
        dest,
        height: char === 'S' ? 0 : (char === 'E' ? 25 : char.charCodeAt(0) - 'a'.charCodeAt(0)),
        visited: false,
        score: start ? 0 : Infinity,
    }
}

const getScore = (nodes: Node[][]) => {
    const unvisited = nodes.flatMap(row => row.map(c => c))

    while (unvisited.length) {
        const visitingIndex = unvisited.reduce((prev, curr, i) => curr.score < unvisited[prev].score ? i : prev, 0);
        const visiting = unvisited[visitingIndex];
        const up = nodes[visiting.x]?.[visiting.y + 1];
        const down = nodes[visiting.x]?.[visiting.y - 1];
        const left = nodes[visiting.x - 1]?.[visiting.y];
        const right = nodes[visiting.x + 1]?.[visiting.y];
        if (up && up.height <= visiting.height + 1) up.score = Math.min(up.score, visiting.score + 1);
        if (down && down.height <= visiting.height + 1) down.score = Math.min(down.score, visiting.score + 1);
        if (left && left.height <= visiting.height + 1) left.score = Math.min(left.score, visiting.score + 1)
        if (right && right.height <= visiting.height + 1) right.score = Math.min(right.score, visiting.score + 1)

        visiting.visited = true;
        unvisited.splice(visitingIndex, 1);
    }

    // print(nodes);
    return nodes.flatMap(r => r.filter(c => c.dest))[0].score + ''
}

class Day12 extends Day {

    constructor(){
        super(12);
    }

    solveForPartOne(input: string): string {
        const nodes = input.split(/\r?\n/).map((l, r) => l.split('').map((x, c) => getNode(x, r, c)));

        return getScore(nodes);;
    }

    solveForPartTwo(input: string): string {
        const nodes = input.split(/\r?\n/).map((l, r) => l.split('').map((x, c) => getNode(x, r, c, 2)));

        return getScore(nodes);
    }
}

export default new Day12;