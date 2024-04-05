import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { Task } from 'src/app/tasks/task';
import { TasksService } from 'src/app/tasks/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.css']
})
export class ProjectsDetailsComponent implements OnInit {
  projectId: string | null | undefined;
  userId: string | null | undefined;
  project!: Project;
  selectedTask: Task | undefined;
  tasks: Task[] | undefined;
  message: any;
  loading: boolean = true;
  showForm: boolean = false;
  taskFilter: string = 'all';
  projectName: string | undefined;
  percentageComplete!: string;

  // userId: string = "65f1b31c0b69e538fff9abe4";
  // projectId: string = "65f20f096ee255cbcddabfba";

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TasksService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.userId = this.route.snapshot.paramMap.get('userId');
    if (this.projectId && this.userId) {
      this.projectService.getProjectById(this.userId, this.projectId).subscribe({
        next: (value: any) => {
          const projectData = value.project;
          this.project = projectData;
          this.loading = false;
          this.projectName = this.project?.title;
          this.getTasks();
        },
        error: (message) => {
          console.error('Error fetching project:', message);
          this.loading = false;
        }
      });
    }
  }

  getTasks(): void {
    if (this.projectId && this.userId) {
      this.taskService.getTasksByProjectId(this.userId, this.projectId).subscribe({
        next: (tasks: any) => {
          this.tasks = tasks.tasks;
          console.log(this.tasks)
          this.getPercentageComplete();
        },
        error: (error) => {
          if (error.status === 404) {
            console.log('No tasks found for this project.');
          } else {
            console.error('Error fetching tasks:', error);
          }
        }
      });
    }
  }

  getPercentageComplete(): void {
    if (this.tasks) {
      const totalTasks = this.tasks.length;
      const completedTasks = this.tasks.filter(task => task.isCompleted === true).length;
      
      if (totalTasks > 0) {
        const percentageComplete = ((completedTasks / totalTasks) * 100).toFixed(2);
        this.percentageComplete = percentageComplete;
      } else {
        this.percentageComplete = '0';
      }
    }
  }
  

  stringifyTask(task: any): string {
    return JSON.stringify(task);
  }

  openConfirmDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: "Delete task " + task?.title,
        message: "Are you sure you want to delete this task"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(task);
      }
    });
  }


  deleteTask(task: Task): void {
    this.openConfirmDeleteDialog(task);
  }


  deleteItem(task: Task): void {
    if (task._id && this.userId && this.projectId) {
      this.taskService.deleteTask(this.userId, this.projectId, task._id).subscribe({
        next: () => {
          console.log('deleting task')
          this.getTasks();
        },
        error: (message) => {
          console.error('Error deleting task:', message);
        }
      });
    }
  }


  completeTask(task: Task, taskCompleted: Boolean): void {
    const updatedTask: Task = { ...task, isCompleted: !taskCompleted };
    if (this.userId && this.projectId){
      this.updateTaskCompleted(this.userId, this.projectId, task._id, updatedTask);
    }
  }


  // change isCompleted on Task
  updateTaskCompleted(userId: string, projectId: string, taskId: string, updatedValues: Task) {
    this.taskService.updateTask(userId, projectId, taskId, { ...updatedValues })
      .subscribe({
        next: task => {
          this.getTasks();
        },
        error: (err) => this.message = err
      });
  }


  editTask(task: Task): void {
    this.selectedTask = task;
    this.showForm = true;
  }


  closeForm(): void {
    this.showForm = false;
  }


  // compare date passed in to today's date
  isOverdue(dueDate: Date): boolean {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    return dueDateObj < today;
  }


  filterTasks(): void {
    if (this.taskFilter === 'all') {
      this.getTasks();
    } else {
      const isCompleted = this.taskFilter === 'completed';
      this.getFilteredTasks(isCompleted);
    }
  }


  getFilteredTasks(isCompleted: boolean): void {
    if (this.userId && this.projectId){
      this.taskService.getFilteredTasksByProjectId(this.userId, this.projectId, isCompleted).subscribe({
        next: (tasks: Task[]) => {
          this.tasks = tasks;
        },
        error: (error) => {
          if (error.status === 404) {
            this.tasks = [];
            console.log('No tasks found for this project.');
  
          } else {
            console.error('Error fetching tasks:', error);
          }
        }
      });
    }
  }


  // for selecting css class
  getPriorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  }


  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 15000,
      panelClass: ['error-snackbar'],
    });
  }
}
