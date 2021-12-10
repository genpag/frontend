import { ModalConfirmComponent } from './../../../../shared/components/modal-confirm/modal-confirm.component';
import { EditTaskComponent } from './../../../../shared/components/edit-task/edit-task.component';
import { CreateTaskComponent } from './../../../../shared/components/create-task/create-task.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Mensagens } from 'src/app/shared/classes/Mensagens';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tasks: any;

  constructor(
    private taskService: FirebaseService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.taskService.getTaskList().subscribe((res) => {
      this.tasks = res.map((e) => {
        return {
          id: e.payload.doc.id,
          data: e.payload.doc.data(),
        };
      });
      console.log(this.tasks);
    });
  }

  open() {
    this.ngbModal.open(CreateTaskComponent);
  }

  Edit(id: any) {
    const modalRef = this.ngbModal.open(EditTaskComponent);
    modalRef.componentInstance.idTask = id;
  }

  delete(id: any) {
    const modalRef = this.ngbModal.open(ModalConfirmComponent);
    modalRef.componentInstance.id = id;
  }

  finish(data: any, id: any) {
    const body = {
      nome: data.nome,
      descricao: data.descricao,
      concluido: true,
    };
    this.taskService.updateTask(body, id);
  }

  back(data: any, id: any) {
    const body = {
      nome: data.nome,
      descricao: data.descricao,
      concluido: false,
    };
    this.taskService.updateTask(body, id);
  }
}
