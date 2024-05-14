import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../../service/venta.service';
import { ToastService } from '../../../service/toast.service';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';
import { ProductoService } from '../../../service/producto.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-realizar-venta',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './realizar-venta.component.html',
  styleUrl: './realizar-venta.component.css'
})
export class RealizarVentaComponent {

  constructor(private venta: VentaService, private alert: ToastService, private perfil: PerfilusuarioService, private productoS: ProductoService) {
    this.alert.showSuccess('', 'Bienvenido ' + this.perfilV.nombre)
    console.log(localStorage.getItem('pActivo'));

  }

  //Insert
  detalle: any = [];
  producto: any;
  boleta: any = [{
    nombre: '',
    fecha: '',
    preciototal: 0,
  }];
  total: number = 0;

  //Producto
  codebar: string = '';
  nombre: String = '';
  cantidad: number = 0;

  //Perfil
  perfilV: any = this.perfil.getPerfilActivo()

  //regex
  regexcode: RegExp = /^[a-zA-Z0-9]+$/;
  regexnumeros: RegExp = /^\d+$/;

  //label
  labelnombre: string = '';
  labelcodebar: string = '';
  labelcantidad: string = '';

  valVenta() {
    let bandera = true;
    if (!this.regexcode.test(this.codebar)) {
      bandera = false;
      this.labelcodebar = "Solo se pueden ingresar numeros y letras en el codigo de barras"
    } else {
      this.labelcodebar = " ";
    }

    if (!this.regexnumeros.test(this.cantidad.toString()) || this.cantidad <= 0 || this.cantidad > 50) {
      bandera = false;
      this.labelcantidad = "Solo se acepta numeros y mayor de 0 hasta 50"
    } else {
      this.labelcantidad = "";
    }

    if (!bandera) {
      this.alert.errorSuccess('', 'Asegurate de rellenar bien los campos')
    } else {
      this.agregarProducto()
      console.log(this.producto);
      console.log(this.total);
      console.log(this.detalle);
    }

  }

  pagarVenta() {
    this.boletaVenta(this.total)
  }

  agregarProducto() {
    this.productoS.getProductoVenta(this.codebar).then(res => {
      this.producto = res
      if (this.producto && this.producto.precio !== undefined) {
        this.total = this.total + (this.producto.precio * this.cantidad);
       /*  if (this.detalle.find(({ p }: any) => p.idproducto.idproducto === this.producto.id)) {
          
          
          
          this.alert.showSuccess('', 'Detalle Actualizado');
        } else {
          
        } */
        this.detalle.push({
          iddetalle: '',
          idboleta: '',
          idproducto: this.producto,
          cantidad: this.cantidad
        })
        this.alert.showSuccess('', 'Producto Agregado');
        console.log('Precio del producto:', this.producto.precio);
        
      } else {
        console.error('No se encontró el precio del producto o es undefined.');
        this.alert.errorSuccess('', 'Producto no encontrado');
      }
    })

  }

  cancelarPago() {
    this.boleta = []
    this.producto = []
    this.detalle = []
    console.log(this.producto);
    console.log(this.boleta);
    console.log(this.detalle);
  }

  detalleVenta() {

  }

  boletaVenta(total: any) {
    let date = formatDate(new Date(), 'dd-MM-yyyy', 'en')
    this.boleta = [{
      nombre: this.perfilV.nombre,
      fecha: date,
      preciototal: total
    }]
  }

  stockProducto() {

  }

  cancelarVenta() {
    this.nombre = '';
    this.labelnombre = '';
    this.cantidad = 0;
    this.labelcantidad = '';
    this.codebar = '';
    this.labelcodebar = '';
  }

  addC() {
    return this.cantidad = this.cantidad + 1
  }

  lessC() {
    if (this.cantidad < 1) {
      return this.cantidad = 0
    }
    return this.cantidad = this.cantidad - 1
  }
}
