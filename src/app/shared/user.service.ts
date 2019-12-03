import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentDto } from '../model/appointment-dto';

export class DoctorAppointment {
  constructor(
      public name: string,
      public email: string,
      public starteWork: Date,
      public endWork: Date,
      public appointments: [],
      public ticketPrice: number,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  appointments: {};
  allDcotors = [];

  dataTable  =[];
 

  private baseUrl =  "http://localhost:8080/"
  constructor(private http : HttpClient) { }

  //call backend api to save patient or doctor basesd on their role
  saveUser( user: User ){
    let url = this.baseUrl+"appointmentApp/api/saveUser";
    return this.http.post(url,user);
  }

  //make authentication during the login operation
  authenticate(username, password) {
    return this.http.post<any>(this.baseUrl+ 'authenticate', { username, password });
  }

  //get doctor appointments from backend
  getappointments(){
    let auth_token = sessionStorage.getItem('token');
    //load authentication token to make authorized operation
    const headers = new HttpHeaders({ Authorization: auth_token });
    return this.http.get(this.baseUrl+'appointmentApp/api/appointments' ,{headers :headers});
  }

  //save apppointment between doctor and patient.
  savePatientAppointment(appointment : AppointmentDto){
    let auth_token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: auth_token });
    let options = {
      headers: headers
 }; 
    return this.http.post<AppointmentDto>(this.baseUrl+'appointmentApp/api/createAppointment',appointment ,options);
  }
  
}
