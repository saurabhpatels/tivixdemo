import {Component, OnInit} from '@angular/core';
import {ApiService} from "./service/api.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "./common/popup/popup.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUser: any;
  users: any = [];
  posts: any = [];
  todos: any = [];

  constructor(private api: ApiService, private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.api.getUsers().subscribe((res) => {
      this.users = res;
      this.currentUser = this.users[0];
      this.getPost();
      this.getToDo();
    })
  }

  getRemainingUser() {
    return this.users.filter((item: any) => {
      return item.id !== this.currentUser.id
    })
  }

  getPost() {
    this.api.getUserPost(this.currentUser.id).subscribe((res) => {
      this.posts = res
    })
  }

  getToDo() {
    this.api.getUserToDo(this.currentUser.id).subscribe((res) => {
      this.todos = res
    })
  }

  selectUser(user: any) {
    this.currentUser = user;
    this.getPost();
    this.getToDo();
  }

  openDialog(type: string) {
    const dialogRef = this.matDialog.open(PopupComponent, {
      width: '500px',
      data: {type: type, userId: this.currentUser.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.type === 'todo' ? this.todos.push(result.data) : this.posts.push(result.data)
      }
    });
  }

  sortPost(type: string) {
    switch (type) {
      case 'small_title':
        this.posts = this.posts.sort((a: any, b: any) => a.title.length - b.title.length)
        break;
      case 'large_title':
        this.posts = this.posts.sort((a: any, b: any) => b.title.length - a.title.length)
        break;
      case 'small_body':
        this.posts = this.posts.sort((a: any, b: any) => a.body.length - b.body.length)
        break;
      case 'large_body':
        this.posts = this.posts.sort((a: any, b: any) => b.body.length - a.body.length)
        break;
    }
  }

  sortTodo(type: string) {
    switch (type) {
      case 'small_title':
        this.todos = this.todos.sort((a: any, b: any) => a.title.length - b.title.length)
        break;
      case 'large_title':
        this.todos = this.todos.sort((a: any, b: any) => b.title.length - a.title.length)
        break;
    }
  }
}
