/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, EventEmitter} from 'angular2/angular2';

@Component({
  selector: 'todo-item',
  properties: ['label', 'done'],
  events: ['toggle']
})
@View({
  template: `
  <div class="checkbox">
    <label>
      <input #checkbox
             type="checkbox"
             [checked]="done"
             (change)="action(checkbox.checked)"> {{label}}
    </label>
  </div>`
})
export class TodoItem {
  label: string;
  done: boolean;
  toggle = new EventEmitter();
  
  constructor() {}
  
  action(checked: string) {
    this.toggle.next(checked);
  }
}
