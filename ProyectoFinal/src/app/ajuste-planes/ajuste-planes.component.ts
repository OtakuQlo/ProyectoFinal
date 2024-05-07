import { Component } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-ajuste-planes',
  standalone: true,
  imports: [],
  templateUrl: './ajuste-planes.component.html',
  styleUrl: './ajuste-planes.component.css'
})
export class AjustePlanesComponent {
  constructor(private usuarios: UsuarioService) {
    
    
  }

  ajustarPlan(datos:any){
    this.usuarios.editarPlanes(this.usuarios.getUserActive().idusuario,{idplan: datos}).subscribe();
    console.log(this.usuarios.getUserActive().idusuario)
    console.log(datos)
  }
}
