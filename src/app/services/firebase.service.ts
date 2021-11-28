import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tarefa } from '../interfaces/tarefa';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  constructor(private firestore: AngularFirestore) { }

  private tarefas!: Observable<Tarefa[]>;
  private tarefasCollection!: AngularFirestoreCollection<Tarefa>;

  getTarefas() {
     this.tarefasCollection =  this.firestore.collection('tarefas');
     this.tarefas = this.tarefasCollection.snapshotChanges().pipe( 
       map((actions: any[]) => {                                       
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return { id, ...data };
         })
       })
     )
     console.log(this.tarefas);
     return this.tarefas;
    
  }

  createTarefa(tarefa: Tarefa) {
    delete tarefa.id;
    return this.firestore.collection('tarefas').add(tarefa);
  }

  updateTarefa(tarefa: Tarefa) {
    console.log(tarefa);
    return this.firestore.doc('tarefas/' + tarefa.id).update(tarefa);
  }

  deleteTarefa(tarefa: Tarefa) {
    return this.firestore.doc('tarefas/' + tarefa.id).delete();
  }


}
