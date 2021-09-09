import { TaskService } from './../../services/task.service';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {

  @Input() data: Task

  editing: boolean = false;
  formTask: FormGroup;


  constructor(private taskServive: TaskService) { }


  ngOnInit() {
    this.createForm(new Task())

    this.formTask.patchValue(this.data)

  }

  ngAfterViewInit() {
    this.formTask.get('done').valueChanges.subscribe(
      () => this.edit()
    )
  }

  isEdited(){
    this.editing = true;
  }
  createForm(task: Task) {
    this.formTask = new FormGroup({
      title: new FormControl(task.title, [Validators.required]),
      descripition: new FormControl(task.descripition, [Validators.required]),
      done: new FormControl(task.done, [Validators.required]),


    })
  }

  edit(){
    this.editing = false;
    let taskUpdate = this.data
    taskUpdate.title = this.formTask.get('title').value
    taskUpdate.descripition = this.formTask.get('descripition').value
    taskUpdate.done = this.formTask.get('done').value

    this.taskServive.updateTask(taskUpdate, this.data.id)

  }

  delete(){
    this.taskServive.deleteTask(this.data)
  }





}
