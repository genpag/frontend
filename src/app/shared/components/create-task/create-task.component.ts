import { Mensagens } from './../../classes/Mensagens';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tasks } from '../../classes/tasks';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    public ngbActiveModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      concluido: [false],
    });
  }

  createForm() {
    if (this.form.valid) {
      this.firebaseService.createTask(this.form.value).then(
        (res) => {
          Mensagens.sucesso('Task cadastrada com Sucesso');
          this.ngbActiveModal.close(false);
        },
        (err) => {
          Mensagens.erro('Erro ao cadastrar');
        }
      );
    } else {
      Mensagens.erro('Preencha os campos corretamente');
    }
  }
}
