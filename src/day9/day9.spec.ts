import day9 from './index';

describe('On Day 9', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day9.solveForPartTwo(`R 4
U 4`)).toBe('13');
    })
});

// describe('On Day 9', () =>{
//     it(`part1 is identity function`, ()=>{
//         expect(day9.solveForPartTwo(`R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`)).toBe('13');
//     })
// });