import { Mensagens } from './../../classes/Mensagens';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  @Input() idTask: any;
  tasks: any;

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

    this.firebaseService.getTaskId(this.idTask).subscribe((data: any) => {
      this.form.controls.nome.setValue(data.nome);
      this.form.controls.descricao.setValue(data.descricao);
    });
  }

  editForm() {
    if (this.form.valid) {
      this.firebaseService.updateTask(this.form.value, this.idTask).then(
        (res) => {
          this.ngbActiveModal.close(false);
          Mensagens.sucesso('Atualizado com Sucesso');
        },
        (err) => {
          Mensagens.erro('Erro ao atualizar');
        }
      );
    } else {
      Mensagens.erro('Preencha corretamente o formulário');
    }
  }
}
