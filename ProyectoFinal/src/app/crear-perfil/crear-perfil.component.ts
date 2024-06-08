import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <== ¡Añade las importaciones!
import { NavigationExtras, Router } from '@angular/router';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';
import { UsuarioService } from '../../../service/usuario.service';
import { PlansService } from '../../../service/plans.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-crear-perfil',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './crear-perfil.component.html',
  styleUrl: './crear-perfil.component.css'
})
export class CrearPerfilComponent {

  constructor(private route: Router, private perfil: PerfilusuarioService, private user: UsuarioService, private plan: PlansService) {
    
  }

  ngOnInit() {
    // Combina las dos llamadas asincrónicas
    forkJoin([
      this.plan.getPlansId(this.user.getUserActive().idplan),
      this.perfil.cantidadPerfiles(this.user.getUserActive().idusuario)
    ]).subscribe(([planData, perfilesData]) => {
      this.planuser = planData;
      this.cantperfiles = perfilesData;
  
      // Realiza la validación aquí
      if (this.cantperfiles >= this.planuser.cantidademp) {
        window.location.href = '/Perfiles';
      }
    });
  }

  nombre: string = '';
  planuser:any;
  cantperfiles:any;


  labelnombre: string = '';
  

  regexname: RegExp =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,20}$/;


  crearPerfil(){
    let bandera = true;

   if (!this.regexname.test(this.nombre)) {
     bandera = false;
     this.labelnombre =
       'El nombre debe ser sin caracteres epeciales ni numeros con un maximo de 20 caracteres';
   } else {
     this.labelnombre = '';
   }

   if (bandera) {
     this.perfil.postPerfil({
      "idusuario": this.user.getUserActive().idusuario,
      "nombre": this.nombre,
      "estado": 0
     }).subscribe(
      response => {
        
      },
      error => {
        // Manejar los errores aquí si la solicitud falla
      }
    );
    window.location.href = '/AdministrarPerfiles';
   }

 }

}
