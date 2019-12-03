import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import Http module  
// import { HttpModule} from '@angular/http';  
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

  
// import ReactiveFormsModule for reactive form  
import { ReactiveFormsModule } from '@angular/forms';  
  
// import module for Routing.  
import { RouterModule } from '@angular/router';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AppointmentsComponent } from './appointments/appointments.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule ,} from '@angular/material/dialog';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from "ng2-completer";
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';



import { BasicAuthHttpInterceptorServiceService } from './shared/basic-auth-http-interceptor-service.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AppointmentsComponent,
    DoctorAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DialogModule ,
    NgbModule,
    MatDialogModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    AngularDateTimePickerModule ,
    RouterModule.forRoot([  
      {  
        path : '',  
        component : HomeComponent   
      },  
      {  
        path : 'login',  
        component : LoginComponent    
      },  
      {  
        path : 'signup',  
        component : SignupComponent   
      },
      {  
        path : 'appointments',  
        component : AppointmentsComponent  
      }
    ]),
    BrowserAnimationsModule  
  ],
  providers: [BasicAuthHttpInterceptorServiceService],
  bootstrap: [AppComponent],
  entryComponents: [DoctorAppointmentComponent]

})
export class AppModule { }
