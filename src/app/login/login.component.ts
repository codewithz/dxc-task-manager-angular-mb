import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login';
import { LoginService } from './login.service';
import { AlertServiceService } from './../notifications/alert-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  errorMessage: string = ''

  constructor(private service: LoginService, private router: Router, private alertService: AlertServiceService) { }

  ngOnInit(): void {
    this.login.UserName = 'admin';
    this.login.Password = 'Admin123#'
  }

  onLogin() {
    this.service.loginUser(this.login)
      .subscribe(
        (response) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error)
          //this.errorMessage = 'Invalid Username or Password'       
          this.alertService.showError('Access Denied', 'Invalid username or password')
        }
      )
  }

}
