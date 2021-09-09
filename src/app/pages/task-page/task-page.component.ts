import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/model/task.model';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {
  formTask: FormGroup;
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTaskList().subscribe(res => {
      this.tasks = res.map( e => {
        return {
          id: e.payload.doc.id,
          ... (e.payload.doc.data() as object)
        } as Task;
      })
      console.log(this.tasks)
    })
    this.createForm(new Task())
  }

  createForm(task: Task) {
    this.formTask = new FormGroup({
      title: new FormControl(task.title, [Validators.required]),
      descripition: new FormControl(task.descripition, [Validators.required]),

    })
  }

  save(){
    console.log('entrou');

    console.log(this.formTask.value);
    let taskSave: Task = new Task();

    taskSave.title = this.formTask.value.title;
    taskSave.descripition = this.formTask.value.descripition;
    taskSave.done = false;
    taskSave.create_at = new Date()

    this.taskService.createTask(taskSave)

  }

}
