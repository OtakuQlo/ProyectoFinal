import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OldstocksService {

  constructor(private http: HttpClient) { }
  private url = environment.url;

  getOldStock(id: any){
    return this.http.get(this.url+ 'oldstocks/'+id);
  }

  getStock(id: any){
    return this.http.get(this.url+ 'stockproducts/stock/'+id)
  }

  actualizarEstado(id:any,body:any): Observable<any>{
    return this.http.put(this.url+'oldstocks/'+id,body);
  }
  
}
