import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrl = "https://us-central1-todo-list-b01b3.cloudfunctions.net/";

  createAuthUser(data){
    return this.http.post(this.baseUrl+'createAuthUser',data);
  }

  getRequestedUser(data){
    return this.http.post(this.baseUrl+'getRequestedUser',data);
  }

}
