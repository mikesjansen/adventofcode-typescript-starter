import day19 from './index';

describe('On Day 19', () =>{
    xit(`part1 1 2`, ()=>{
        expect(day19.solveForPartOne(`Blueprint 1:        Each ore robot costs 4 ore.        Each clay robot costs 2 ore.        Each obsidian robot costs 3 ore and 14 clay.        Each geode robot costs 2 ore and 7 obsidian.      
      Blueprint 2:        Each ore robot costs 2 ore.       Each clay robot costs 3 ore.        Each obsidian robot costs 3 ore and 8 clay.        Each geode robot costs 3 ore and 12 obsidian.`)).toBe('33');
    });
    xit(`part1 1`, ()=>{
      expect(day19.solveForPartOne(`Blueprint 1:        Each ore robot costs 4 ore.        Each clay robot costs 2 ore.        Each obsidian robot costs 3 ore and 14 clay.        Each geode robot costs 2 ore and 7 obsidian.`)).toBe('9');
  });
    xit(`part1 2`, ()=>{
      expect(day19.solveForPartOne(`Blueprint 2:        Each ore robot costs 2 ore.       Each clay robot costs 3 ore.        Each obsidian robot costs 3 ore and 8 clay.        Each geode robot costs 3 ore and 12 obsidian.`)).toBe('24');
  })
  xit(`part 2 : 1 2`, ()=>{
    expect(day19.solveForPartTwo(`Blueprint 1:        Each ore robot costs 4 ore.        Each clay robot costs 2 ore.        Each obsidian robot costs 3 ore and 14 clay.        Each geode robot costs 2 ore and 7 obsidian.      
  Blueprint 2:        Each ore robot costs 2 ore.       Each clay robot costs 3 ore.        Each obsidian robot costs 3 ore and 8 clay.        Each geode robot costs 3 ore and 12 obsidian.`)).toBe('56*62');
  });
  it(` 2: 1`, ()=>{
    expect(day19.solveForPartTwo(`Blueprint 1:        Each ore robot costs 4 ore.        Each clay robot costs 2 ore.        Each obsidian robot costs 3 ore and 14 clay.        Each geode robot costs 2 ore and 7 obsidian.`)).toBe('56');
  });
  it(`part 2: 2`, ()=>{
    expect(day19.solveForPartTwo(`Blueprint 2:        Each ore robot costs 2 ore.       Each clay robot costs 3 ore.        Each obsidian robot costs 3 ore and 8 clay.        Each geode robot costs 3 ore and 12 obsidian.`)).toBe('62');
  })
});