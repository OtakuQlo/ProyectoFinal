import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <== ¡Añade las importaciones!
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [
    FormsModule,],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
  constructor(
    private router: Router,
  ) {
    
  }
  nombre: String = '';
  fecha:any;
  cantidad: number = 0;
  prelle: number = 0;
  preven: number = 0;
  codebar: string = '';

  //regex

  regexcode: RegExp = /^[a-zA-Z0-9]+$/;
  regexnumeros: RegExp = /^\d+$/;
  

  //label de error
  labelnombre: string = '';
  labelcodebar: string = '';
  labelcantidad: string = '';
  labelpreven: string = '';
  labelprelle: string = '';
  labelfecha: string = '';


  

  //formato fecha para dar el minimo al input
  fechahoy: Date = new Date();  

  dia: String = ("0" + this.fechahoy.getDate()).slice(-2); // Día del mes
  mes: String = ("0" + (this.fechahoy.getMonth() + 1)).slice(-2); // Los meses en JavaScript empiezan en 0
  anio: number = this.fechahoy.getFullYear();

  fechaFormateada1: String = `${this.dia}-${this.mes}-${this.anio}`;
  fechaFormateada: String = `${this.anio}-${this.mes}-${this.dia}`;



  agregarProducto(){

    let bandera = true;//bandera que permite guardar un articulo, en caso de ser true es porque las validaciones son correctas y se añade el producto

    // validacion de que se seleccione una fecha de vencimiento
    if(!this.fecha){
      bandera = false;
      this.labelfecha = "Debe haber una fecha selecionada";
    }else{
      this.labelfecha = "";
    }

    // validacion que nombre del producto no este vacio

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

    if (!this.regexnumeros.test(this.cantidad.toString()) || this.cantidad <=0 || this.cantidad > 999) {
      bandera = false;
      this.labelcantidad = "Solo se acepta numeros y mayor de 0 hasta 999"
    }else{
      this.labelcantidad = " ";
    }

    if (!this.regexnumeros.test(this.preven.toString()) || this.preven <=0 || this.preven > 100000) {
      bandera = false;
      this.labelpreven = "Solo se acepta numeros y mayor de 0 hasta 100000"
    }else{
      this.labelpreven = " ";
    }

    if (!this.regexnumeros.test(this.prelle.toString()) || this.prelle <=0 || this.prelle > 100000) {
      bandera = false;
      this.labelprelle = "Solo se acepta numeros y mayor de 0 hasta 100000"
    }else{
      this.labelprelle = " ";
    }


    if(!bandera){
      this.nombre = "pepe";
    }else{
      this.nombre = "Momo";
      // this.router.navigate(['/Home']);
    }
  }
  
}
