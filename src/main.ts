import { Expect, Equal } from '@type-challenges/utils';
// challenges 16
type Permutation<T, U = T> = [T] extends [never]
  ? []
  : T extends U
  ? [T, ...Permutation<Exclude<U, T>>]
  : never;
type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

// Step1 => Union to Array
type Step1<T> = [T] extends [never] ? [] : [T];
type Test1 = Step1<'A' | 'B' | 'C'>; // ["A"] | ["B"] | ["C"]

// Step2 => Take Rest
type Step2<T, U = T> = [T] extends [never] ? [] : [T, Step2<U, T>];
type Test2 = Step2<'A' | 'B' | 'C'>;
