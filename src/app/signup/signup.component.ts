import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private user = new User();
  isDoctor = false;
  //user type
  types = ['doctor' , 'patient'];
 
  //doctor type
  specializations = ['bones' , 'eyes' ,'heart','Physical therapy'];

  //login form
  form = new FormGroup(
    {
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      address: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      specialization: new FormControl('', Validators.required),
      startWork: new FormControl('', Validators.required),
      endWork: new FormControl('', Validators.required),
      ticketPrice: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required)
    }
  );
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

//call api to save user
  userForm(AdminInformation) {
    let pass = this.form.value.password;
    let confirmPass = this.form.value.confirmPassword;
    if (pass == confirmPass) {
      this.user.name = this.form.value.fullName;
      this.user.userName = this.form.value.userName;
      this.user.email = this.form.value.email;
      this.user.password = this.form.value.password;
      this.user.role = this.form.value.role;
      this.user.age = this.form.value.age;
      this.user.address = this.form.value.address;
      this.user.specialization =  this.form.value.specialization;
      this.user.startWork = this.form.value.startWork;
      this.user.endWork = this.form.value.endWork;
      this.user.ticketPrice = this.form.value.ticketPrice;
      console.log(this.user);
      this.userService.saveUser(this.user).subscribe(
        response => {
          if (response['id'] != null) {
            this.router.navigate(['/login']);

          } 
        }, error => {
          alert(error.error)
        }
      );


    } else {
      alert("Password and confirm password not match.");
    }

  }

  //show other user properties related to doctor 
  findSpecialization(event: string) {
    if(event.indexOf('doctor')>0){
      this.isDoctor = true;
    }else
    this.isDoctor = false;

    console.log(event);
  }

}
