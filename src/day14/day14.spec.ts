import day14 from './index';

describe('On Day 14', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day14.solveForPartTwo(`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`)).toBe('93');
    })
});