import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksFormComponent } from './tasks/tasks-form/tasks-form.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './home/home.component';
import { AppModule } from './app.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { membersGuard } from "./members.guard";
import { dashboardGuard } from "./dashboard.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', redirectTo: '/'},
  {path: 'admindashboard/:userId', component: AdminDashboardComponent, canActivate: [dashboardGuard]},
  {path: 'projects/tasksform', component: TasksFormComponent, canActivate: [membersGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
