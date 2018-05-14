import { Component } from '@angular/core';
import TodoObj from './todoObject/todo';
import TodosManagerTypes from './todosManager/TodosManagerTypes'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private currentTodos: Array<TodoObj> = [];
  private removedTodos: Array<TodoObj> = [];
  private todoManagerTypes = TodosManagerTypes;

  removeTodos(uniqueKeysToRemove: Array<number>) {
  	this.currentTodos = this.currentTodos.filter((el, idx) => {
      if (uniqueKeysToRemove.indexOf(el.uniqueKey) !== -1) {
        this.removedTodos.push(el);
        return false;
      }

      return true;
    });
  }

  addTodo() {
    this.currentTodos.push(new TodoObj('', true));
  }
}
