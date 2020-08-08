import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  baseUrl = "https://us-central1-todo-list-b01b3.cloudfunctions.net/";

  addTodo(data){
    return this.http.post(this.baseUrl+'addTodo',data);
  }

  editTodo(data){
    return this.http.post(this.baseUrl+'editTodo',data);
  }

  getAllTodo(data){
    return this.http.post(this.baseUrl+'getAllTodo',data);
  }

  deleteTodo(data){
    return this.http.post(this.baseUrl+'deleteTodo',data);
  }
}
