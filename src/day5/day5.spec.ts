import day5 from './index';

describe('On Day 5', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day5.solveForPartOne(`    [D]    
[N] [C]    
[Z] [M] [P]
1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`)).toBe('CMZ');
    })
});