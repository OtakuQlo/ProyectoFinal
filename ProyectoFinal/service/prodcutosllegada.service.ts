import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdcutosllegadaService {

  constructor(private http: HttpClient) { }

  url = environment.url;

  postProduct(datos:any): Observable<any>{
    return this.http.post(this.url+'productollegadas', datos)
  }

  getProduct(id:any): Observable<any>{
    return this.http.get(this.url+'productollegadas/'+id)
  }
}
