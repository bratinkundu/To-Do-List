import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface TodoInterface{
  title : string;
  details : string;
}


@Component({
  selector: 'app-todocomponent',
  templateUrl: './todocomponent.component.html',
  styleUrls: ['./todocomponent.component.css']
})
export class TodocomponentComponent implements OnInit {


  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() : void{
    const dialogRef = this.dialog.open(TodoDialog,{
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result =>{
      //get the return data here
      console.log("Dialog closed")
    })
  }

}


@Component({
  selector:'app-dialog',
  templateUrl: 'dialog.html',
})
export class TodoDialog{
  constructor(public dialogRef: MatDialogRef<TodoDialog>, @Inject(MAT_DIALOG_DATA) public data : TodoInterface){}

  onNoClick() : void {
    this.dialogRef.close();
  }

}