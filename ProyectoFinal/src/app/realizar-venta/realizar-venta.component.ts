import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../../service/venta.service';
import { ToastService } from '../../../service/toast.service';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';
import { ProductoService } from '../../../service/producto.service';
import { CommonModule, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { OldstocksService } from '../../../service/oldstocks.service';
import { MailService } from '../../../service/mail.service';

@Component({
  selector: 'app-realizar-venta',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './realizar-venta.component.html',
  styleUrl: './realizar-venta.component.css'
})
export class RealizarVentaComponent {

  constructor(private venta: VentaService, private alert: ToastService, private perfil: PerfilusuarioService, private productoS: ProductoService, private oldstock: OldstocksService, private correo: MailService) {

  }

  ngOnInit(): void {
    this.alert.showSuccess('', 'Bienvenido ' + this.perfilV.nombre)
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
  cantidad: number = 0;
  CA: any;

  //Perfil
  perfilV: any = this.perfil.getPerfilActivo()

  //regex
  regexcode: RegExp = /^[a-zA-Z0-9]+$/;
  regexnumeros: RegExp = /^\d+$/;

  //label
  labelcodebar: string = '';
  labelcantidad: string = '';


  stockproducto: any;
  oldstockproducto: any;

  valVenta() {
    let bandera = true;
    if (!this.regexcode.test(this.codebar)) {
      bandera = false;
      this.labelcodebar = "Solo se pueden ingresar numeros y letras en el codigo de barras"
    } else {
      this.labelcodebar = "";
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
    if (this.total > 0) {
      let boletin = this.boleta[0]
      boletin.preciototal = this.total
      await this.venta.actualizarBoleta(boletin.idboleta, { "preciototal": boletin.preciototal }).subscribe()
      for (let index = 0; index < this.detalle.length; index++) {
        const element = this.detalle[index];
        this.venta.realizarCompra({
          "iddetalle": '',
          "idboleta": element.idboleta,
          "idproducto": element.idproducto.idproducto,
          "cantidad": element.cantidad
        }).subscribe({
          next: (data) => {
            let producto: any;

            producto = data;
            this.oldstock.getStock(producto.idproducto).subscribe((data) => {
              this.stockproducto = data;


              this.oldstock.getOldStock(this.stockproducto.idstock).subscribe((data) => {
                this.oldstockproducto = data;


                if (this.oldstockproducto.estado == 0 && this.oldstockproducto.porcentaje <= 30) {
                  let nombreproducto: any;
                  this.productoS.getProductoId(producto.idproducto).subscribe((data) => {
                    nombreproducto = data.nombreproducto;

                    this.correo.correoStock({ producto: nombreproducto }).subscribe();
                    this.oldstock.actualizarEstado(this.oldstockproducto.id, this.stockproducto).subscribe();
                  })
                }
              })
            })




          }
        })
      }

      this.cancelarPago()
      window.location.reload()
    }
  }

  agregarProducto() {
    this.productoS.getProductoVenta(this.codebar, { idusuario: this.perfilV.idusuario }).subscribe(res => {
      this.producto = res
      if (this.producto[0] && this.producto[0].precio !== undefined) {
        let curr = this.detalle.find(p => p.idproducto.idproducto === this.producto[0].idproducto)
        let index = this.detalle.findIndex(obj => obj.idproducto.idproducto === this.producto[0].idproducto)
        if (curr != undefined) {
          this.CA = (parseInt(this.producto[0].StockProducts[0].cantidadtotal) - this.detalle[index].cantidad)
          if (parseInt(this.producto[0].StockProducts[0].cantidadtotal) > 0 && this.CA >= this.cantidad) {
            this.detalle[index].cantidad = this.detalle[index].cantidad + this.cantidad
            this.venta.actualizarDetalle(this.detalle[index].idboleta, { cantidad: this.detalle[index].cantidad, idproducto: this.detalle[index].idproducto.idproducto })
            this.cancelarVenta()
            this.alert.showSuccess('', 'Detalle Actualizado');
            this.total = this.total + (this.producto[0].precio * this.cantidad)
          } else {
            this.alert.errorSuccess('', 'El Producto tiene un stock actual de: ' + this.CA)
          }
        } else if (curr == undefined) {
          this.CA = parseInt(this.producto[0].StockProducts[0].cantidadtotal)
          if (parseInt(this.producto[0].StockProducts[0].cantidadtotal) > 0 && this.CA >= this.cantidad) {
            this.boletaVenta().then(() => {
              this.detalle.push({
                iddetalle: '',
                idboleta: this.boleta[0].idboleta,
                idproducto: this.producto[0],
                cantidad: this.cantidad
              })
              this.alert.showSuccess('', 'Producto Agregado');
              this.cancelarVenta()
            })
          } else {
            this.alert.errorSuccess('', 'El Producto tiene un stock actual de: ' + this.CA)
          }
        } else {
          this.alert.errorSuccess('', 'Producto no encontrado');
        }
      }
    })
  }

  borrarDetalles(idp: any) {
    let index = this.detalle.findIndex(detallin => detallin.idproducto.idproducto === idp);
    let borrado = this.detalle.find(detallin => detallin.idproducto.idproducto === idp)
    this.detalle.splice(index, 1)
    this.total = this.total - (borrado.idproducto.precio * borrado.cantidad);
  }

  cancelarPago() {
    this.producto = []
    this.detalle = []
    this.total = 0
  }

  async boletaVenta() {
    await this.venta.getboleta(this.perfilV.idusuario, { nombre: this.perfilV.nombre }).then(boleta => {
      this.boleta = boleta
      if (this.boleta.length === 0) {
        let datebol = formatDate(new Date(), 'yyyy-MM-dd', 'en')
        this.venta.crearBoleta({
          "idboleta": '',
          "nombre": this.perfilV.nombre,
          "fecha": datebol,
          "preciototal": this.total,
          "estado": false,
          "idusuario": this.perfilV.idusuario
        }).subscribe()
      }
    })
  }

  cancelarVenta() {
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
