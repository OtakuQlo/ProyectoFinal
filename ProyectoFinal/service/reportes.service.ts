import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  url = environment.url+'reportes';

  enviarRespuesta(id: number, datos: any) {
    return this.http.put(`${this.url}/${id}`, datos);
  }

  crearReporte(reporte: any){
    return this.http.post(this.url, reporte);
  }
  getReportes(): Observable<any>{
    return this.http.get(this.url);
  }
}
