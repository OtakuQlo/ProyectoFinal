import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PerdidasService {
  
  constructor(private http: HttpClient) { }
  url = environment.url+'perdidas';
  postPerdidas(perdida:any):Observable<any>{
    return this.http.post(this.url,perdida);
  }
}
