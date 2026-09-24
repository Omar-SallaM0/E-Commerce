import { ILogin, ILoginResponse, IRegister } from '../interfaces/iregister';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../apiRoot/base-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }

  register(registerData: IRegister) :Observable<any> {
    return this.http.post(`https://dummyjson.com/users/add`, registerData);
  }
    login(loginUser: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${baseUrl}/auth/login`, loginUser);
  }
}
