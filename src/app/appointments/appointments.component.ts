import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as Vis from 'vis';
import { Network, DataSet, Node, Edge, IdType } from 'vis';
import { now } from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DoctorAppointmentComponent } from '../doctor-appointment/doctor-appointment.component';
import { UserService, DoctorAppointment } from '../shared/user.service';
import { outputs } from '@syncfusion/ej2-angular-popups/src/dialog/dialog.component';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  appointments: {};
  timeLine: Vis.Timeline;
  settings = {
    actions: false,
    columns: {
      name: {
        title: 'Name'
      },
      email: {
        title: 'Email'
      },
      address: {
        title: 'Address'
      },
      specialization: {
        title: 'Specialization'
      },
      ticketPrice: {
        title: 'Ticket Price'
      }
      ,
      start: {
        title: 'Start At'
      }
      ,end: {
        title: 'End At'
      }
    }
  };


  data = [];

  constructor(private dialog: MatDialog, private userServic: UserService) { }

  ngOnInit() {

    var groups = new DataSet();
    var items = new DataSet();

    this.userServic.getappointments().subscribe(
      response => {
        this.appointments = response;
        console.log(this.appointments);
        for (let index in this.appointments) {
          console.log('element of ' + index + ' ' + this.appointments[index].name + ' ' + this.appointments[index].email);
          let groupContent = this.appointments[index].name + ' ' + this.appointments[index].email;
          // this.userServic.allDcotors.push(this.appointments[index]);

          let elemet = {
            name: this.appointments[index].name, email: this.appointments[index].email, address: this.appointments[index].address
            , specialization: this.appointments[index].specialization, ticketPrice: this.appointments[index].ticketPrice, userName: this.appointments[index].user.userName,
            start: this.appointments[index].startWork, end: this.appointments[index].endWork,
          };
          this.userServic.dataTable.push(elemet);

          groups.add({ id: index, content: groupContent });
          for (let app in this.appointments[index].appointments) {
            var start = this.appointments[index].appointments[app].startAppointment;
            var end = this.appointments[index].appointments[app].endAppointment;
            items.add({
              id: app + '_' + index,
              group: index,
              content:
                ' <span style="color:#97B0F8;">(' + this.appointments[index].user.userName + ')</span>',
              start: start,
              end: end,
              type: 'box'
            });
          }

        }
        this.data = this.userServic.dataTable;
        var container = document.getElementById('visualization');
        var options = {
          groupOrder: 'content', // groupOrder can be a property name or a sorting function
          start: '2019-12-05 12:30',
          clickToUse: true,
          zoomable: true
        };
        this.timeLine = new Vis.Timeline(container, items, groups, options);


      }
    );


  }

  onUserRowSelect(event: any) {
    this.openDialog(event);
  }

  openDialog(event: any): void {
    const dialogRef = this.dialog.open(DoctorAppointmentComponent, {
      width: '70%',
      height: '70%',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.name = result;
    });
  }



}
