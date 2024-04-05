import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Task } from './task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private dataUri = `${environment.apiUri}/users`;

  constructor(private http: HttpClient) { }


  getTasksByProjectId(userId: string, projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.dataUri}/${userId}/projects/${projectId}/tasks`);
  }


  getFilteredTasksByProjectId(userId: string, projectId: string, filter: boolean): Observable<Task[]> {
    return this.http.get<any>(`${this.dataUri}/${userId}/projects/${projectId}/tasks`).pipe(
      map(tasks => {
        return tasks.tasks.filter((task: { isCompleted: boolean; }) => task.isCompleted === filter);
      }),
      catchError(error => {
        console.error('Error filtering tasks:', error);
        return throwError('Something went wrong with filtering tasks; please try again later.');
      })
    );
  }


  addTask(userId: string, projectId: string, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.dataUri}/${userId}/projects/${projectId}/tasks`, task)
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteTask(userId: string, projectId: string, taskId: string): Observable<void> {
    const url = `${this.dataUri}/${userId}/projects/${projectId}/tasks/${taskId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  updateTask(userId: string, projectId: string, taskId: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.dataUri}/${userId}/projects/${projectId}/tasks/${taskId}`, task)
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
