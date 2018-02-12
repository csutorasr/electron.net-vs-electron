import { Component } from '@angular/core';
import { ToDo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos: ToDo[] = [];
  add() {
    this.todos.push({
      text: '',
      done: false,
    });
  }
  remove(todo) {
    this.todos = this.todos.filter(x => x !== todo);
  }
  save() {
    console.log(this.todos);
  }
}
