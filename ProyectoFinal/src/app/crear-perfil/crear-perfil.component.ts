import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <== ¡Añade las importaciones!
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-crear-perfil',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './crear-perfil.component.html',
  styleUrl: './crear-perfil.component.css'
})
export class CrearPerfilComponent {
  nombre: string = '';
  

  labelnombre: string = '';
  

  regexname: RegExp =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,100}$/;


  crearPerfil(){
    let bandera = true;

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
