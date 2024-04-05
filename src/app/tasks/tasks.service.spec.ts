import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TasksService } from './tasks.service';
import { Task } from './task';
import { environment } from 'src/environments/environment';

describe('TasksService', () => {
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });
    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tasks by project ID', () => {
    const userId = '123';
    const projectId = '456';
    const tasksMock: Task[] = [{ _id: '1', projectId: projectId, title: 'Task 1', description: 'Description 1', priority: 'high', dueDate: new Date(), isCompleted: false }];
    
    service.getTasksByProjectId(userId, projectId).subscribe(tasks => {
      expect(tasks).toEqual(tasksMock);
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects/${projectId}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(tasksMock);
  });

  it('should filter tasks by completion status', (done: DoneFn) => {
    const userId = '123';
    const projectId = '456';
    const filter = true;
    const tasksMock: Task[] = [
      { _id: '1', projectId: projectId, title: 'Task 1', description: 'Description 1', priority: 'high', dueDate: new Date(), isCompleted: false },
      { _id: '2', projectId: projectId, title: 'Task 2', description: 'Description 1', priority: 'high', dueDate: new Date(), isCompleted: false },
      { _id: '3', projectId: projectId, title: 'Task 3', description: 'Description 1', priority: 'high', dueDate: new Date(), isCompleted: true }
    ];
    const filteredTasksMock: Task[] = tasksMock.filter(task => task.isCompleted === filter);
    
    // Mock HTTP request
    service.getFilteredTasksByProjectId(userId, projectId, filter).subscribe(filteredTasks => {
      expect(filteredTasks).toEqual(filteredTasksMock);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects/${projectId}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush({ tasks: tasksMock });
  });

  it('should add a new task', (done: DoneFn) => {
    const userId = '123';
    const projectId = '456';
    const newTask: Task = {
      _id: '1', projectId: projectId, title: 'New Task', isCompleted: false,
      description: '',
      priority: '',
      dueDate: new Date()
    };

    service.addTask(userId, projectId, newTask).subscribe(task => {
      expect(task).toEqual(newTask);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects/${projectId}/tasks`);
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should delete a task', (done: DoneFn) => {
    const userId = '123';
    const projectId = '456';
    const taskId = '1';

    service.deleteTask(userId, projectId, taskId).subscribe(() => {
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects/${projectId}/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a task', (done: DoneFn) => {
    const userId = '123';
    const projectId = '456';
    const taskId = '1';
    const updatedTask: Task = {
      _id: taskId, projectId: projectId, title: 'Updated Task', isCompleted: true,
      description: '',
      priority: '',
      dueDate: new Date()
    };

    service.updateTask(userId, projectId, taskId, updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects/${projectId}/tasks/${taskId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

});

