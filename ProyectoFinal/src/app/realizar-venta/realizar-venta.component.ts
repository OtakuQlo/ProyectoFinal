import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../../service/venta.service';
import { ToastService } from '../../../service/toast.service';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';
import { ProductoService } from '../../../service/producto.service';
import { CommonModule, formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizar-venta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './realizar-venta.component.html',
  styleUrl: './realizar-venta.component.css'
})
export class RealizarVentaComponent {

  constructor( private venta: VentaService, private alert: ToastService, private perfil: PerfilusuarioService, private productoS: ProductoService, private route:Router) {
    this.alert.showSuccess('', 'Bienvenido ' + this.perfilV.nombre)
  }

  ngOnInit(): void {
    this.boletaVenta()
  }

  //Insert
  detalle: any[] = [];
  producto: any;
  boleta: any;
  total: any = 0;
  date = formatDate(new Date(), 'dd-MM-yyyy', 'en')

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
      this.labelcantidad = "Escoge la cantidad a agregar con un maximo de 50"
    } else {
      this.labelcantidad = "";
    }
    if (!bandera) {
      this.alert.errorSuccess('', 'Asegurate de rellenar bien los campos')
    } else {
      this.agregarProducto()
    }
  }

  async pagarVenta() {
    if(this.total > 0){
      let boletin = this.boleta[0]
      boletin.preciototal = this.total
      console.log(boletin.preciototal);
      await this.venta.actualizarBoleta(boletin.idboleta, {"preciototal" : boletin.preciototal}).subscribe()
      this.cancelarPago()
      window.location.reload()
    }
  }

  agregarProducto() {
    this.productoS.getProductoVenta(this.codebar).then(res => {
      this.producto = res
      if (this.producto && this.producto.precio !== undefined) {
        this.total = this.total + (this.producto.precio * this.cantidad);
        let curr = this.detalle.find(p => p.idproducto.idproducto === this.producto.idproducto)
        let index = this.detalle.findIndex(obj => obj.idproducto.idproducto === this.producto.idproducto)
        
        if (curr != undefined) {
          let detallin : any [] = []
          this.venta.getDetalle(this.boleta[0].idboleta).subscribe(res => {
            detallin = res
            this.detalle[index].iddetalle = detallin.find(det => det.idproducto === this.producto.idproducto).iddetalle
            this.detalle[index].cantidad = this.detalle[index].cantidad + this.cantidad
            console.log(this.detalle[index].iddetalle);
            console.log(this.detalle[index].cantidad);
            this.venta.actualizarDetalle(this.detalle[index].iddetalle, {"cantidad" : this.detalle[index].cantidad}).subscribe()
            this.cancelarVenta()
            this.alert.showSuccess('', 'Detalle Actualizado');
          })
        } 
        if(curr == undefined) {
          this.boletaVenta().then(()=>{        
            this.venta.realizarCompra({
              "iddetalle": '',
              "idboleta": this.boleta[0].idboleta,
              "idproducto": this.producto.idproducto,
              "cantidad": this.cantidad
            }).subscribe()
            this.detalle.push({
              iddetalle: '',
              idboleta: this.boleta[0].idboleta,
              idproducto: this.producto,
              cantidad: this.cantidad
            })
            this.alert.showSuccess('', 'Producto Agregado');
            this.cancelarVenta()
          })
        }
      } else {
        this.alert.errorSuccess('', 'Producto no encontrado');
      }
    })
  }

  borrarDetalles(){

  }

  cancelarPago() {
    this.producto = []
    this.detalle = []
    this.total = 0
  }

  async boletaVenta() {
    await this.venta.getboleta(this.perfilV.id).then(boleta =>{
      this.boleta = boleta
      if (this.boleta.length === 0){
        let datebol = formatDate(new Date(), 'yyyy-MM-dd', 'en')
        this.venta.crearBoleta({
          "idboleta": '',
          "fecha": datebol,
          "preciototal": this.total,
          "estado": false,
          "idperfil": this.perfilV.id
        }).subscribe()
      }
    })
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
