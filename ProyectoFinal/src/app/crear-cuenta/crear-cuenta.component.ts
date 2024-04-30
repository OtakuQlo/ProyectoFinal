import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgModule } from '@angular/core';
import SimpleCrypto from 'simple-crypto-js';
import { UsuarioService } from '../../../service/usuario.service';
import { validateRut } from '@fdograph/rut-utilities';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css',
})
export class CrearCuentaComponent {
  validNombre: boolean = false;
  validApellido: boolean = false;
  validRut: boolean = false;
  validarCorreo: boolean = false;
  validarPass: boolean = false;
  validarPass2: boolean = false;
  validartelefono: boolean = false;
  checkboxTermState: boolean = false;
  checkboxFirst: boolean = false;
  checkboxSecond: boolean = false;
  checkboxThird: boolean = false;
  plan: number = 0;
  constructor(
    private router: Router,
    private _serviceUsuario: UsuarioService
  ) {}

  registroForm = new FormGroup({
    rut: new FormControl('202995470', [Validators.required]),
    correo: new FormControl('dadas@gmail.com', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/),
    ]),
    telefono: new FormControl('56985420', [
      Validators.required,
      Validators.max(99999999),
      Validators.min(10000000),
    ]),
    pass: new FormControl('7SOB4SLdi7i27KO@', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?^&])[A-Za-z\d@$!#%^?&]{8,50}$/
      ),
    ]),
    pass1: new FormControl('7SOB4SLdi7i27KO@', [Validators.required]),
    nombre: new FormControl('sadasd', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,100}$/
      ),
    ]),
    apellido: new FormControl('dasdsa', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,100}$/
      ),
    ]),
  });
  ngOnInit(): void {}
  // funcion de crear cuenta
  crearCuenta(
    nombre: any,
    apellido: any,
    rut: any,
    contra: any,
    email: any,
    telefono: any,
    idplan: any,
    passadmin: any
  ) {
    console.log('hola');

    const secretKey = 'romeoyjulieta';
    const simpleCrypto = new SimpleCrypto(secretKey);
    console.log('hola');
    const cipherText = simpleCrypto.encrypt(contra);
    this._serviceUsuario.postUsuario({
      
      idusaurio: '',
      nombre: nombre,
      apellido: apellido,
      rut: rut,
      contra: cipherText,
      telefono: telefono,
      idplan: idplan,
      passadmin: passadmin,
      email: email,
      rol: 1,
    });
  }

  // funcion de validar
  onSubmit() {
    let usuario = this.registroForm.value;
    let flag = true;

    // los formularios deben de tener contenido
    if (this.registroForm.status != 'VALID') {
      flag = false;
    }
    // Validar que rut sea el correcto
    this.validRut =
      this.registroForm.get('rut')?.status == 'VALID' ? false : true;
    this.validRut = validateRut(usuario.rut?.toString()) ? false : true;
    // Validar Nombre
    this.validNombre =
      this.registroForm.get('nombre')?.status == 'VALID' ? false : true;
    //Validar Apellido
    this.validApellido =
      this.registroForm.get('apellido')?.status == 'VALID' ? false : true;
    // validar correo electronico
    this.validarCorreo =
      this.registroForm.get('correo')?.status == 'VALID' ? false : true;
    // validar telefono
    this.validartelefono =
      this.registroForm.get('telefono')?.status == 'VALID' ? false : true;
    // validar contraseña
    this.validarPass =
      this.registroForm.get('pass')?.status == 'VALID' ? false : true;
    this.validarPass2 =
      this.registroForm.get('pass1')?.status == 'VALID' ? false : true;
    this.validarPass2 =
      this.registroForm.value.pass == this.registroForm.value.pass1
        ? false
        : true;
    if (
      !this.validarCorreo &&
      !this.validApellido &&
      !this.validNombre &&
      !this.validarPass &&
      !this.validarPass2 &&
      !this.validartelefono &&
      !this.validRut &&
      flag
    ) {
      if (this.checkboxTermState) {
        if (this.checkboxFirst || this.checkboxSecond || this.checkboxThird) {
          console.log('hola');
          this.crearCuenta(
            usuario.nombre,
            usuario.apellido,
            usuario.rut,
            usuario.pass,
            usuario.correo,
            usuario.telefono,
            1,
            'sda'
          );
        }
      }
    }
  }
  CheckboxChanges1() {
    this.checkboxSecond = false;
    this.checkboxThird = false;
  }
  CheckboxChanges2() {
    this.checkboxFirst = false;
    this.checkboxThird = false;
  }
  CheckboxChanges3() {
    this.checkboxSecond = false;
    this.checkboxFirst = false;
  }
}
