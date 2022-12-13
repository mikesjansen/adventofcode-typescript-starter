import day13 from './index';

describe('On Day 13', () =>{
    it(`part1 is identity function`, ()=>{
        expect(day13.solveForPartTwo(`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`)).toBe('140');
    })
// it(`part1 is identity function`, ()=>{
//     expect(day13.solveForPartOne(`[[1],[2,3,4]]
// [[1],4]`)).toBe('13');
// })
});