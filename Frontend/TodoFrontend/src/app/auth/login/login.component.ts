import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService) { }
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
        }
        else{
          alert(response.error);  
        }
      }
    )
  }


}
