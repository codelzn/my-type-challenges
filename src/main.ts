import './style.css';
import { Expect, Equal } from '@type-challenges/utils';

// Challenge 1
type HelloWorld = string;
type test = Expect<Equal<HelloWorld, string>>;

// Challenge 2
interface Todo2 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo2, 'title' | 'completed'>;

const todo2: TodoPreview = {
  title: 'Clean room',
  completed: false,
};

type MyPick<T, K extends keyof T> = { [P in K]: T[P] };

// challenge 3
interface Todo3 {
  title: string;
  description: string;
}
type MyReadonly<T> = { readonly [P in keyof T]: T[P] };

const todo3: MyReadonly<Todo3> = {
  title: 'Hey',
  description: 'foobar',
};
// todo3.title = "Hello" // Error: cannot reassign a readonly property
// todo3.description = "barFoo" // Error: cannot reassign a readonly property

// challenge 4
const tuple4 = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type TupleToObject<T extends readonly (string | number | symbol)[]> = {
  [K in T[number]]: K;
};

type result = TupleToObject<typeof tuple4>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// challenge 5

type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type First<T extends any[]> = T extends [infer F, ...any] ? F : never;

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3

// challenge 6

type tesla = ['tesla', 'model 3', 'model X', 'model Y'];
type spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT'
];

type Length<T extends readonly any[]> = T['length'];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5

// challenge 7
// extends会自动结构然后一一比较
type MyExclude<T, U extends T> = T extends U ? never : T;
type Result7 = MyExclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'

// challenge 8
type ExampleType = Promise<string>;

type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer X>
  ? X extends Promise<unknown>
    ? MyAwaited<X>
    : X
  : null;

type Result8 = MyAwaited<ExampleType>; // string

// challenge 9
type If<C extends boolean, T, F> = C extends true ? T : F;

type A = If<true, 'a', 'b'>; // expected to be 'a'
type B = If<false, 'a', 'b'>; // expected to be 'b'

// challenge 10
type Concat<T extends any[], K extends any[]> = [...T, ...K];
type Result10 = Concat<[1], [2]>; // expected to be [1, 2]

// challenge 11
type Includes<T extends readonly unknown[], U> = T extends [
  infer TFirst,
  ...infer TRest
]
  ? Equal<TFirst, U> extends true
    ? true
    : Includes<TRest, U>
  : false;
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`

// challenge 12
type Push<T extends readonly unknown[], U> = [...T, U]
type Result = Push<[1, 2], '3'> // [1, 2, '3']

// challenge 13

