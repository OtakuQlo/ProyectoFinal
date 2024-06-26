import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import SimpleCrypto from 'simple-crypto-js';
import { environment } from '../src/environments/environment';
import { lastValueFrom, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = 'http://localhost:3000/api/usuarios';


  constructor(private http: HttpClient) { }

  // publicar el nuevo usuario

  postUsuario(usuario: any): Observable<any> {
    return this.http.post(this.url, usuario)
  }

  // validar el nuevo usuario

  getUserEmail(email: any): Observable<any> {
    return this.http.get(this.url + '/email/' + email);
  }

  async setUserActive(email: any): Promise<boolean> {
    try {
      const data = await lastValueFrom(this.getUserEmail(email));
      

      localStorage.setItem('token', data.idusuario.toString());
      localStorage.setItem('usuario', JSON.stringify(data));
      

      return true;
    } catch (error) {
      
      return false;
    }
  }



  deletUserActive() {
    let flag = localStorage.getItem('usuario') ? true : false;
    return flag ? localStorage.removeItem('usuario') : false;
  }

  getUserActive() {
    let activoU: any = localStorage.getItem('usuario');

    return JSON.parse(activoU);
  }

  encryptContra(pass: any) {
    const secretKey = environment.key;
    const simpleCrypto = new SimpleCrypto(secretKey);
    return simpleCrypto.encrypt(pass);
  }
  desencryptContra(pass: any) {
    const secretKey = environment.key;
    const simpleCrypto = new SimpleCrypto(secretKey);
    return simpleCrypto.decrypt(pass);
  }


  editarPlanes(id: any, datos: any): Observable<any> {
    return this.http.put(this.url + "/planes/" + id, datos);

  }

  getUsuarioId(id:any): Observable<any>{
    return this.http.get(this.url+"/usuarioid/"+id)
  }
  actualizarContra(id:any,pass:any): Observable<any>{
    return this.http.put(this.url+"/"+id,pass)
  }
  actualizarUsuario(id:any,user:any): Observable<any>{
    
    return this.http.put(this.url+"/actualizarUsuario/"+id,user)
  }
  usuarioExistente(email:any,rut:any): Observable<any>{
    return this.http.get(this.url+"/existente?email="+email+"&rut="+rut)
  }
  habilitarUsuario(id:any,body:any): Observable<any>{
    return this.http.put(this.url+"/habilitar/"+id,body);
  }
}
