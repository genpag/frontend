import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, Input, OnInit } from '@angular/core';
import { Mensagens } from '../../classes/Mensagens';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {
  @Input() id: any;

  constructor(
    private taskService: FirebaseService,
    public ngbActiveModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  delete() {
    this.taskService.deleteTask(this.id).then(
      (res) => {
        Mensagens.sucesso('Excluido com Sucesso');
        this.ngbActiveModal.close(false);
      },
      (err) => {
        Mensagens.erro('Erro ao excluir');
      }
    );
  }
}
