import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user = new User();
  invalidLogin = false;

  form = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  //authontication using login operation
  login(LoginInformation) {
    this.user.userName = this.form.value.userName;
    this.user.password = this.form.value.password;
    this.userService.authenticate( this.user.userName ,this.user.password).subscribe(
      response => {
        sessionStorage.setItem('username', this.user.userName);
        sessionStorage.setItem('email', this.user.email);
        let tokenStr = 'Bearer ' + response['token'];
        sessionStorage.setItem('token', tokenStr);
        this.router.navigate(['/appointments'])
        this.invalidLogin = false;
      }, error => {
        this.invalidLogin = true;
        alert(error.error.message)
        this.router.navigate(['/login'])

      }
    );


  }
}
