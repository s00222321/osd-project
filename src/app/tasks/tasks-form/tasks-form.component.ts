import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css']
})
export class TasksFormComponent implements OnInit {

  priorities: string[] = ['High', 'Medium', 'Low'];
  taskForm: FormGroup = new FormGroup({})
  message: any;
  //projectId: string | undefined | null;
  projectTitle: string | undefined | null;
  task: Task | undefined | null;

  userId: string = "65f1b31c0b69e538fff9abe4";
  projectId: string = "65f20f096ee255cbcddabfba";

  constructor(
    private taskService: TasksService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      const taskString = queryParams.get('task');
      //this.projectId  = queryParams.get('projectId');
      this.projectTitle = queryParams.get('projectName');
      // get user id this way??

      if (taskString) {
        this.task = JSON.parse(taskString);
        this.initializeForm();
      } else {
        this.task = null;
        this.initializeForm();
      }
    });
  }


  initializeForm(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(this.task?.title, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.task?.description, [Validators.required]),
      priority: new FormControl(this.task?.priority, [Validators.required]),
      dueDate: new FormControl(this.task?.dueDate, [Validators.required, this.dateNotBeforeTodayValidator])
    });
  }



  dateNotBeforeTodayValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate: Date = control.value;
    const today: Date = new Date();

    if (selectedDate && selectedDate < today) {
      return { dateBeforeToday: true };
    }
    return null;
  }


  // if task exists update, if not, create new one
  onSubmit(): void {
    if (!this.task) {
      const newTask: Task = { ...this.taskForm.value, projectId: this.projectId };
      this.addNewTask(this.userId, this.projectId, newTask)
    }
    else {
      const updatedTask: Task = { ...this.taskForm.value, projectId: this.projectId };
      this.updateTask(this.userId, this.projectId, this.task._id, updatedTask);
    }
  }


  addNewTask(userId: string, projectId: string, newTask: Task): void {
    console.log('Adding new task ' + JSON.stringify(newTask));
    this.taskService.addTask(userId, projectId, { ...newTask })
      .subscribe({
        next: task => {
          this.router.navigateByUrl('/' + this.userId + '/projects/' + this.projectId);
        },
        error: (err) => this.message = err
      });
  }


  updateTask(userId: string, projectId: string, taskId: string, updatedValues: Task) {
    this.taskService.updateTask(userId, projectId, taskId, { ...updatedValues })
      .subscribe({
        next: task => {
          this.router.navigateByUrl('/' + this.userId + '/projects/' + this.projectId)
        },
        error: (err) => this.message = err
      });
  }
}
