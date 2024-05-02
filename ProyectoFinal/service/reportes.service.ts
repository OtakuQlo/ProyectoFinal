import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/api/reportes';

  enviarRespuesta(id: number, datos: any) {
    return this.http.put(`${this.url}/${id}`, datos);
  }

  crearReporte(reporte: any){
    return this.http.post(this.url, reporte);
  }
}
