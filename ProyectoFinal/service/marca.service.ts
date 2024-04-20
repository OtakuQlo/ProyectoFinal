import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  url = 'http://localhost:3000/api/marca';

  constructor(private http: HttpClient) { }

  getMarca(): Observable<any> {
    return this.http.get(this.url);
  }
}
