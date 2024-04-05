import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from './project';
import { User } from '../admin-dashboard/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private dataUri = `${environment.apiUri}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.dataUri);
  }

  getProjects(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.dataUri}/${userId}/projects`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getProjectCount(userId: string): Observable<number> {
    return this.http.get<Project[]>(`${this.dataUri}/${userId}/projects`)
      .pipe(
        retry(3),
        catchError(this.handleError),
        map(projects => projects.length)
      );
  }


  getProjectById(userId: string, projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.dataUri}/${userId}/projects/${projectId}`);
  }


  addProject(userId: string, project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.dataUri}/${userId}/projects`, project)
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteProject(userId: string, projectId: string): Observable<void> {
    return this.http.delete<void>(`${this.dataUri}/${userId}/projects/${projectId}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  updateProject(userId: string, projectId: string, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.dataUri}/${userId}/projects/${projectId}`, project)
      .pipe(
        catchError(this.handleError)
      )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
