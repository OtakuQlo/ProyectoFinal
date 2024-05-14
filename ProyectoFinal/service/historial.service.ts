import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private http: HttpClient) { }
  private urlIngresos = environment.url+'productollegadas'
  
  getProductoLLegadas(): Observable<any>{
    return this.http.get(this.urlIngresos);
  }
}
