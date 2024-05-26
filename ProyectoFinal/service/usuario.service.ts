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
      console.log(data);

      localStorage.setItem('token', data.idusuario.toString());
      localStorage.setItem('usuario', JSON.stringify(data));
      console.log(localStorage.getItem('usuario'));

      return true;
    } catch (error) {
      console.error('Error al establecer usuario activo:', error);
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
    console.log(simpleCrypto.decrypt(pass))
    return simpleCrypto.decrypt(pass);
  }


  editarPlanes(id: any, datos: any): Observable<any> {
    return this.http.put(this.url + "/planes/" + id, datos);

  }

  getUsuarioId(id:any): Observable<any>{
    return this.http.get(this.url+"/usuarioid/"+id)
  }
  actualizarContra(id:any,newData:any): Observable<any>{
    return this.http.put(this.url+"/"+id,{contra:newData.contra,estado:0})
  }
  actualizarEstado(id:any,newData:any): Observable<any>{
    return this.http.put(this.url+"/"+id,{contra:newData.contra,estado:1})
  }
  usuarioExistente(email:any,rut:any){
    return this.http.get(this.url+"/existente?email="+email+"&rut="+rut)
  }
}
