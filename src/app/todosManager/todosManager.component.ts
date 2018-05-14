import { Component, EventEmitter, Input, Output } from '@angular/core';
import TodoObj from '../todoObject/todo';
import TodosManagerTypes from './TodosManagerTypes';

@Component({
  selector: 'todos-manager',
  templateUrl: './todosManager.component.html',
  styleUrls: ['./todosManager.component.css']
})
export class TodosManager {
  @Input() type: TodosManagerTypes;
  @Input() items: Array<TodoObj> = [];
  @Output() onRemove: EventEmitter<any> = new EventEmitter();
  @Output() onAdd: EventEmitter<any> = new EventEmitter();

  private currentPage: number = 0;
  private todosManagerTypes = TodosManagerTypes;
  private selectedTodos: Array<number> = [];
  private lastItemsCount: number;
  private _isAllSelected: boolean = false;

  get isAllSelected() {
    return this._isAllSelected;
  }

  set isAllSelected(state: boolean) {
    const visibleTodosKeys = this.pagedItems(this.currentPage).map(el => el.uniqueKey);
    if (state === true) {
      this.selectedTodos = visibleTodosKeys;
    } else {
      this.selectedTodos = this.selectedTodos.filter(todoUid => visibleTodosKeys.indexOf(todoUid) === -1);
    }

    this._isAllSelected = state;
  }

  getMaxPage() : number {
    return this.items.length === 0 ? 0 : ( Math.ceil(this.items.length / 5) - 1 );
  }

  ngDoCheck() {
    if (this.lastItemsCount !== this.items.length) {

      let maxPage = this.getMaxPage();
      if ((this.items.length < this.lastItemsCount && this.currentPage > maxPage)
          || (this.items.length > this.lastItemsCount && maxPage > this.currentPage)) {
              this.currentPage = maxPage;
      }

      this.lastItemsCount = this.items.length;
    }
  }

  addToSelected({uniqueKey, state}) {
    if (state === true) {
      this.selectedTodos.push(uniqueKey);
    } else {
      this.selectedTodos.splice(this.selectedTodos.indexOf(uniqueKey), 1);
    }
  }

  removeTodos() {
    this.onRemove.emit(this.selectedTodos);
    this.selectedTodos = [];
    this._isAllSelected = false;
  }

  addNew() {
  	this.onAdd.emit();
    this._isAllSelected = false;
  }

  pagedItems(currentPage: number) {
    return this.items.slice(currentPage * 5, (currentPage * 5) + 5);
  }

  incrementPage(value: number) {
    this.currentPage = this.currentPage + value;
    this._isAllSelected = false;
  }
}
