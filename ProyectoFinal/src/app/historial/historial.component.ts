import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../../service/toast.service';
import { HistorialService } from '../../../service/historial.service';
import { VentaService } from '../../../service/venta.service';
import { ProdcutosllegadaService } from '../../../service/prodcutosllegada.service';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
  // variables
  displacement: number = 0;
  actualPage: number = 1;
  totalPages: number = 0;

  opcionHistorial: number = 1;
  opcioNumeroMaximo: number = 0;
  opcioNumeroMinimo: number = 0;
  opcionFecha: any;
  opcionFechaIngreso: any;
  opcionFechaVencimiento: any;
  productoLLegada: any[] = [];
  ventasRealizadas: any[] = [];
  tablaActivo: any[] = [];
  detalleSelected: any[] = [];
  constructor(
    private _serviceToast: ToastService,
    private _serviceUsuario: UsuarioService,
    private _serviceVenta: VentaService,
    private _serviceProcutollegada: ProdcutosllegadaService
  ) { }
  ngOnInit() {
    this.getProductoLLegada();
    this.pageGenerator()
    this.getVentas();
    this.setTabla();
  }

  // funcion de cabiar de tabla
  changeTable() {
    this.setTabla()
    console.log("cabia la tabal" + this.opcionHistorial)
  }
  // funcion para el apartado de numero
  setRangoPrecio() {
    if(this.tablaActivo== this.productoLLegada){
      this.tablaActivo = this.productoLLegada.filter(producto => {
        if (producto.preciollegada <= this.opcioNumeroMaximo) {
          return producto;
        }
      })
    }else{
      this.tablaActivo = this.tablaActivo.filter(producto => {
        if (producto.preciollegada <= this.opcioNumeroMaximo) {
          return producto;
        }
      })
    }

    console.log(this.productoLLegada);

  }
  // funcion para seleccionar la fecha
  setFecha() {
    if (this.opcionHistorial == 2) {
      this.tablaActivo = this.productoLLegada.filter(product => {
        if (this.opcionFechaIngreso && this.opcionFechaVencimiento) {
            
            return product.fechaingreso == this.opcionFechaIngreso && product.fechavencimiento == this.opcionFechaVencimiento;
          

        }
        if (this.opcionFechaIngreso) {
          return product.fechaingreso.includes(this.opcionFechaIngreso);
        }
        if (this.opcionFechaVencimiento) {
          return product.fechavencimiento.includes(this.opcionFechaVencimiento);
        }
      })
    }
    if (this.opcionHistorial == 1) {
      this.tablaActivo = this.ventasRealizadas.filter(venta => {
        return venta.fecha == this.opcionFecha
      })
    }
  }
  cleanFilter() {
    if (this.opcionHistorial == 2) {
      this.opcionFechaIngreso = "";
      this.opcionFechaVencimiento = "";
      this.opcioNumeroMinimo = 0;
      this.opcioNumeroMaximo = 0;
      this.setTabla();
    }
    if (this.opcionHistorial == 1) {
      this.opcionFecha = "";
      this.setTabla();
    }
  }
  // funcion para obtener producto de llegada
  getProductoLLegada() {
    this._serviceProcutollegada.getProduct(this._serviceUsuario.getUserActive().idusuario).subscribe(data => {
      this.productoLLegada = data;
      this.tablaActivo = data;
      this.totalPages = this.totalPage();
    })
  }
  getVentas() {
    this._serviceVenta.getBoletas(this._serviceUsuario.getUserActive().idusuario).subscribe(data => {
      this.ventasRealizadas = data;
      this.tablaActivo = data;
      this.totalPages = this.totalPage();
      console.log(data);
    })
  }
  // funciones en tabla
  setTabla() {
    this.totalPages = 1;
    if (this.opcionHistorial == 2) {
      this.tablaActivo = this.productoLLegada;
      this.totalPages = this.totalPage();
    }
    if (this.opcionHistorial == 1) {
      this.tablaActivo = this.ventasRealizadas;
      this.totalPages = this.totalPage();
    }
  }
  setTablaDetalle(detalle: any) {
    console.log(detalle);

    this.detalleSelected = detalle;
  }
  totalPage() {
    return Math.ceil(this.tablaActivo.length / 10);
  }
  pageGenerator() {
    this.displacement = (this.actualPage - 1) * 10;
  }
  nextPage() {
    console.log(this.actualPage + 1);
    console.log(this.totalPages);

    if (this.actualPage + 1 <= this.totalPages) {
      this.actualPage = this.actualPage + 1;
      console.log(this.actualPage);

      this.pageGenerator();
    }

  }
  previousPage() {
    if (this.actualPage - 1 > 0) {
      this.actualPage = this.actualPage - 1;
      this.pageGenerator();
    }
  }
}
