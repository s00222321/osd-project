import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsDetailsComponent } from './projects-details/projects-details.component';
import { MaterialModule } from '../material.module';
import { ProjectsFormComponent } from './projects-form/projects-form.component';
import { TasksModule } from '../tasks/tasks.module';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    ProjectsListComponent,
    ProjectsDetailsComponent,
    ProjectsFormComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    TasksModule,
    MatProgressBarModule
  ]
})
export class ProjectsModule { }
