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

  getPerfil(id:any): Observable<any>{
    return this.http.get(this.url+'/perfil/'+id)
  }

  putPerfil(id:any, perfil:any){
    return this.http.put(this.url+"/"+id, perfil);
  }

  deletePerfil(id:any){
    return this.http.delete(this.url+"/"+id);
  }

  setActivateUser(id:any, status:any){
    return this.http.put(this.url+"/ON/"+id, status)
  }

  setInactiveProfile(id:any, status:any){
    return this.http.put(this.url+"/OFF/"+id, status)
  }

  getPerfilActivo(){
    let activoP: any = localStorage.getItem('pActivo')
    return JSON.parse(activoP);
  }

  cantidadPerfiles(id:any): Observable<any> {
    return this.http.get(this.url+"/"+id+"/cantidad");

  }
}
