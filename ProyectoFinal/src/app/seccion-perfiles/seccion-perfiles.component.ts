import { Component } from '@angular/core';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';
import { UsuarioService } from '../../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../../../service/toast.service';
import { interval, switchMap } from 'rxjs';

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
    this.getPerfiles()
    console.log(this.userS.getUserActive());
    
  }

  ngOnInit(){   
    interval(5000) // Intervalo de 10 segundos
      .pipe(
        switchMap(() => this.perfilS.getPerfiles(parseInt(this.usuario.idusuario)))
      )
      .subscribe((perfiles) => {
        this.perfiles = perfiles;
      });
  }

  getPerfiles(){
    this.perfilS.getPerfiles(parseInt(this.usuario.idusuario)).subscribe((perfiles) => {
      this.perfiles = perfiles
    })
  }

  activarUser(idP:any){
    /* this.getPerfiles */
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
