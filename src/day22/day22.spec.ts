import day22 from './index';

describe('On Day 22', () =>{
    xit(`part1 is identity function`, ()=>{
        expect(day22.solveForPartOne(`        .#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10L
P`)).toBe('6032');
    })
    it(`part1 is identity function`, ()=>{
        expect(day22.solveForPartTwo(`        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`)).toBe('5031');
    })
});