import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  title: string | undefined;
  body: string | undefined;
  load = false;


  constructor(private api: ApiService, public dialogRef: MatDialogRef<PopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private toaster: ToastrService) {
    console.log(data);
  }

  ngOnInit(): void {
  }

  addPost() {
    this.load = true;
    this.api.addUserPost({
      title: this.title,
      body: this.body,
      userId: this.data.userId,
    }).subscribe((res) => {
      this.load = false;
      this.toaster.success('Post has been added successfully');
      this.dialogRef.close({type: this.data.type, data: res})
    })
  }

  addTodo() {
    this.load = true;
    this.api.addUserTodo({
      title: this.title,
      completed: false,
      userId: this.data.userId,
    }).subscribe((res) => {
      this.toaster.success('Todo has been added successfully');
      this.dialogRef.close({type: this.data.type, data: res})
    })
  }
}
