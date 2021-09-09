import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  collection:string = 'tasks-35400'

  constructor(private angularFirestore: AngularFirestore) {}

  getTaskDoc(id: string) {
    return this.angularFirestore
    .collection(this.collection)
    .doc(id)
    .valueChanges()
  }

  getTaskList() {
    return this.angularFirestore
    .collection(this.collection)
    .snapshotChanges();
  }

  createTask(task: Task) {
    console.log(Object.assign({}, task));

    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection(this.collection)
        .add(Object.assign({}, task))
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteTask(task: Task) {
    return this.angularFirestore
      .collection(this.collection)
      .doc(task.id)
      .delete();
  }

  updateTask(task: Task, id: string) {
    const taskUpdate: Task = task;
    return this.angularFirestore
      .collection(this.collection)
      .doc(id)
      .update(taskUpdate);
  }

}
