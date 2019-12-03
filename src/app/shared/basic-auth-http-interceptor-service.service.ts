import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from '@syncfusion/ej2-base';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorServiceService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: { Authorization: sessionStorage.getItem('token') }
      });

    
    }

    return next.handle(req);
  }
}
