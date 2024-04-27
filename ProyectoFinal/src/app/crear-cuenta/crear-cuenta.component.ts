import { Component } from '@angular/core';
import { Router } from '@angular/router';
import SimpleCrypto from 'simple-crypto-js';
import { UsuarioService } from '../../../service/usuario.service';
@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css',
})
export class CrearCuentaComponent {
  constructor(private router: Router, private _serviceUsuario : UsuarioService) {
    
  }
  rut: String = '';
  correo: String = '';
  telefono: number = 0;
  pass: String = 'd';
  pass1: String = 'd';
  ngOnInit(): void {
    this.crearCuenta();
    // const cipherText = simpleCrypto.encrypt(plainText);

    // const decipherText = simpleCrypto.decrypt(cipherText);

  }
  crearCuenta(){
    const secretKey = 'romeoyjulieta';
    const simpleCrypto = new SimpleCrypto(secretKey);
    const cipherText = simpleCrypto.encrypt(this.pass);
    const decipherText = simpleCrypto.decrypt(cipherText);
    console.log(decipherText)
    let flag = true;
    if (this.pass != this.pass1) {
      flag = false;
    }
    if (flag) {
      console.log("hola")
      this._serviceUsuario.postUsuario({
        "idusaurio":'',
        "nombre": "andres",
        "apellido": "bastidas",
        "rut": "this.rut",
        "contra":cipherText,
        "telefono": 2324,
        "idplan": 1,
        "passadmin": 2,
        "email": "this.csssosssrssreo",
        "rol":1
      }).subscribe(
        response => {
          // Manejar la respuesta aquí si es necesario
        },
        error => {
          // Manejar los errores aquí si la solicitud falla
        }
      );
      
    }
    }
   
  }

