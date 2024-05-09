import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <== ¡Añade las importaciones!
import { NavigationExtras, Router } from '@angular/router';
import { MarcaService } from '../../../service/marca.service';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../../service/empresa.service';
import { ProdcutosllegadaService } from '../../../service/prodcutosllegada.service';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [
    FormsModule,CommonModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
  constructor(
    private router: Router,
    private _marcaservice: MarcaService,
    private empresa: EmpresaService,
    private producto: ProdcutosllegadaService,
    private usuario: UsuarioService
  ) {
    
  }
  ngOnInit(): void {
    this.obtenermarcas();
    this.obtenerEmpresas();
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

  marcas: any = [];
  empresas: any = [];

  marcaid: number = 0;
  empresaid: number = 0;

  labelmarca: string = "";
  labelempresa: string = "";


  obtenermarcas(){
    this._marcaservice.getMarca().subscribe(data=>{
      this.marcas = data
      console.log(this.marcas);
    })
  }

  obtenerEmpresas(){
    this.empresa.getEmpresas().subscribe(data=>{
      this.empresas = data
      console.log(this.empresas);
    })
  }


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

    if (this.marcaid == 0) {
      bandera = false;
      this.labelmarca = "Se debe ingresar una marca.";
    }else{
      this.labelmarca = "";
    }

    if (this.empresaid == 0) {
      bandera = false;
      this.labelempresa = "Se debe ingresar una empresa.";
    }else{
      this.labelempresa = "";
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


    if(bandera){
      
      console.log(this.marcaid,this.empresaid);
      this.producto.postProduct({
        
        "nombre": this.nombre,
        "fechaingreso": this.fechaFormateada,
        "fechavencimiento": this.fecha,
        "idempresa": this.empresaid,
        "idmarca": this.marcaid,
        "cantidad": this.cantidad,
        "preciollegada": this.prelle,
        "precioaventa": this.preven,
        "barcode": this.codebar,
        "idusuario": this.usuario.getUserActive().idusuario

      }).subscribe();
      this.router.navigate(['/Inventario']);
    }
  }
  
}
