declare module "tuplegen" {
  type GeneratorFn = () => any[];
  export function CartesianGen(sets: any[][]): GeneratorFn;
  export function CombinationGen(elements: any[], m: number): GeneratorFn;
  export function PermutationGen(elements: any[]): GeneratorFn;
  export function PowerSetGen(elements: any[]): GeneratorFn;
}
