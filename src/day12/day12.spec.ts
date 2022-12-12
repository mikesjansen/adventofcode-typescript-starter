import day12 from './index';

describe('On Day 12', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day12.solveForPartOne(`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`)).toBe('31');
    })
});

describe('On Day 12', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day12.solveForPartTwo(`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`)).toBe('29');
    })
});