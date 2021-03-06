import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { TodoRoutingModule } from './todo-routing.module';
import { TodocomponentComponent } from './todocomponent/todocomponent.component';
import { TodoDialog } from './todocomponent/todocomponent.component';


@NgModule({
  declarations: [TodocomponentComponent, TodoDialog],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRippleModule
  ],
  entryComponents:[TodoDialog]
})
export class TodoModule { }
