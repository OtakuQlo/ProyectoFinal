import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <== ¡Añade las importaciones!
import { NavigationExtras, Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-crear-perfil-jefe',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './crear-perfil-jefe.component.html',
  styleUrl: './crear-perfil-jefe.component.css'
})
export class CrearPerfilJefeComponent {
  constructor(private usuarios: UsuarioService){
    console.log(localStorage.getItem('usuario'));
    
  }
  
  nombre: string = '';
  pass1: string = '';
  pass2: string = '';

  labelnombre: string = this.usuarios.getUserActive().nombre;
  labelpass1: string = '';
  labelpass2: string = '';

 

  regexname: RegExp =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,100}$/;


  crearPerfil(){
     let bandera = true;
     console.log(this.pass1,this.pass2)
    if (this.pass1 != this.pass2) {
      bandera = false;
      this.labelpass2 = 'Deben coincidir las contraseñas';
    }else{
      this.labelpass2 = '';
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?^&])[A-Za-z\d@$!#%^?&]{8,50}$/.test(this.pass1)){
      bandera = false;
      this.labelpass1 = "Debe ingresar una contraseña con carateres especiales, mayuscula y numero con minimo de 8 y maximo de 50 caracteres"
    }else{
      this.labelpass1 = '';
    }


    if (bandera) {
      

      this.usuarios.agregarPassAdmin(this.usuarios.getUserActive().idusuario, { passadmin: this.usuarios.encryptContra(this.pass1 )})
      .subscribe(
        response => console.log('Datos actualizados!', response),
        error => console.error('Error al actualizar datos', error)
      );
  
    }

    }

}

