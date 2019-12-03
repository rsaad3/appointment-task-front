import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginUser {
  constructor(
    public status: string,
  ) { }
}

export class JwtResponse {
  constructor(public jwttoken: string) { }
}

export class AuthenticationServiceService {
  private baseUrl =  "http://localhost:8080/"


  constructor(private httpClient: HttpClient) { }

  authenticate(username, password) {
    return this.httpClient.post<any>(this.baseUrl+ '/authenticate', { username, password }).
    subscribe(userData => {
        sessionStorage.setItem('username', username);
        let tokenStr = 'Bearer ' + userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
      });
    
  }


  isUserLogedIn() {
    let user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);

  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}
