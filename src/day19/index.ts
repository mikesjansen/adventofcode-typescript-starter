import { Day } from "../day";

type Blueprint = {
    id: number;
    ore: number;
    clay: number;
    obsidian: { oreCost: number; clayCost: number; };
    geode: { oreCost: number; obsidianCost: number };
}
type State = {
    ore: number;
    clay: number;
    obsidian: number;
    geodes: number;
    oreRobots: number,
    clayRobots: number;
    obsidianRobots: number;
    geodeRobots: number;
    timeRemaining: number;
}

const canMakeObsidian = (bp: Blueprint, state: State) => {
    return state.ore >= bp.obsidian.oreCost && state.clay >= bp.obsidian.clayCost
}

const canMakeGeode = (bp: Blueprint, state: State) => {
    return state.ore >= bp.geode.oreCost && state.obsidian >= bp.geode.obsidianCost
}

const checkBlueprint = (bp: Blueprint, timeRemaining: number) => {
    const states = [{
        ore: 0,
        clay: 0,
        obsidian: 0,
        geodes: 0,
        oreRobots: 1,
        clayRobots: 0,
        obsidianRobots: 0,
        geodeRobots: 0,
        timeRemaining
    }];

    let globalMax = 0;
    const maxOreNeeded = Math.max(bp.clay,bp.obsidian.oreCost, bp.geode.oreCost);
    const maxClayNeeded = bp.obsidian.clayCost;
    const maxObsidianNeeded = bp.geode.obsidianCost;

    const dfs = (bp: Blueprint, state: State): number => {
        if (state.geodes > globalMax) globalMax = state.geodes;
        if (state.timeRemaining <= 0) return state.geodes;
        if (state.geodes + state.geodeRobots * state.timeRemaining + (state.timeRemaining * ( state.timeRemaining + 1))/2 < globalMax) return 0;
        const next: State = {
            ore: state.ore + state.oreRobots,
            oreRobots: state.oreRobots,
            clay: state.clay + state.clayRobots,
            clayRobots: state.clayRobots,
            geodeRobots: state.geodeRobots,
            geodes: state.geodes + state.geodeRobots,
            obsidian: state.obsidian + state.obsidianRobots,
            obsidianRobots: state.obsidianRobots,
            timeRemaining: state.timeRemaining -1,
        }
        if (canMakeGeode(bp, state)) {
            
            const score = dfs(bp, { ...next, ore: next.ore - bp.geode.oreCost, obsidian: next.obsidian - bp.geode.obsidianCost, geodeRobots: next.geodeRobots + 1})
            return score;
        }
        let toReturn = 0;
        if (state.obsidianRobots < maxObsidianNeeded && canMakeObsidian(bp, state)) toReturn = dfs(bp, { ...next, ore: next.ore - bp.obsidian.oreCost, clay: next.clay - bp.obsidian.clayCost, obsidianRobots: next.obsidianRobots + 1})
        if (state.clayRobots < maxClayNeeded && state.ore >= bp.clay) toReturn = Math.max(toReturn, dfs(bp, { ...next, ore: next.ore - bp.clay, clayRobots: next.clayRobots + 1}));
        if (state.oreRobots < maxOreNeeded && state.ore >= bp.ore) toReturn = Math.max(toReturn, dfs(bp, { ...next, ore: next.ore - bp.ore, oreRobots: next.oreRobots + 1}));         ;
        toReturn = Math.max(toReturn, dfs(bp, next))
        return toReturn;
    }
    const result = dfs(bp, states[0]);
    return result;
}

class Day19 extends Day {
    constructor(){
        super(19);
    }

    solveForPartOne(input: string): string {
        const plans = input.split(/\r?\n/).map(l =>     
            l.replace(/[^\d]+/g, ' ').trim().split(' ').map(Number)
        ).map(b => ({
            id: b[0],
            ore: b[1], clay: b[2],
            obsidian: { oreCost: b[3], clayCost: b[4]},
            geode: { oreCost: b[5], obsidianCost: b[6]}} as Blueprint))
        const resuts = plans.map((p) => (p.id) * checkBlueprint(p, 24));
        return resuts.reduce((prev, curr) => prev + curr) + ''
    }

    solveForPartTwo(input: string): string {
        const plans = input.split(/\r?\n/).map(l =>     
            l.replace(/[^\d]+/g, ' ').trim().split(' ').map(Number)
        ).slice(0, 3).map(b => ({
            id: b[0],
            ore: b[1], clay: b[2],
            obsidian: { oreCost: b[3], clayCost: b[4]},
            geode: { oreCost: b[5], obsidianCost: b[6]}} as Blueprint))

        const resuts = plans.map((p) => checkBlueprint(p, 32));
        return resuts.reduce((prev, curr) => prev * curr, 1) + ''
    }
}

export default new Day19;