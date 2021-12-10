import { ControlErrorComponent } from './components/control-error/control-error.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { NavComponent } from './components/nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CreateTaskComponent,
    EditTaskComponent,
    ModalConfirmComponent,
    ControlErrorComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
  ],

  exports: [
    CreateTaskComponent,
    EditTaskComponent,
    ControlErrorComponent,
    NavComponent,
  ],
})
export class SharedModule {}
