import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService, private _router : Router) { }
  userEmail = ""
  userPassword = ""

  ngOnInit() {
  }

  loginUser(){
    let data = {
      email : this.userEmail,
      password : this.userPassword
    }

    let userdata = {
      data : data
    }

    this.authService.getRequestedUser(userdata).subscribe(
      data =>{
        let response = data['result'];
        console.log(response)
        if(response.uid){
          alert('Login successfull!')
          this.userEmail = ""
          this.userPassword = ""
          this._router.navigate(['/todo']);
        }
        else{
          alert(response.error);  
        }
      }
    )
  }


}
