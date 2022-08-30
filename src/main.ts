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
