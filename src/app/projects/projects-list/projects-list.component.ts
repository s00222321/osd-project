import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from '../project';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects$: Observable<Project[]> | undefined;
  loading: boolean = true;
  message: String = "";
  showForm: boolean = false;
  selectedProject: Project | undefined;
  errorMessage: string | undefined;
  userId: string | undefined | null;

  //userId: string = "65f1b31c0b69e538fff9abe4"

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.loadProjects();
  }


  private loadProjects() {
    if(this.userId){
      this.projects$ = this.projectService.getProjects(this.userId);
      this.projects$.subscribe(
        (projects: Project[]) => {
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching projects:', error);
          this.loading = false;
          this.errorMessage = 'Error fetching projects. Please try again later.';
        }
      );
    }
  }

  stringifyProject(project: any): string {
    return JSON.stringify(project);
  }


  openConfirmDeleteDialog(project: Project): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: "Delete project " + project?.title,
        message: "Are you sure you want to delete this project"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(project);
      }
    });
  }


  deleteItem(project: Project) {
    if (project._id && this.userId) {
      this.projectService.deleteProject(this.userId, project._id).subscribe({
        next: () => {
          console.log('deleting project')
          this.loadProjects();
        },
        error: (message) => {
          this.openErrorSnackBar(message);
        }
      });
    }
  }


  deleteProject(project: Project): void {
    this.openConfirmDeleteDialog(project);
  }

  closeForm(): void {
    this.showForm = false;
  }


  isOverdue(dueDate: Date): boolean {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    return dueDateObj < today;
  }


  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 15000,
      panelClass: ['error-snackbar'],
    });
  }
}
