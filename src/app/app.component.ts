import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from './services/firebase.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { Tarefa } from './interfaces/tarefa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  cadastro: boolean = false;
  showErros: boolean = false;
  tarefas: any = [];
  form!: FormGroup;

  constructor(
    public firebaseS: FirebaseService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.setForm();
    this.setTarefas();
  }
  
  setTarefas() {
  this.firebaseS.getTarefas().subscribe((data => {
     this.tarefas = data;
     console.log(this.tarefas);
  }))
  }

  setForm() {
    this.form = this.fb.group({
      id: null,
      titulo: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      feito: false,
      status: 'Pendente'
    });
  }

  novaTarefa() {
    this.form.reset();
    if (this.cadastro) {
      this.cadastro = false;
    } else {
      this.cadastro = true;
    }
  }

  edit(tarefa: any) {
    this.cadastro = true;
    this.form.patchValue({
      id: tarefa.id,
      titulo: tarefa.titulo,
      status: tarefa.status,
      descricao: tarefa.descricao,
    });
  }

  concluirTarefa(tarefa: any) {
    const index = this.tarefas.indexOf(tarefa);
    if (this.tarefas[index].status == 'Concluído') {
      this.tarefas[index].status = 'Pendente'
      this.firebaseS.updateTarefa(this.tarefas[index]);
    
    } else {
      this.tarefas[index].status = 'Concluído'
      this.firebaseS.updateTarefa(this.tarefas[index]);
    }
  }

  delete(tarefa: any) {
    const index = this.tarefas.indexOf(tarefa);
    if (index > -1) {
      this.tarefas.splice(index, 1);
    }
    this.firebaseS.deleteTarefa(tarefa).then((res => {
      console.log(res);
      Swal.fire({
        icon: 'error',
        title: 'Tarefa Excluída!',
      });

    }));
    
  }

  submit() {
    if (this.form.invalid) {
      const firstElementWithError = document.querySelector('.ng-invalid');
      if (firstElementWithError) {
        firstElementWithError.scrollIntoView({ behavior: 'smooth' });
      }
      this.showErros = true;
      return;
    }
    try {
     if(this.form.get('id')!.value == null){
       
      this.form.patchValue({
         status: 'Pendente'
       });

      this.firebaseS.createTarefa(this.form.value).then((res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Tarefa Criada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
        this.cadastro = false;
      })
     }else{
      this.firebaseS.updateTarefa(this.form.value).then((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Tarefa Editada com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })
      });
     } 
      // this.tarefas.push(this.form.value);
      this.cadastro = false;
    } catch (error) {
      console.log(error);
    }
  }



}
