import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import SimpleCrypto from 'simple-crypto-js';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  //Consultas para url a la que se desea entrar y si esta logeado el user
  readonly KeyLoggeo = 'loged';
  private urlAcceso = '';

  //Status del login
  public LoginStatusSubject = new Subject<boolean>();
  public ChangeLoginStatus = this.LoginStatusSubject.asObservable();
  
  // publicar el nuevo usuario
  postUsuario(usuario: any): Observable<any> {
    // enviar el nuevo usuario
    console.log(usuario);
    return this.http.post(this.url, usuario);
  }

  // validar el nuevo usuario

  getUserEmail(email: any): Observable<any> {
    return this.http.get(this.url + '/' + email);
  }

  agregarPassAdmin(id: number, datos: any) {
    return this.http.put(
      `http://localhost:3000/api/usuarios/passadmin/${id}`,
      datos
    );
  }

  setUserActive(user: any) {
      localStorage.setItem("usuario", JSON.stringify(user));
      localStorage.setItem(this.KeyLoggeo, 'true');
      this.LoginStatusSubject.next(true);
  }

  deletUserActive() {
    let flag = localStorage.getItem('usuario') ? true : false;
    localStorage.removeItem(this.KeyLoggeo)
    this.LoginStatusSubject.next(false);
    return flag ? localStorage.removeItem('usuario') : false;
  }

  //verifica si esta activo
  isActive(urlAC: string){
    const isLogged = localStorage.getItem(this.KeyLoggeo);
    if (!isLogged) {
      this.urlAcceso = urlAC;
      return false;
    }
    return true;
  }
  
  getUserActive() {
    return localStorage.getItem("usuario");
  }

  encryptContra(pass: any) {

    const secretKey = 'romeoyjulieta';
    const simpleCrypto = new SimpleCrypto(secretKey);
    return simpleCrypto.encrypt(pass);
  }
}
