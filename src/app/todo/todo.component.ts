import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import TodoObj from '../todoObject/todo';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class Todo {
  @Input() todo: TodoObj;
  @Input() checked: boolean = false;
  @Output() onToggle: EventEmitter<any> = new EventEmitter();
  @ViewChild('editInput') editInput;

  private _queuedInputFocus: boolean = false;

  private text;

  ngAfterViewInit() {
    if (this.todo.editable === true) {
      this.editInput.nativeElement.focus();
    }
  }

  ngDoCheck() {
    if (this._queuedInputFocus && this.editInput) {
      this.editInput.nativeElement.focus();
      this._queuedInputFocus = false;
    }
  }

  reportStateChange(state: boolean) {
    this.onToggle.emit({
      uniqueKey: this.todo.uniqueKey,
      state: state
    });
  }

  onTextClick() {
    this.todo.editable = true;
    this._queuedInputFocus = true;
  }

  onInputKeyup(event) {
    if (event.keyCode === 13) {
      this.todo.editable = false;
      return false;
    }
  }

  onInputBlur(event) {
    this.todo.editable = false;
  }
}
