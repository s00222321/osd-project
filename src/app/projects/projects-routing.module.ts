import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsDetailsComponent } from './projects-details/projects-details.component';
import { ProjectsFormComponent } from './projects-form/projects-form.component';
import { AuthGuard } from '@auth0/auth0-angular';

import { membersGuard } from "../members.guard";

const routes: Routes = [
  { path: ':userId/projects', component: ProjectsListComponent, canActivate: [membersGuard] },
  { path: ':userId/projects/form', component: ProjectsFormComponent, canActivate: [membersGuard] },
  { path: ':userId/projects/:projectId', component: ProjectsDetailsComponent, canActivate: [membersGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
