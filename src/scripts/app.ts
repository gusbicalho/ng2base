/// <reference path="../../typings/tsd.d.ts" />
import 'zone.js';
import 'reflect-metadata';

import {Component, View, bootstrap,
        NgFor} from 'angular2/angular2';
import {InputBox} from './input-box';
import {TodoItem} from './todo-item';

interface Todo {
  content: string;
  done: boolean;
}
function todo(content: string, done: boolean) : Todo {
  return {content: content, done: done};
}

@Component({
  selector: 'todo-app'
})
@View({
  template: `
  <h1>To-Do ({{todosLeft()}} left)</h1>
  <input-box label="" placeholder="What to do?"
             (complete)="addTodo($event)"></input-box>
  <ul>
  <li *ng-for="#todo of todos">
    <todo-item [label]="todo.content"
               [done]="todo.done"
               (toggle)="todo.done = $event"></todo-item>
  </li>
  </ul>
  `,
  directives: [NgFor, InputBox, TodoItem]
})
export class TodoApp {
  todos: Todo[] = [];

  constructor() {}
  addTodo(todo: any) {
    this.todos = this.todos.concat({content: todo, done: false});
  }
  
  todosLeft() {
    return this.todos.filter((v) => !v.done).length;
  }
}

bootstrap(TodoApp);