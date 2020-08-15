import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { Subscription } from 'rxjs';

export interface TodoInterface{
  id : string;
  title : string;
  details : string;
  operation : string;
}


@Component({
  selector: 'app-todocomponent',
  templateUrl: './todocomponent.component.html',
  styleUrls: ['./todocomponent.component.css']
})
export class TodocomponentComponent implements OnInit, OnDestroy {


  constructor(private dialog: MatDialog, private todoservice : TodoService) { }

  private subs = new Subscription();
  allTodos = []
  ngOnInit() {
    this.getAllTodoList();
  }

  getAllTodoList(){
    let tododata ={
      data:{
        uid : "fSD2ipRSuXP3mZ9dynrLJ5lbsIb2"
      }
    }
    this.subs.add(this.todoservice.getAllTodo(tododata).subscribe(
      result=>{
        this.allTodos = result['result'];
      }))
  }


  editSpecificTodo(result){
    let tododata = {
      data :{
        uid : "fSD2ipRSuXP3mZ9dynrLJ5lbsIb2",
        docid : result.id,
        details : result.details
      }
    }

    this.subs.add(this.todoservice.editTodo(tododata).subscribe(
      response=>{
        console.log(response);
        alert('Updated the todo!');
        this.ngOnInit();
      }))
  }


  addTodo(result){
    let tododata = {
      data : {
        uid : "fSD2ipRSuXP3mZ9dynrLJ5lbsIb2",
        tododetails : result.details
      }
    }
    this.subs.add(this.todoservice.addTodo(tododata).subscribe(
      response =>{
        console.log(response)
        alert('Todo added successfully!')
        this.ngOnInit();
    }))
  }

  openDialog(todo) : void{
    let tododata;
    if(todo.id){
      tododata = {
        id : todo.id,
        title : "",
        details : todo.details,
        operation : "EditTodo"
      }
    }
    else{
      tododata ={
        operation : "AddTodo"
      }
    }

    const dialogRef = this.dialog.open(TodoDialog,{
      width: '500px',
      data: tododata
    });

     dialogRef.beforeClose().subscribe(result =>{
      //get the return data here
      if(result.id != ""){
        this.editSpecificTodo(result);
      }
      else{
        this.addTodo(result);
      }
    });
  }

  ngOnDestroy(){
    if(this.subs){
      this.subs.unsubscribe();
    }
    
  }

}


@Component({
  selector:'app-dialog',
  templateUrl: 'dialog.html',
})
export class TodoDialog implements OnInit{
  constructor(private formbuilder : FormBuilder,public dialogRef: MatDialogRef<TodoDialog>, @Inject(MAT_DIALOG_DATA) public data : TodoInterface){}

  todoForm : FormGroup

  ngOnInit(){
    this.todoForm = this.formbuilder.group({
      id : [""],
      title : ["", Validators.required],
      details : ["", Validators.required]
    })

    if(this.data.operation === "EditTodo"){
      this.todoForm.get('details').setValue(this.data.details);
      this.todoForm.get('id').setValue(this.data.id);
    }
  }



  onNoClick() : void {
    this.dialogRef.close();
  }

}