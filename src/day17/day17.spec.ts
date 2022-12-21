import day17 from './index';

describe('On Day 17', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day17.solveForPartTwo('>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>')).toBe('1514285714288');
    })
    xit(`just loop right`, ()=>{
        expect(day17.solveForPartTwo('>>>>>')).toBe((5256).toString());
    })
});

