import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  url = environment.url+'productos';
// manuel debes cambiar esta parte para la get stock
  getProductos(): Observable<any>{
    return this.http.get(this.url+'/stock/');
  }
  getProductostock(idusuario:any): Observable<any>{
    return this.http.get(this.url+'/stock/'+idusuario);
  }

  getProductoVenta(barcode:any, datos:any){
    const params = new HttpParams().set('idusuario', datos.idusuario);
    return this.http.get(this.url+'/producto/'+barcode , { params });  
  }

  getProductoId(id:any):Observable<any>{
    return this.http.get(this.url+"/id/"+id);
  }

  editProduct(id:any,datos:any):Observable<any>{
    return this.http.put(this.url+"/"+id,datos);
  }

}
