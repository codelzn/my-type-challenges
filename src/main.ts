import './style.css';
import { Expect, Equal } from '@type-challenges/utils';

// Challenge 1
type HelloWorld = string;
type test = Expect<Equal<HelloWorld, string>>;

// Challenge 2
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};

type MyPick<T, K extends keyof T> = { [P in K]: T[P] }
