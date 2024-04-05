import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../project';

@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.css']
})
export class ProjectsFormComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({});
  message: any;
  project: Project | undefined | null;
  userId: string | undefined | null;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.route.queryParamMap.subscribe(params => {
      const projectString = params.get('project');
      if (projectString) {
        this.project = JSON.parse(projectString);
        this.initializeForm();
      } else {
        this.project = null;
        this.initializeForm();
      }
    });
  }
  
  initializeForm(): void {
    this.projectForm = new FormGroup({
      title: new FormControl(this.project?.title || '', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.project?.description || '', [Validators.required]),
      dueDate: new FormControl(this.project?.dueDate || null, [Validators.required, this.dateNotBeforeTodayValidator])
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

  onSubmit(): void {
    console.log('Form submitted with:');
    console.table(this.projectForm.value);
    
    if (!this.project) {
      this.addNewProject(this.projectForm.value);
    } else {
      this.updateProject(this.project._id, this.projectForm.value);
    }
  }

  addNewProject(newProject: Project): void {
    if (this.userId){
      console.log('Adding new project ' + JSON.stringify(newProject));
      this.projectService.addProject(this.userId, { ...newProject })
        .subscribe({
          next: project => {
            this.router.navigateByUrl('/' + this.userId + '/projects');
          },
          error: (err) => this.message = err
        });
    }
  }

  updateProject(id: string, updatedValues: Project) {
    if (this.userId){
      this.projectService.updateProject(this.userId, id, { ...updatedValues })
      .subscribe({
        next: project => {
          this.router.navigateByUrl('/' + this.userId + '/projects');
        },
        error: (err) => this.message = err
      });
    }
  }
}
