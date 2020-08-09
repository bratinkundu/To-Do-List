import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodocomponentComponent } from './todocomponent/todocomponent.component';


const routes: Routes = [
  {
    path:'',
    component:TodocomponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
