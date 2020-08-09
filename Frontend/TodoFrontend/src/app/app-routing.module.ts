import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'auth',
    loadChildren : () =>  import('../app/auth/auth.module').then(m=> m.AuthModule)
  },
  {
    path:'todo',
    loadChildren: () => import('../app/todo/todo.module').then(m=>m.TodoModule)
  },
  {
    path:'',
    redirectTo:'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
