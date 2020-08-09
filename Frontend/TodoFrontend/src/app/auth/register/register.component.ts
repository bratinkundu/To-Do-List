import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { format } from 'url';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(private authService : AuthService, private formBuilder: FormBuilder) { }
  registerForm : FormGroup;
  subscription : Subscription

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email : ["",Validators.required],
      name : ["",Validators.required],
      phoneno : ["", Validators.required],
      password : ["",Validators.required]
    });
  }

  registerUser(){
    let data = this.registerForm.value;
    let userdata ={
      data : data
    }
    this.subscription =  this.authService.createAuthUser(userdata).subscribe(
      data =>{
        let response = data['result'];
        if(response.success){
          alert('User created successfully!')
          this.registerForm.reset();
        }
        else{
          alert(response.error);  
        }
      }
    );
 
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
