import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodosManager } from './todosManager/todosManager.component';
import { Todo } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosManager,
    Todo
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
