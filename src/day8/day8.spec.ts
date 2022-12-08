import day8 from './index';

describe('On Day 8', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day8.solveForPartTwo(`30373
25512
65332
33549
35390`)).toBe('8');
    })
});