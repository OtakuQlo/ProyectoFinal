import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PerdidasService {

  constructor(private http: HttpClient) { }
  private url = environment.url + 'perdidas';

  postPerdidas(perdida: any):Observable<any> {
    console.log(perdida);
    
    return this.http.post(this.url,perdida);
   }
}
