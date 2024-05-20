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
  imports: [FormsModule, CommonModule],
  templateUrl: './realizar-venta.component.html',
  styleUrl: './realizar-venta.component.css'
})
export class RealizarVentaComponent {

  constructor(private venta: VentaService, private alert: ToastService, private perfil: PerfilusuarioService, private productoS: ProductoService) {
    this.alert.showSuccess('', 'Bienvenido ' + this.perfilV.nombre)
    
    /* console.log(localStorage.getItem('pActivo')); */

  }

  ngOnInit(): void {
    this.boletaVenta()
  }

  //Insert
  detalle: any[] = [];
  producto: any;
  boleta: any;
  total: any = 0;


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
      
    }

  }

  async pagarVenta() {     
    let boletin = this.boleta[0]
    boletin.preciototal = this.total
    console.log(boletin.preciototal);

    await this.venta.actualizarBoleta(boletin.idboleta, {"preciototal" : boletin.preciototal}).subscribe()
    
    
  }

  agregarProducto() {
    this.productoS.getProductoVenta(this.codebar).then(res => {
      this.producto = res
      if (this.producto && this.producto.precio !== undefined) {
        this.total = this.total + (this.producto.precio * this.cantidad);
        let curr = this.detalle.find(p => p.idproducto.idproducto === this.producto.idproducto)
        
        let index = this.detalle.findIndex(obj => obj.idproducto.idproducto === this.producto.idproducto)
        
        if (curr != undefined) {
          this.detalle[index].cantidad= this.detalle[index].cantidad + this.cantidad
          this.venta.actualizarDetalle(this.detalle[index].iddetalle, {cantidad : this.detalle[index].cantidad}).subscribe()
          this.cancelarVenta()
          this.alert.showSuccess('', 'Detalle Actualizado');
        } 
        if(curr == undefined) {
          this.venta.getboleta(this.perfilV.id).then(()=> {
            console.log(this.boleta[0].idboleta);          
            this.detalle.push({
              iddetalle: '',
              idboleta: this.boleta[0].idboleta,
              idproducto: this.producto,
              cantidad: this.cantidad
            })
            this.venta.realizarCompra({
              "iddetalle": '',
              "idboleta": this.boleta[0].idboleta,
              "idproducto": this.producto.idproducto,
              "cantidad": this.cantidad
            }).subscribe()
            this.alert.showSuccess('', 'Producto Agregado');
            this.cancelarVenta()
          })
          
        }
      } else {
        this.alert.errorSuccess('', 'Producto no encontrado');
      }
    })
  }

  borrarDetalle(){

  }

  cancelarPago() {
    this.boleta = []
    this.producto = []
    this.detalle = []
    this.total = 0
  }


  async boletaVenta() {
    await this.venta.getboleta(this.perfilV.id).then(boleta =>{
      this.boleta = boleta
      if (this.boleta.length === 0){
        let date = formatDate(new Date(), 'yyyy-MM-dd', 'en')
        this.venta.crearBoleta({
          "idboleta": '',
          "fecha": date,
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
