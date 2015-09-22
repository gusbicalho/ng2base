/// <reference path="../../typings/tsd.d.ts" />
import 'zone.js';
import 'reflect-metadata';

import {Component, View, bootstrap,
        NgFor} from 'angular2/angular2';

@Component({
  selector: 'my-app'
})
@View({
  template: '<h1 *ng-for="#name of names">Oi {{name}}!</h1>',
  directives: [NgFor]
})
export class MyAppComponent {
  names: string[];
  
  constructor() {
    this.names = ['Alice', 'Bob', 'Charlie'];
  }
}

bootstrap(MyAppComponent);