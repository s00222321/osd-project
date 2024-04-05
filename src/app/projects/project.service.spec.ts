import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { throwError } from 'rxjs';

import { ProjectService } from './project.service';
import { Project } from './project';
import { User } from '../admin-dashboard/user';
import { environment } from 'src/environments/environment';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    const usersMock: User[] = [{ _id: '1', email: 'test@atu.ie', dateJoined: new Date() }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(usersMock);
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(usersMock);
  });

  it('should get projects', () => {
    const userId = '123';
    const projectsMock: Project[] = [{ _id: '1', userId: userId, title: 'Project 1', description: 'Description 1', dueDate: '24-11-12', dateMade: '24-11-12', tasks: [] }];

    service.getProjects(userId).subscribe(projects => {
      expect(projects).toEqual(projectsMock);
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects`);
    expect(req.request.method).toBe('GET');
    req.flush(projectsMock);
  });

  it('should get project count', () => {
    const userId = '123';
    const projectsMock: Project[] = [
      { _id: '1', userId: userId, title: 'Project 1', description: 'Description 1', dueDate: '24-11-12', dateMade: '24-11-12', tasks: [] },
      { _id: '2', userId: userId, title: 'Project 2', description: 'Description 1', dueDate: '24-11-12', dateMade: '24-11-12', tasks: [] }
    ];

    service.getProjectCount(userId).subscribe(count => {
      expect(count).toBe(projectsMock.length);
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects`);
    expect(req.request.method).toBe('GET');
    req.flush(projectsMock);
  });

  it('should get project by id', () => {
    const userId = '123';
    const projectId = '456';
    const projectMock: Project = { _id: projectId, userId: userId, title: 'Project 1', description: 'Description 1', dueDate: '24-11-12', dateMade: '24-11-12', tasks: [] };

    service.getProjectById(userId, projectId).subscribe(project => {
      expect(project).toEqual(projectMock);
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects/${projectId}`);
    expect(req.request.method).toBe('GET');
    req.flush(projectMock);
  });

  it('should add a project', () => {
    const userId = '123';
    const newProject: Project = { _id: '1', userId: userId, title: 'New Project', description: 'Description', dueDate: '24-11-12', dateMade: '24-11-12', tasks: [] };

    service.addProject(userId, newProject).subscribe(project => {
      expect(project).toEqual(newProject);
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects`);
    expect(req.request.method).toBe('POST');
    req.flush(newProject);
  });

  it('should delete a project', () => {
    const userId = '123';
    const projectId = '1';

    service.deleteProject(userId, projectId).subscribe(() => { });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects/${projectId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a project', () => {
    const userId = '123';
    const projectId = '1';
    const updatedProject: Project = { _id: projectId, userId: userId, title: 'Updated Project', description: 'Updated Description', dueDate: '24-11-12', dateMade: '24-11-12', tasks: [] };

    service.updateProject(userId, projectId, updatedProject).subscribe(project => {
      expect(project).toEqual(updatedProject);
    });

    const req = httpMock.expectOne(`${environment.apiUri}/users/${userId}/projects/${projectId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProject);
  });

});
