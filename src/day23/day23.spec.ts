import day23 from './index';

describe('On Day 23', () =>{
    it(`Big Test`, ()=>{
        expect(day23.solveForPartOne(`....#..
        ..###.#
        #...#.#
        .#...##
        #.###..
        ##.#.##
        .#..#..`)).toBe('110');
    });
    it(`Little Test`, ()=>{
        expect(day23.solveForPartOne(`.....
        ..##.
        ..#..
        .....
        ..##.
        .....`)).toBe('25');
    });
    it(`Big Test`, ()=>{
        expect(day23.solveForPartTwo(`....#..
        ..###.#
        #...#.#
        .#...##
        #.###..
        ##.#.##
        .#..#..`)).toBe('20');
    });
});