import { Component, OnInit, NgZone } from '@angular/core';
import { ToDo } from './todo';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos: ToDo[] = [];

  constructor(private electron: ElectronService, private ngZone: NgZone) { }
  ngOnInit(): void {
    if (this.electron.isElectronApp) {
      this.load();
      this.electron.ipcRenderer.on('todos', (event, todos) => {
        this.ngZone.run(() => {
          console.log(todos);
          this.todos = JSON.parse(todos);
        });
      });
    }
  }

  load() {
    this.electron.ipcRenderer.send('load-todos');
  }
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
    if (this.electron.isElectronApp) {
      this.electron.ipcRenderer.send('todos', this.todos);
    } else {
      console.log(this.todos);
    }
  }
}
