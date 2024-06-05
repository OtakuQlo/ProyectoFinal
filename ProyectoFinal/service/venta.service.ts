import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }
  
  url = environment.url;

  realizarCompra(productos: any){
    return this.http.post(this.url+'detalleventas', productos)
  }

  crearBoleta(boletas: any){
    return this.http.post(this.url+'boletas', boletas)
  }

  async getboleta(id: any){
    try{
      const boleta = await lastValueFrom(this.http.get(this.url+'boletas/'+id))
      return boleta
    }catch(error){
      return console.error('Error al encontrar el producto:', error);
    }
  }
  getBoletas(idPerfil:any): Observable<any>{
    return this.http.get(this.url+"boletas/boletas/"+idPerfil);
  }

  actualizarBoleta(id:any, preciototal:any): Observable<any>{
    return this.http.put(this.url+'boletas/'+id, preciototal)
  }

  actualizarDetalle(id:any, datos:any): Observable<any>{
    return this.http.put(this.url+'detalleventas/'+id, datos)   
  }

  getDetalle(id:any): Observable<any>{
    return this.http.get(this.url+'detalleventas/'+id)
  }
}
