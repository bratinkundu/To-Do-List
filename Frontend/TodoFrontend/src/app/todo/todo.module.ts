import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { TodoRoutingModule } from './todo-routing.module';
import { TodocomponentComponent } from './todocomponent/todocomponent.component';


@NgModule({
  declarations: [TodocomponentComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class TodoModule { }
