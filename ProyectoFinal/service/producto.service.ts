import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  url = environment.url+'productos';

  getProductos(): Observable<any>{
    return this.http.get(this.url);
  }

  async getProductoVenta(barcode:any){
    try{
      const producto = await lastValueFrom(this.http.get(this.url+ "/" +barcode))
      console.log(producto);
      return producto
    }catch(error){
      return console.error('Error al encontrar el producto:', error);
    }
  }

}
