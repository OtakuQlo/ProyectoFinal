import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  constructor(private http: HttpClient) { }
  private urlTarjeta = environment.url+'tarjeta'
  
  getTarjeta(idusaurio:any): Observable<any>{
    return this.http.get(this.urlTarjeta+"/obtenertarjeta/"+idusaurio);
  }
  postTarjeta(tarjeta:any): Observable<any>{
    return this.http.post(this.urlTarjeta+"/creartarjeta",tarjeta);
  }
  putTarjeta(idTarjeta:any,tarjeta:any): Observable<any>{
    return this.http.put(this.urlTarjeta+"/actualizartarjeta/"+idTarjeta,tarjeta);
  }
  deleteTarjeta(idTarjeta:any): Observable<any>{
    return this.http.delete(this.urlTarjeta+"/eliminartarjeta/"+idTarjeta);
  }
}
