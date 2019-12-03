import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentDto } from '../model/appointment-dto';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit {
  appointment = new AppointmentDto();
  complaint;
  isValidTime = false;
  date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh',
    defaultOpen: false,
    hours24Format: true,
    hours12Format: false
  }



  //open appointment dailog with selected doctor data
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {
    console.log('popup data : ', data['data']);

  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  //save appointment with patient complaint and time of appointment
  saveAppointment() {

    this.appointment.patientUserName = sessionStorage.getItem('username');;
    this.appointment.doctorUserName = this.data['data'].userName;
    this.appointment.appointmentStart = this.formateDate(this.date);
    var startDate = new Date(this.date);
    var endDate = new Date(startDate.setHours(startDate.getHours() + 1));
    this.appointment.appointmentEnd = this.formateDate(endDate);
    this.appointment.complaint = this.complaint;
    this.userService.savePatientAppointment(this.appointment).subscribe(
      response => {
        console.log(response);
        this.closeDialog();
      }, error => {
        alert(error.error.error + '\n' + error.error.message)
      }
    );
  }


  formateDate(item: Date) {
    var date = new Date(item);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let hours = date.getHours();
    return year + '-' + month + '-' + day + ' ' + hours + ":00";
  }


  //to prevent patient to make an appointment during docter break
  checkAvailability(event: any) {
    let date = new Date(event);
    var hours = date.getHours();
    if (this.data['data'].start < hours && hours < this.data['data'].end) {
      this.isValidTime = true;
    } else
      this.isValidTime = false;
  }


}
