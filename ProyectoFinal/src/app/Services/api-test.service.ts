import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { marcaModel } from '../shared/marca.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTestService {
  httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
  })
}

  apiUrl = 'http://localhost:3000/';

  constructor(private http:HttpClient) { }

  obtenerMarca():Observable<any>{
    return this.http.get<marcaModel[]>(this.apiUrl+'get');
  }
}

