import { Component } from '@angular/core';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';
import { UsuarioService } from '../../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-seccion-perfiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-perfiles.component.html',
  styleUrl: './seccion-perfiles.component.css'
})
export class SeccionPerfilesComponent {

  usuario: any = this.userS.getUserActive()
  perfiles: any;
    

  constructor(private route:Router, private perfilS:PerfilusuarioService, private userS:UsuarioService, private alert:ToastService){ 
    this.perfilS.getPerfiles(parseInt(this.usuario.idusuario)).subscribe((perfiles) => {
      this.perfiles = perfiles
     
      
      let perfil : any = this.perfiles.find(({id} : any) => id === 1)
      console.log(perfil);
    })
  }

  ngOnInit(): void {
    
    
  }

  activarUser(idP:any){
    let perfil : any = this.perfiles.find(({id} : any) => id === idP)
    if (perfil.estado === true){
      return this.alert.errorSuccess('Seleccione otro','Perfil ya en uso')
    }else {
      localStorage.setItem('pActivo', JSON.stringify(this.perfiles.find(({id} : any) => id === idP)))
      this.perfilS.setActivateUser(parseInt(idP), {estado : true}).subscribe();
      this.route.navigate(['/Venta'])
      console.log(localStorage.getItem('pActivo'));
    }
    
  }

  

}
