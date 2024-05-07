import { Component } from '@angular/core';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';
import { UsuarioService } from '../../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  act = JSON.parse(localStorage.getItem('pActivo')!)
    

  constructor(private route:Router, private perfilS:PerfilusuarioService, private userS:UsuarioService){ 
    
    
    
    localStorage.removeItem('pActivo') 
    this.perfilS.getPerfiles(parseInt(this.usuario.idusuario)).subscribe((perfiles) => {
      this.perfiles = perfiles
      console.log(localStorage.getItem('usuario'));
      console.log(this.perfiles);
    })
  }

  ngOnInit(): void {
    /* this.perfilS.setActivateUser(parseInt(this.act.id), {estado : false}).subscribe(); */
  }

  activarUser(idP:any){
    localStorage.setItem('pActivo', JSON.stringify(this.perfiles.find(({id} : any) => id === idP)))
    this.perfilS.setActivateUser(parseInt(idP), {estado : true}).subscribe();
    this.route.navigate(['/Venta'])
    console.log(localStorage.getItem('pActivo'));
  }

}
