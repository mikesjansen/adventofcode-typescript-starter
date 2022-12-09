import day9 from './index';

// describe('On Day 9', () =>{
//     it(`part1 is identity function`, ()=>{
//         expect(day9.solveForPartTwo(`R 4
// U 4
// L 3
// `)).toBe('13');
//     })
// });

describe('On Day 9', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day9.solveForPartTwo(`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`)).toBe('13');
    })
});