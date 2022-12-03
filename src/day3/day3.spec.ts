import day3 from './index';

describe('On Day 3', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day3.solveForPartTwo(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg`)).toBe('18');
    })
});