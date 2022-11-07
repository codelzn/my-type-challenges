import { Expect, Equal } from '@type-challenges/utils';
// challenges 16
// Step1 => Union to Array
type Step1<T> = T extends any ? [T] : never;
type Test1 = Step1<'A' | 'B' | 'C'>; // ["A"] | ["B"] | ["C"]

// Step2 => Take Rest
type Step2<T, U = T> = T extends any ? [T, Step2<Exclude<U, T>>] : never;
type Test2 = Step2<'A' | 'B' | 'C'>;

// Step3 => reLoop
type Step3<T, U = T> = [U] extends [never]
  ? []
  : T extends U
  ? [T, ...Step3<Exclude<U, T>>]
  : never;
type Test3 = Step3<'A' | 'B' | 'C'>;
// Result
type Permutation<T> = Step3<T>;
type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

// challenges 17
type StringToArray<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...StringToArray<Rest>]
  : [];
type LengthOfString<S extends string> = StringToArray<S>['length'];

type Test17 = LengthOfString<'asdfgh'>;

// challenges 18
type Flatten<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? First extends unknown[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : T;
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]

// challenges 19
type AppendToObject<
  T extends Record<string, unknown>,
  U extends string,
  V
> = T[U] extends never ? T : { [K in U | keyof T]: K extends U ? V : T[K] };
type Test19 = { id: '1' };
type Result19 = AppendToObject<Test19, 'value', 4>; // expected to be { id: '1', value: 4 }

// challenges 20
type Absolute<T extends string | number | bigint> = T extends string
  ? T extends `-${infer L}`
    ? L
    : T
  : Absolute<`${T}`>;
type Test20 = -100;
type Result20 = Absolute<Test20>; // expected to be "100"

// challenges 21
type StringToUnion<T extends string> = T extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never;
type Test21 = '123';
type Result21 = StringToUnion<Test21>; // expected to be "1" | "2" | "3"

// challenges 22
type Merge<
  F extends Record<PropertyKey, any>,
  S extends Record<PropertyKey, any>
> = {
  [K in keyof F | keyof S]: K extends keyof S ? S[K] : F[K];
};
type foo = {
  name: string;
  age: string;
};

type coo = {
  age: number;
  sex: string;
};

type Result22 = Merge<foo, coo>; // expected to be {name: string, age: number, sex: string}

// challenges 23
type KebabCase<S extends string> = S extends `${infer F}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Lowercase<F>}${KebabCase<R>}`
    : `${Lowercase<F>}-${KebabCase<Uncapitalize<R>>}`
  : S;
type FooBarBaz = KebabCase<'FooBarBaz'>;
const foobarbaz: FooBarBaz = 'foo-bar-baz';

type DoNothing = KebabCase<'do-nothing'>;
const doNothing: DoNothing = 'do-nothing';

// challenges 24
type Diff<O, O1> = Omit<O & O1, keyof O & keyof O1>;
type Foo = {
  a: string;
  b: number;
};
type Bar = {
  a: string;
  c: boolean;
};
type Result1 = Diff<Foo, Bar>; // { b: number, c: boolean }
type Result2 = Diff<Bar, Foo>; // { b: number, c: boolean }
