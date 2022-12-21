import { Day } from "../day";

type Monkey = { name: string } & ({ value : number } | { left: string; operator: string; right: string });

const isStatic = (monkey: any): monkey is { value: number } => {
    return (typeof monkey.value === 'number');
}

const operations: Record<string, (a: number, b: number) => number> = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    '*': (a, b) => a * b,
}

const getMonkeys = (input: string) => 
    input.split(/\r?\n/).map(l => l.trim()).map(l => {
        const match = l.match(/(\w+): (.*)+/)!;
        if (!isNaN(Number(match[2]))) return { name: match[1], value: Number(match[2]) };
        const formula = match[2].match(/(\w+) ([\-\+\*\/]) (\w+)/)!;
        return { name: match[1], left: formula[1], operator: formula[2], right: formula[3]};
    });

class Day21 extends Day {

    constructor(){
        super(21);
    }

    solveForPartOne(input: string): string {
        const monkeys: Monkey[] = getMonkeys(input);
        const map = new Map(monkeys.map(m => [m.name, m]));
        const getMonkeyValue = (monkey: Monkey): number => {
            if (isStatic(monkey)) return monkey.value;
            return operations[monkey.operator](getMonkeyValue(map.get(monkey.left)!), getMonkeyValue(map.get(monkey.right)!));
            
        }
        return getMonkeyValue(map.get('root')!) + '';
    }

    solveForPartTwo(input: string): string {
        const monkeys: Monkey[] = getMonkeys(input);
        const map = new Map(monkeys.map(m => [m.name, m]));

        const getMonkeyValue = (monkey: Monkey): number | null => {
            if (isStatic(monkey)) return monkey.value;
            if (monkey.left === 'humn' || monkey.right === 'humn') return null;
            
            const left = getMonkeyValue(map.get(monkey.left)!) ;
            const right = getMonkeyValue(map.get(monkey.right)!);

            if (left === null) return null;
            if (right === null) return null;

            return operations[monkey.operator](left, right);
        }

        const solveX = (monkey: Monkey, targetValue: number): number => {
            if (isStatic(monkey)) return monkey.value;
            const right = getMonkeyValue(map.get(monkey.right)!) as number;
            const left = getMonkeyValue(map.get(monkey.left)!) as number;
            if (monkey.left === 'humn') {
                if (monkey.operator === '+') return targetValue - right;
                if (monkey.operator === '-') return targetValue + right;
                if (monkey.operator === '*') return targetValue / right;
                //if (monkey.operator === '/')
                return targetValue * right;
            }
            else if (monkey.right === 'humn') {
                if (monkey.operator === '+') return targetValue - left;
                if (monkey.operator === '-') return -1 * (targetValue - left);
                if (monkey.operator === '*') return targetValue / left;
                return left/targetValue;
            }
            else if (left === null) {
                let newTarget = 0;
                if (monkey.operator === '+') newTarget = targetValue - right;
                else if (monkey.operator === '-') newTarget = targetValue + right;
                else if (monkey.operator === '*') newTarget = (targetValue / right);
                else newTarget = targetValue * right;
                return solveX(map.get(monkey.left)!, newTarget);
            }
            else {
                let newTarget = 0;
                if (monkey.operator === '+')  newTarget = targetValue - left;
                else if (monkey.operator === '-')  newTarget = -1 * (targetValue - left);
                else if (monkey.operator === '*')  newTarget = (targetValue / left);
                else newTarget = left/targetValue;
                return solveX(map.get(monkey.right)!, newTarget);
            }
        }

        const root = map.get('root')!;
        if (!isStatic(root)) {
            const left = getMonkeyValue(map.get(root.left)!);
            const right = getMonkeyValue(map.get(root.right)!);

            if (left !== null) return solveX(map.get(root.right)!, left) + '';
            if (right !== null) return solveX(map.get(root.left)!, right) + '';
        }
        
        throw new Error('You should never get here!')
    }
}

export default new Day21;