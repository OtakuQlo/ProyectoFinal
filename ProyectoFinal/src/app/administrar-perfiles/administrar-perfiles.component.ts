import { Component } from '@angular/core';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';
import { UsuarioService } from '../../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../service/toast.service';


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

  constructor(private perfilS:PerfilusuarioService, private userS:UsuarioService, private error:ToastService){    
    this.getUSERS();    
  }

  ngOnInit(): void {
  }

  editarPerfil(id:any){
    console.log(id);
    this.perfilS.putPerfil(parseInt(id), {nombre : "Manuel" ,passadmin : null}).subscribe();
    console.log(this.perfiles);
    
  }
  
  getUSERS(){
    this.perfilS.getPerfiles(parseInt(this.usuario.idusuario)).subscribe((perfiles) => {
      this.perfiles = perfiles;    
    })
  }

  borrarPerfil(id:any){
    console.log(id);
    if (id === 0) {
      return this.error.errorSuccess('No se puede eliminar el perfil de administrador','Error Borrando un Perfil')
    }
    this.perfilS.deletePerfil(parseInt(id)).subscribe();
    console.log(this.perfiles);
    this.getUSERS();
    return this.error.showSuccess('Perfil Eliminado correctamente', '')    
  }
}
