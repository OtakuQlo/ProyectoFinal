import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  url = environment.url+'productos';

  getProductos(): Observable<any>{
    return this.http.get(this.url);
  }

  getProductoVenta(barcode:any){
    return this.http.get(this.url+ "/" +barcode)
  }

}
