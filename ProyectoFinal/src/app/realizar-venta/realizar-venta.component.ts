import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VentaService } from '../../../service/venta.service';
import { ToastService } from '../../../service/toast.service';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';
import { ProductoService } from '../../../service/producto.service';

@Component({
  selector: 'app-realizar-venta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './realizar-venta.component.html',
  styleUrl: './realizar-venta.component.css'
})
export class RealizarVentaComponent {

  constructor(private venta:VentaService, private alert:ToastService, private perfil:PerfilusuarioService, private productoS:ProductoService){
    this.alert.showSuccess('','Bienvenido '+this.perfilV.nombre)
    console.log(localStorage.getItem('pActivo'));
   
  }

  //Insert
  detalle : any;
  producto : any;
  boleta : any;
  total : number = 0;

  //Producto
  codebar: string = '';
  nombre: String = ''; 
  cantidad: number = 0;
  
  //Perfil
  perfilV : any = this.perfil.getPerfilActivo()

  //regex
  regexcode: RegExp = /^[a-zA-Z0-9]+$/;
  regexnumeros: RegExp = /^\d+$/;

  //label
  labelnombre: string = '';
  labelcodebar: string = '';
  labelcantidad: string = '';

  valVenta(){
    let bandera = true;
    if(!this.regexcode.test(this.codebar)){
      bandera = false;
      this.labelcodebar = "Solo se pueden ingresar numeros y letras en el codigo de barras"
    }else{
      this.labelcodebar = " ";
    }

    if (!this.regexnumeros.test(this.cantidad.toString()) || this.cantidad <=0 || this.cantidad > 50) {
      bandera = false;
      this.labelcantidad = "Solo se acepta numeros y mayor de 0 hasta 50"
    }else{
      this.labelcantidad = "";
    }

    if(!bandera){
      this.alert.errorSuccess('','Asegurate de rellenar bien los campos')
    }else{
      this.alert.showSuccess('','Se agrego el producto')
    }

  }

  pagarVenta(){
    
  }

  agregarProducto(){
    this.productoS.getProductoVenta(this.codebar).subscribe((producto) =>{
      this.producto = producto
    })
    this.nombre = this.producto.nombre
    console.log(this.producto);
    
  }

  cancelarPago(){
    this.boleta = []
    this.producto = []
    this.boleta = []
  }

  detalleVenta(){

  }

  boletaVenta(){

  }

  stockProducto(){

  }

  cancelarVenta(){
    this.nombre = '';
    this.labelnombre = '';
    this.cantidad = 0;
    this.labelcantidad = '';
    this.codebar = '';
    this.labelcodebar = '';
  }

  addC(){
    return this.cantidad = this.cantidad + 1
  }

  lessC(){
    if (this.cantidad < 1){
      return this.cantidad = 0
    }
    return this.cantidad = this.cantidad -1
  }
}
