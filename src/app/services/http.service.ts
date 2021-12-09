import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  collection: string = 'task-72101'

  constructor(private angularFirestore: AngularFirestore) { }

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

  createTask(task: any) {
    console.log(Object.assign({}, task));

    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection(this.collection)
        .add(Object.assign({}, task))
        .then((data: any) => { console.log(data) }, (error: any) => reject(error));
    });
  }

  deleteTask(task: any) {
    return this.angularFirestore
      .collection(this.collection)
      .doc(task.id)
      .delete();
  }

  updateTask(task: any, id: string) {

    return this.angularFirestore
      .collection(this.collection)
      .doc(id)
      .update(task);
  }



}
