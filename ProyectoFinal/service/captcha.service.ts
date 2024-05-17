import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {

  constructor(private http: HttpClient) { }
  url = 'https://www.google.com/recaptcha/api/siteverify?secret=6LdmJt4pAAAAAPx7_2guTX08IAIG-SXvYoIgg71M&response=';
  getResponse(response:string): Observable<any>{
    return this.http.get(this.url+response)
  }
}
