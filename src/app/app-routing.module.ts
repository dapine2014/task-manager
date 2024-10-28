import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './componentes/login/login.component';
import {CreateTasksComponent} from './componentes/create-tasks/create-tasks.component';

const routes: Routes = [ {path: '', component: LoginComponent} ,
                         {path:'task', component:CreateTasksComponent},
                         { path: '**', redirectTo: '' }
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
