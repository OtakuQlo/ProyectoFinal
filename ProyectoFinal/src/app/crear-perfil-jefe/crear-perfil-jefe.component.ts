import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <== ¡Añade las importaciones!
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-crear-perfil-jefe',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './crear-perfil-jefe.component.html',
  styleUrl: './crear-perfil-jefe.component.css'
})
export class CrearPerfilJefeComponent {
  nombre: string = '';
  pass1: string = '';
  pass2: string = '';

  labelnombre: string = '';
  labelpass1: string = '';
  labelpass2: string = '';

  regexname: RegExp =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,100}$/;


  crearPerfil(){
     let bandera = true;
     console.log(this.pass1,this.pass2)
    if (this.pass1 != this.pass2) {
      bandera = false;
      this.pass2 = '';
      this.pass1 = '';
      this.labelpass2 = 'Deben coincidir las contraseñas';
    }else{
      this.labelpass2 = '';
    }

    if (!this.regexname.test(this.nombre)) {
      bandera = false;
      this.labelnombre =
        'El nombre debe ser sin caracteres epeciales ni numeros.';
    } else {
      this.labelnombre = '';
    }

    if (!bandera) {
      // no avanza
    }else{
      // avanza
    }

  }
}
