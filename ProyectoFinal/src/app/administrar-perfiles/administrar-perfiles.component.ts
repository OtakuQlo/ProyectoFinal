import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';
import { UsuarioService } from '../../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../service/toast.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-administrar-perfiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrar-perfiles.component.html',
  styleUrl: './administrar-perfiles.component.css'
})
export class AdministrarPerfilesComponent {

  usuario: any = this.userS.getUserActive()
  perfiles: any;
  perfilU : any = {
    id : 0,
    idusuario : this.usuario.idusuario,
    nombre : this.usuario.nombre,
    estado : false,
    passadmin : 'asdas'
  }

  constructor(private perfilS:PerfilusuarioService, private userS:UsuarioService, private error:ToastService){    
    this.getUSERS();
    console.log(localStorage.getItem('usuario'));
    console.log(this.perfiles);
  }

  ngOnInit(): void {
  }

  editarPerfil(id:any){
    this.perfilS.editarPerfil(id, 'Andres')
  }
  
  getUSERS(){
    this.perfilS.getPerfiles(parseInt(this.usuario.idusuario)).subscribe((perfiles) => {
      this.perfiles = perfiles;
      this.perfiles.unshift(this.perfilU);      
    })
  }

  borrarPerfil(id:any){
    if (id === 0) {
      return this.error.errorSuccess('No se puede eliminar el perfil de administrador','Error Borrando un Perfil')
    }
    this.perfilS.deletPerfil(id)
    this.getUSERS()
    console.log(this.perfiles);
    return this.error.showSuccess('Perfil Eliminado correctamente', '')    
  }
}
