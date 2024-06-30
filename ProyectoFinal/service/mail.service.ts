import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MailService {
  url = 'http://localhost:3000/api/mail';
  constructor(private http: HttpClient) { }
  recuperarCuenta(id:any): Observable<any>{
    return this.http.post(this.url+"/recuperarcuenta",{id:id})
  }
  respuestaProblema(res:any): Observable<any>{
    return this.http.post(this.url+"/respuestaError",res);
  }

  correoStock(producto:any): Observable<any>{
    return this.http.post(this.url+"/correoStock",producto);
  }
}
