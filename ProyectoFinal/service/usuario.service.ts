import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import SimpleCrypto from 'simple-crypto-js';
import { environment } from '../src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = 'http://localhost:3000/api/usuarios';
  

  constructor(private http: HttpClient) {}

  // publicar el nuevo usuario

  postUsuario(usuario: any): Observable<any>{
   return this.http.post(this.url, usuario)
  }

  // validar el nuevo usuario

  getUserEmail(email: any): Observable<any> {
    return this.http.get(this.url + '/' + email);
  }

  setUserActive(user: any) {  
    localStorage.setItem('usuario', JSON.stringify(user))

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
}
