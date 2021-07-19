import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: string[] = [];
  doneList: string[] = [];
  itemToAdd: string;

  constructor() {
    this.itemToAdd = '';
  }

  ngOnInit() {
  }
  addToList() {
    this.todoList.push(this.itemToAdd);
  }
  doItem(index: number) {
    this.doneList.push(this.todoList[index]);
    this.todoList.splice(index, 1);
    }
}
