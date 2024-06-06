import { Component } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { PlansService } from '../../../service/plans.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../service/toast.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajuste-planes',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ajuste-planes.component.html',
  styleUrl: './ajuste-planes.component.css'
})
export class AjustePlanesComponent {
  constructor(private usuarios: UsuarioService, private planS: PlansService, private toastS: ToastService, private router: Router,) {
    

  }

  planactual: any;
  planes: any;
  userplannuevo: any;
  plancambio: any = [
    {

      cantidademp: 3,
      idplan: 1,
      nombreplan: "BASICO",
      precio: 2000
    }
  ];
  rol: any = this.usuarios.getUserActive().rol;
  nombrep: any;
  cantp:any;
  preciop:any;

  


  ajustarPlan(datos: any) {

    this.usuarios.editarPlanes(this.usuarios.getUserActive().idusuario, { idplan: datos }).subscribe();
    this.userplannuevo = this.usuarios.getUserActive();
    this.userplannuevo.idplan = datos;
    localStorage.setItem('usuario', JSON.stringify(this.userplannuevo));
    this.planUser();
    this.router.navigate(['/Venta']);
    this.toastS.showSuccess('Su plan ha sido cambiado con exito.', 'Cambio existoso')


  }

  ngOnInit() {

    this.planUser();
    this.planS.getPlans().subscribe(data => {

      this.planes = data;
      console.log(this.planes);

    })

    this.rol = this.usuarios.getUserActive().rol;
    
    console.log(this.plancambio);
    console.log(this.rol);

  }

  planUser() {
    this.planS.getPlansId(this.usuarios.getUserActive().idplan).subscribe(data => {
      this.planactual = data;
      


    })
  }

  planSeleccionado(dato: any) {
    this.plancambio = dato;
    console.log(dato)
    this.nombrep = this.plancambio.nombreplan;
    this.cantp = this.plancambio.cantidademp;
    this.preciop = this.plancambio.precio;
  }

  editarPlan(plan:any){
    this.planS.updatePlans(plan.idplan,{nombreplan: this.nombrep, cantidademp : this.cantp, precio:this.preciop}).subscribe();
    window.location.href = '/AjustePlan';
   
  }




}
