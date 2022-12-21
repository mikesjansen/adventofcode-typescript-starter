import day20 from './index';

describe('On Day 20', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day20.solveForPartOne(`1
        2
        -3
        3
        -2
        0
        4`)).toBe('3');
    })
    xit(`part2 is identity function`, ()=>{
        expect(day20.solveForPartTwo(`1
        2
        -3
        3
        -2
        0
        4`)).toBe('1623178306');
    })
});