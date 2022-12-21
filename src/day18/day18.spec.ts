import day18 from './index';

describe('On Day 18', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day18.solveForPartTwo(`2,2,2
        1,2,2
        3,2,2
        2,1,2
        2,3,2
        2,2,1
        2,2,3
        2,2,4
        2,2,6
        1,2,5
        3,2,5
        2,1,5
        2,3,5`)).toBe('58');
    })
});