import { Component } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { PlansService } from '../../../service/plans.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajuste-planes',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './ajuste-planes.component.html',
  styleUrl: './ajuste-planes.component.css'
})
export class AjustePlanesComponent {
  constructor(private usuarios: UsuarioService, private planS : PlansService) {
    
    
  }

  planactual:any;
  planes:any;
  userplannuevo:any;

  ajustarPlan(datos:any){

    this.usuarios.editarPlanes(this.usuarios.getUserActive().idusuario,{idplan: datos}).subscribe();
    this.userplannuevo = this.usuarios.getUserActive();
    this.userplannuevo.idplan = datos;
    localStorage.setItem('usuario', JSON.stringify(this.userplannuevo));
    this.planUser();
    console.log(this.usuarios.getUserActive());
    console.log(datos);

  }

  ngOnInit(){

    this.planUser();
    this.planS.getPlans().subscribe(data =>{

      this.planes = data;
      console.log(this.planes);

    })
  }

  planUser(){
    this.planS.getPlansId(this.usuarios.getUserActive().idplan).subscribe(data => {
      this.planactual = data;
      console.log(data);

    })
  }


}
