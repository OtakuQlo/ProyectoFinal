import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }
  
  url = environment.url;

  realizarCompra(productos: any){
    this.http.post(this.url , productos);
  }
}
