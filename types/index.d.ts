declare module "tuplegen" {
  type Generator = () => any[];
  export function CartesianGen(sets: any[][]): Generator;
  export function PermutationGen(elements: any[]): Generator;
  export function PowerSetGen(elements: any[]): Generator;
}
