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

  constructor(private route:Router, private perfilS:PerfilusuarioService, private userS:UsuarioService){
    this.perfilS.getPerfiles().subscribe((perfiles) => {
      this.perfiles = perfiles.filter((perfilArr:any) => perfilArr.idusuario == this.usuario.idusuario);
      console.log(this.perfiles);
    })
  }

  ngOnInit(): void {
  }

  activarUser(idP:any){
    localStorage.setItem('pActivo', JSON.stringify(this.perfiles.find(({id} : any) => id === idP)))
    this.route.navigate(['/Venta'])
    console.log(localStorage.getItem('pActivo'));
  }

}
