import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilusuarioService {

  url = 'http://localhost:3000/api/perfiles';

  constructor(private http: HttpClient) { }

  postPerfil(perfil:any): Observable<any> {
    return this.http.post(this.url,perfil);
  }

  postPerfilAdmin(datos:any): Observable<any> {
    return this.http.post(this.url+"/admin/",datos);
  }


  getPerfiles(id:any): Observable<any>{
    return this.http.get(this.url+"/"+id)
  }
}
