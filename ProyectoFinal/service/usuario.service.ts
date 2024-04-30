import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import SimpleCrypto from 'simple-crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  // publicar el nuevo usuario
  postUsuario(usuario:any): Observable<any> {
    // enviar el nuevo usuario
    console.log(usuario);
    return this.http.post(this.url,usuario);
    
  }


  // validar el nuevo usuario
  
  getUserEmail(email:any): Observable<any>{
     return this.http.get(this.url+'/'+email);
  }


  agregarPassAdmin(id: number, datos: any) {
    return this.http.put(`http://localhost:3000/api/usuarios/passadmin/${id}`, datos);
  }


  setUserActive(user:any){
    localStorage.setItem("usuario",JSON.stringify(user));
  }
  getUserActive(){
    return localStorage.getItem("usuario");
  }
  encryptContra(pass:any){
    const secretKey = 'romeoyjulieta';
    const simpleCrypto = new SimpleCrypto(secretKey);
    return simpleCrypto.encrypt(pass);
  }
}
