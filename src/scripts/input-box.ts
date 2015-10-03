/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, EventEmitter} from 'angular2/angular2';

@Component({
  selector: 'input-box',
  properties: ['label', 'placeholder'],
  events: ['complete']
})
@View({
  template: `
  <div class="form-group">
    <label>
      {{label}}
      <input #text
             [type]="type || 'text'"
             class="form-control"
             [placeholder]="placeholder || ''"
             (keydown.enter)="action(text)">
    </label>
  </div>`
})
export class InputBox {
  label: string;
  type: string;
  placeholder: string;
  complete = new EventEmitter();
  
  constructor() {}
  
  action(text: any) {
    let val = text.value;
    text.value = "";
    this.complete.next(val);
  }
}
