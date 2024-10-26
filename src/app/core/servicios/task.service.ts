import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITasks} from '../interfaces/ITasks';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private  apiUrl:string = "http://localhost:8080/service/rest";
  constructor(private http: HttpClient) { }

  createTask(task: ITasks): Observable<ITasks> {
    return this.http.post<ITasks>('/api/task', task);
  }

  getTask(page:number, size:number): Observable<ITasks> {
    return this.http.get<ITasks>(`/api/tasks?page=${page}&size=${size}`);
  }

  updateTask(id:number ,task: ITasks): Observable<ITasks> {
    return this.http.put<ITasks>(`${this.apiUrl}/api/task/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/task/${id}`);
  }
}
