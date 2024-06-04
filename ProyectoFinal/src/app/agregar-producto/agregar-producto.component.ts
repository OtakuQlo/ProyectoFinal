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
import { ToastService } from '../../../service/toast.service';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../service/producto.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [
    FormsModule, CommonModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
  constructor(
    private router: Router,
    private _marcaservice: MarcaService,
    private empresa: EmpresaService,
    private producto: ProdcutosllegadaService,
    private usuario: UsuarioService,
    private toastS: ToastService,
    private route: ActivatedRoute,
    private prod: ProductoService
  ) {


  }
  ngOnInit(): void {
    this.obtenermarcas();
    this.obtenerEmpresas();
    this.id = '';
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.isEditMode = this.id !== null && this.id !== undefined;

      if (this.isEditMode) {
        // Lógica para el modo de edición

        this.edit = true;

        this.prod.getProductoId(this.id).subscribe(data => {
          this.productoedit = data;

          this.nombre = this.productoedit.nombreproducto;
          this.codebar = this.productoedit.barcode;
          this.marcaid = this.productoedit.idmarca;
          this.preven = this.productoedit.precio;
        });



        // Aquí puedes cargar los datos del producto para editar
      }
    });
  }

  productoedit: any;
  edit = false;
  id: String = '';
  isEditMode: boolean = false;
  nombre: String = '';
  fecha: any;
  cantidad: any;
  prelle: any;
  preven: any;
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
  postmarca: string = '';
  postempresa: string = '';

  labelmarca: string = "";
  labelempresa: string = "";


  obtenermarcas() {
    this._marcaservice.getMarca().subscribe(data => {
      this.marcas = data

    })
  }

  obtenerEmpresas() {
    this.empresa.getEmpresas().subscribe(data => {
      this.empresas = data

    })
  }



  agregarMarca() {


    let bandera = true;

    this._marcaservice.getMarca().subscribe(data => {
      let info: any;
      info = data;

      for (let i = 0; i < info.length; i++) {

        if (this.postmarca.toUpperCase() === info[i].nombremarca.toUpperCase()) {
          bandera = false;
          break;
        }
      }

      if (bandera === true) {
        this._marcaservice.postMarca({
          "nombremarca": this.postmarca
        }).subscribe(() => {
          this.obtenermarcas();
        });
      }
    });

  }


  agregarEmpresa() {
    let bandera = true;

    this.empresa.getEmpresas().subscribe(data => {
      let info: any;
      info = data;

      for (let i = 0; i < info.length; i++) {
        if (this.postempresa.toUpperCase() === info[i].nombreempresa.toUpperCase()) {
          bandera = false;
          break;
        }
      }
      if (bandera === true) {
        this.empresa.postEmpresas({
          "nombreempresa": this.postempresa
        }).subscribe(() => {
          this.obtenerEmpresas();
        });
      }
    })
  }





  agregarProducto() {
    let bandera = true;//bandera que permite guardar un articulo, en caso de ser true es porque las validaciones son correctas y se añade el producto

    

    // validacion que nombre del producto no este vacio

    if (this.nombre.length <= 0 || this.nombre.length > 50) {
      bandera = false;
      this.labelnombre = "El nombre del producto no debe estar vacio y no debe sobre pasar los 50 caracteres";
    } else {
      this.labelnombre = ""
    }

    if (this.marcaid == 0) {
      bandera = false;
      this.labelmarca = "Se debe ingresar una marca.";
    } else {
      this.labelmarca = "";
    }

    if (this.empresaid == 0) {
      bandera = false;
      this.labelempresa = "Se debe ingresar una empresa.";
    } else {
      this.labelempresa = "";
    }

    if (!this.regexcode.test(this.codebar)) {
      bandera = false;
      this.labelcodebar = "Solo se pueden ingresar numeros y letras en el codigo de barras"
    } else {
      this.labelcodebar = " ";
    }

    if (!this.regexnumeros.test(this.cantidad.toString()) || this.cantidad <= 0 || this.cantidad > 999) {
      bandera = false;
      this.labelcantidad = "Solo se acepta numeros y mayor de 0 hasta 999"
    } else {
      this.labelcantidad = " ";
    }

    if (!this.regexnumeros.test(this.preven.toString()) || this.preven <= 0 || this.preven > 100000) {
      bandera = false;
      this.labelpreven = "Solo se acepta numeros y mayor de 0 hasta 100000"
    } else {
      this.labelpreven = " ";
    }

    if (!this.regexnumeros.test(this.prelle.toString()) || this.prelle <= 0 || this.prelle > 100000) {
      bandera = false;
      this.labelprelle = "Solo se acepta numeros y mayor de 0 hasta 100000"
    } else {
      this.labelprelle = " ";
    }


    if (bandera) {

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
      this.toastS.showSuccess('Su producto ha sido agregado con exito', 'Producto añadido');
    }
  }


  editarProducto() {

    let bandera = true;

    if (this.nombre.length <= 0) {
      bandera = false;
      this.labelnombre = "El nombre del producto no debe estar vacio";
    } else {
      this.labelnombre = ""
    }

    if (!this.regexcode.test(this.codebar)) {
      bandera = false;
      this.labelcodebar = "Solo se pueden ingresar numeros y letras en el codigo de barras"
    } else {
      this.labelcodebar = " ";
    }

    if (!this.regexnumeros.test(this.preven.toString()) || this.preven <= 0 || this.preven > 100000) {
      bandera = false;
      this.labelpreven = "Solo se acepta numeros y mayor de 0 hasta 100000"
    } else {
      this.labelpreven = " ";
    }

    if (this.marcaid == 0) {
      bandera = false;
      this.labelmarca = "Se debe ingresar una marca.";
    } else {
      this.labelmarca = "";
    }


    if (bandera) {



      this.prod.editProduct(this.id, { nombreproducto: this.nombre, idmarca: this.marcaid, precio: this.preven, barcode: this.codebar }).subscribe();

      this.router.navigate(['/Inventario']);
      this.toastS.showSuccess('Su producto ha sido editado con exito.', 'Producto editado');
    }

  }



}
