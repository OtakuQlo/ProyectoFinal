import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebpayService {

  constructor(private http: HttpClient) { }
  private url = environment.url;

  realizarPago(Datos:any){
    return this.http.post(this.url+'pago/create',Datos)
  }
  verificarPago(token:any){
    return this.http.post(this.url+'pago/commit',token)
  }
}
