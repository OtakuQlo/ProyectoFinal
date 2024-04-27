import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  postUsuario(usuario:any): Observable<any> {
    return this.http.post(this.url,usuario);
  }

}
