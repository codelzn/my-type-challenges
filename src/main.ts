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
  title: string
  description: string
  completed: boolean
}

// type MyReadonly2<T, K extends keyof T> = {  }

const todo3: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo3.title = "Hello" // Error: cannot reassign a readonly property
todo3.description = "barFoo" // Error: cannot reassign a readonly property
todo3.completed = true // OK
