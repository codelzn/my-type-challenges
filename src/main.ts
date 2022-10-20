import './style.css';
import { Expect, Equal } from '@type-challenges/utils';

// challenges 1
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;

type a = MyReturnType<typeof fn>; //  "1 | 2"

// challenges 2
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

const todo2: TodoPreview = {
  completed: false,
};

// challenges 3
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & Readonly<Pick<T, K>>
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>;

const todo3: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
};

// todo3.title = "Hello" // Error: cannot reassign a readonly property
// todo3.description = "barFoo" // Error: cannot reassign a readonly property
todo3.completed = true; // OK

// challenges 4
type X = {
  x: {
    a: 1;
    b: 'hi';
  };
  y: 'hey';
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: 'hi';
  };
  readonly y: 'hey';
};
type DeepReadonly<T> = {
  readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};
type Todo4 = DeepReadonly<X>; // should be same as `Expected`

// challenges 5
type Arr5 = ['1', '2', '3'];

type TupleToUnion<T extends any[]> = T[number];

type Test = TupleToUnion<Arr5>; // expected to be '1' | '2' | '3'

// challenges 6

type Chainable<T extends Record<PropertyKey, any> = {}> = {
  option<K extends PropertyKey, V>(
    key: K,
    value: V
  ): Chainable<Omit<T, K> & Record<K, V>>;
  get(): T;
};

declare const config: Chainable;

const result: Result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// expect the type of result to be:
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}

// challenges 7
type Last<T extends unknown[]> = T extends [...args: unknown[], last: infer R]
  ? R
  : never;

type arr17 = ['a', 'b', 'c'];
type arr27 = [3, 2, 1];

type tail1 = Last<arr17>; // expected to be 'c'
type tail2 = Last<arr27>; // expected to be 1

// challenges 8

type Pop<T extends unknown[]> = T extends [...infer R, unknown] ? R : never;
type Unshift<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never;

type arr1 = ['a', 'b', 'c', 'd'];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]

// challenges 9
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

type Await<T> = T extends [infer P, ...infer U]
  ? P extends Promise<infer K>
    ? [K, ...Await<U>]
    : [P, Await<U>]
  : [];

declare function PromiseAll<T extends readonly any[]>(
  values: readonly [...T]
): Promise<[...Await<T>]>;

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);

// challenges 10
interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type LookUp<T, K> = T extends { type: K } ? T : never;

type MyDog = LookUp<Cat | Dog, 'dog'>; // expected to be `Dog`

// challenges 11
type TrimLeft<T extends string> = T extends `${' ' | '\n' | '\t'}${infer Rest}`
  ? TrimLeft<Rest>
  : T;
type TrimRight<T extends string> = T extends `${infer Rest}${' ' | '\n' | '\t'}`
  ? TrimRight<Rest>
  : T;
type Trim<T extends string> = TrimLeft<TrimRight<T>>;
type trimed = Trim<'  Hello World  '>; // expected to be 'Hello World'

// challenges 12
type Capitalize<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T
type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
