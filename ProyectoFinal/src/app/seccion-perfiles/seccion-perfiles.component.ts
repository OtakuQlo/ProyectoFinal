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
    this.perfilS.getPerfiles(idP).subscribe(data=>{
      if (data[0].estado ==false) {
        this.perfilS.setActivateUser(this.usuario.idusuario,{}).subscribe(data=>{
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
