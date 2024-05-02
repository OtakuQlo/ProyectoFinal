import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VentaService } from '../../../service/venta.service';

@Component({
  selector: 'app-realizar-venta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './realizar-venta.component.html',
  styleUrl: './realizar-venta.component.css'
})
export class RealizarVentaComponent {

  constructor(private route:Router, private venta:VentaService){
  }

  codebar: string = '';
  nombre: String = ''; 
  cantidad: number = 0;
  
  //regex
  regexcode: RegExp = /^[a-zA-Z0-9]+$/;
  regexnumeros: RegExp = /^\d+$/;

  //label
  labelnombre: string = '';
  labelcodebar: string = '';
  labelcantidad: string = '';

  valVenta(){
    let bandera = true;

    if(this.nombre.length <= 0){
      bandera = false;
      this.labelnombre = "El nombre del producto no debe estar vacio";
    }else{
      this.labelnombre = ""
    }

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
      console.log('no pass');      
    }else{
      
      console.log('pass');
      // this.router.navigate(['/Home']);
    }

  }

  cancelarVenta(){
    this.nombre = '';
    this.labelnombre = '';
    this.cantidad = 0;
    this.labelcantidad = '';
    this.codebar = '';
    this.labelcodebar = '';
  }
}
