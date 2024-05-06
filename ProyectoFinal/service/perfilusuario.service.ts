import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilusuarioService {

  url = environment.url+'perfiles';

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

  editarPerfil(id:any, perfil:any){
    return this.http.put(this.url+"/"+id, perfil)
  }

  deletPerfil(id:any){
    return this.http.delete(this.url+"/"+id)
  }
}
