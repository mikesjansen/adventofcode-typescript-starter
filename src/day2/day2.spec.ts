import day2 from './index';

describe('On Day 2', () =>{
    it(`part1 is identity function`, ()=>{
    expect(day2.solveForPartOne(`A Y
B X
C Z`)).toBe('15');
    })
});