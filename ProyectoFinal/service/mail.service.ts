import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MailService {
  url = 'http://localhost:3000/api/api/mail';
  constructor(private http: HttpClient) { }
  recuperarCuenta(id:any): Observable<any>{
    console.log(id);
    
    return this.http.post(this.url,{id:id})
  }
}
