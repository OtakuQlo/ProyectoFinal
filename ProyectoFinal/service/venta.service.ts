import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }
  
  url = 'http://localhost:3000/api/';

  realizarCompra(productos: any){
    this.http.post(this.url , productos);
  }
}
