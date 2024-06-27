import { Component } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { PlansService } from '../../../service/plans.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../service/toast.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';

@Component({
  selector: 'app-ajuste-planes',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ajuste-planes.component.html',
  styleUrl: './ajuste-planes.component.css'
})
export class AjustePlanesComponent {
  constructor(private usuarios: UsuarioService, private planS: PlansService, private toastS: ToastService, private router: Router,private perfilS:PerfilusuarioService) {
    

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
  plan:any;
  bandera : boolean = true;
  bandera2 : boolean = true;
  bandera3 : boolean = true;
  banderafinal:boolean = false;
  habilitador:any = "disabled";
  cantperfiles:any;
  regexnumeros: RegExp = /^\d+$/;
  labelnombre: string = '';
  labelcantidad:string = '';
  labelprecio:string= '';

  

  


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
    this.cantidadDePlanes();
    this.planUser();
    this.planS.getPlans().subscribe(data => {

      this.planes = data;
      

    })

    this.rol = this.usuarios.getUserActive().rol;
    
    

  }

  planUser() {
    this.planS.getPlansId(this.usuarios.getUserActive().idplan).subscribe(data => {
      this.planactual = data;
      


    })
  }

  planSeleccionado(dato: any) {
    this.plancambio = dato;
    
    this.nombrep = this.plancambio.nombreplan;
    this.cantp = this.plancambio.cantidademp;
    this.preciop = this.plancambio.precio;
  }

  validarDatos(){
    

    if (this.nombrep.length <= 0 || this.nombrep.length > 50) {

      this.bandera = true;
      this.labelnombre = "El nombre del plan no debe estar vacio y no debe sobre pasar los 20 caracteres";
    } else {
      this.labelnombre = " ";
      this.bandera = false;
    }

    

    if (!this.regexnumeros.test(this.cantp.toString())) {
      this.bandera2 = true;
      this.labelcantidad = "Solo se acepta numeros";
    } else {
      this.labelcantidad = " ";
      this.bandera2 = false;
    }


    if (!this.regexnumeros.test(this.preciop.toString())) {
      this.bandera3 = true;
      this.labelcantidad = "Solo se acepta numeros";
    } else {
      this.labelprecio = " ";
      this.bandera3 = false;
    }
    this.banderafinal = this.bandera || this.bandera2 || this.bandera3;


  }

  editarPlan(plan:any){
    
    
    

    this.planS.updatePlans(plan.idplan,{nombreplan: this.nombrep, cantidademp : this.cantp, precio:this.preciop}).subscribe();
    window.location.href = '/AjustePlan';
   
  }


  planEnUso(){
    if (this.usuarios.getUserActive()) {
      this.planS.getPlansId(this.usuarios.getUserActive().idplan).subscribe(data => {
        this.plan = data;
      });
    }
  }

  cantidadDePlanes(){
    if (this.usuarios.getUserActive()) {
      this.perfilS.cantidadPerfiles(this.usuarios.getUserActive().idusuario).subscribe(data => {
        this.cantperfiles = data;
      });
    }
    
  }

  irPerfiles(){
    window.location.href = '/AdministrarPerfiles'
  }




}
