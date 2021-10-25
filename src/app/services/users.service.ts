import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(`${this.baseUrl}/users`).pipe(map(response => {
      return response.data
    }))
  }

  addUser(param: any) {
    return this.http.post<any>(`${this.baseUrl}/users/create`, param).pipe(map(response => {
      return response
    }))
  }

  updateUser(param: any) {
    return this.http.put<any>(`${this.baseUrl}/users/update`, param).pipe(map(response => {
      return response
    }))
  }

  removeUser(param: any) {
    return this.http.delete<any>(`${this.baseUrl}/users/remove/${param.cod}`).pipe(map(response => {
      return response
    }))
  }
}
