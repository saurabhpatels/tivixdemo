import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getUserPost(userId: string): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
  }

  addUserPost(post: any): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/posts' , post)
  }
  addUserTodo(post: any): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/todos' , post)
  }

  getUserToDo(userId: string): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos?userId=' + userId)
  }

}
