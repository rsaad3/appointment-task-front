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

  saveUser( user: User ){
    let url = this.baseUrl+"appointmentApp/api/saveUser";
    return this.http.post(url,user);
  }

  authenticate(username, password) {
    return this.http.post<any>(this.baseUrl+ 'authenticate', { username, password });
  }

  getappointments(){
    let auth_token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: auth_token });
    return this.http.get(this.baseUrl+'appointmentApp/api/appointments' ,{headers :headers});
  }

  savePatientAppointment(appointment : AppointmentDto){
    let auth_token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: auth_token });
    let options = {
      headers: headers
 }; 
    return this.http.post<AppointmentDto>(this.baseUrl+'appointmentApp/api/createAppointment',appointment ,options);
  }

  loadAppointment() {
    
    let auth_token = sessionStorage.getItem('token');
    let promise = new Promise((resolve, reject) => {
      const headers = new HttpHeaders({ Authorization: auth_token });
      this.http.get(this.baseUrl+'appointmentApp/api/appointments' ,{headers :headers})
        .toPromise()
        .then(
          res => { // Success
          this.appointments = res;
          for (let index in this.appointments) {
            let elemet = {name : this.appointments[index].name ,email :this.appointments[index].email,address :this.appointments[index].address
               ,specialization :this.appointments[index].specialization ,ticketPrice : this.appointments[index].ticketPrice,userName :this.appointments[index].user.userName};
               this.dataTable.push(elemet);
               console.log('elemet',elemet);
          }

          console.log('this.appointments from promise : '+this.appointments);
          console.log('this.dataTable : '+this.dataTable);
          resolve();
          },
          msg => { // Error
          reject(msg);
          }
        );
    });
    return promise;
  }
}
