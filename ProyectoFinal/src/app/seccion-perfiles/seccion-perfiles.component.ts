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

  usuario: any;
  perfiles: any;
    

  constructor(private route:Router, private perfilS:PerfilusuarioService, private userS:UsuarioService, private alert:ToastService){ 
    
  }

  ngOnInit(){  
    this.usuario = this.userS.getUserActive() 
    this.getPerfiles();
  }

  getPerfiles(){
    this.perfilS.getPerfiles(parseInt(this.usuario.idusuario)).subscribe((perfiles) => {
      this.perfiles = perfiles
    })
  }

  activarUser(idP:any){
    console.log(idP);
    this.perfilS.getPerfil(idP).subscribe(data=>{
      let perfil = data
      console.log(data);
      
      if (perfil.estado ==false) {
        this.perfilS.setActivateUser(idP,{estado : true}).subscribe(data=>{
          console.log(data);
        })
      }else{
        console.log("ya inicio");
      }      
    })
  }

  irHome(){
    // this.userS.deletUserActive()
    // localStorage.removeItem('pActivo')
    // this.route.navigate(['/Home'])
  }

}
