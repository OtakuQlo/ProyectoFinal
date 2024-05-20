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

  realizarCompra(productos: any): Observable<any>{
    return this.http.post(this.url+'detalleventas', productos)
  }

  crearBoleta(boletas: any){
    return this.http.post(this.url+'boletas', boletas)
  }

  async getboletas(id: any){
    try{
      const boleta = await lastValueFrom(this.http.get(this.url+'boletas/'+id))
      console.log(boleta);
      return boleta
    }catch(error){
      return console.error('Error al encontrar el producto:', error);
    }
  }

  actualizarBoleta(id:any, preciototal:any): Observable<any>{
    return this.http.put(this.url+'boletas/'+id, preciototal)
  }

  actualizarDetalle(id:any, cantidad:any): Observable<any>{
    return this.http.put(this.url+'detallesventa/'+id, cantidad)
  }
}
