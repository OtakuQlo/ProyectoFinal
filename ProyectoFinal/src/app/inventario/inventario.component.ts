import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../../service/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerdidasService } from '../../../service/perdidas.service';
import { ToastService } from '../../../service/toast.service';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})

export class InventarioComponent {

  productos: any[] = []
  productosO: any[] = []

  search: string = "";
  totalPages: number = 0;
  displacement: number = 0;
  actualPage: number = 1;


  barcode: string = "";
  desc: string = "";
  cant: number = 0;

  id: number = 0;
  // modal datos
  nombrePrdModal  : string = "";
  nombreMarModal  : string = "";
  barcodeModal    : string = "";
  cantidadPrdModal: number = 0;

  //formato fecha para dar el minimo al input
  fechahoy: Date = new Date();

  dia: String = ("0" + this.fechahoy.getDate()).slice(-2); // Día del mes
  mes: String = ("0" + (this.fechahoy.getMonth() + 1)).slice(-2); // Los meses en JavaScript empiezan en 0
  anio: number = this.fechahoy.getFullYear();
  fechaFormateada: String = `${this.anio}-${this.mes}-${this.dia}`;
  constructor(
    private router: Router,
    private _serviceProduto: ProductoService,
    private _servicePerdidas: PerdidasService,
    private _serviceToast: ToastService,
    private _serviceUsuario:UsuarioService
  ) { }

  ngOnInit(): void {
    this.getProduct();


    this.pageGenerator()
  }

  getProduct() {
    this._serviceProduto.getProductostock(this._serviceUsuario.getUserActive().idusuario).subscribe(data => {
      console.log(data);

      this.productos = data;
      console.log(this.productos);

      this.productosO = data;
      this.totalPages = this.totalPage();
      console.log(this.totalPages);
    });
  }

  cleanFilter() {
    this.productos = this.productosO;
    this.search = "";
    this.actualPage = 1;
    this.pageGenerator()
  }

  filter() {
    this.productos = this.productosO.filter((product) => {
      return product.nombreproducto.includes(this.search.toLocaleLowerCase()) || product.precio == Number(this.search) || product.barcode == this.search
    });
    console.log(this.productos);
    this.totalPages = this.totalPage();
    this.actualPage = 1;
    this.pageGenerator();

  }

  addProduct() {
    this.router.navigate(['/AgregarProducto'])
  }
  editProduct() {
    this.router.navigate(['/AgregarProducto'], { queryParams: { id: this.id } });
  }

  // pagination
  totalPage() {
    console.log(this.productos);

    return Math.ceil(this.productos.length / 10);
  }

  pageGenerator() {
    this.displacement = (this.actualPage - 1) * 10;
  }

  nextPage() {

    if (this.actualPage + 1 <= this.totalPages) {
      this.actualPage = this.actualPage + 1;
      this.pageGenerator();
    }

  }
  previousPage() {
    if (this.actualPage - 1 > 0) {
      this.actualPage = this.actualPage - 1;
      this.pageGenerator();
    }
  }
  postPerdidas() {
    if (this.cant >= 1) {
      if (this.barcode != "") {
        
        this._serviceProduto.getProductoVenta(this.barcode).then(res=>{
          let producto:any;
          producto=res
          if (res) {
            if (producto  !== undefined) {
            
              this._servicePerdidas.postPerdidas(
                { idperdidas: '', idproducto: producto.idproducto, fecha: this.fechaFormateada, descripcion: this.desc, cantidad: this.cant,idusuario: this._serviceUsuario.getUserActive().idusuario},
                this.barcode
              ).then(res => {
                console.log(res);
      
                if (res) {
                  this.barcode = ''
                  this.cant = 0
                  this.desc = ''
                  this._serviceToast.showSuccess("Con exito", "Reporte con exito")
                } else {
                  this._serviceToast.errorSuccess("Error", "Hubo un Error")
                }
              });
      
              
            }else {
              this._serviceToast.errorSuccess("Error", "Hubo un Error")
            }
          }else{
            this._serviceToast.errorSuccess("Error", "Hubo un Error")

          }
         
          
        })
        


      } else {
        this._serviceToast.errorSuccess("Error", "Hubo un Error")
      }
    } else {
      this._serviceToast.errorSuccess("Error", "Hubo un Error")
    }
  }
  modalInventario(productModal: any) {
    this.id = productModal.StockProducts[0].idstock
    this.barcodeModal = productModal.barcode
    this.nombreMarModal = productModal.Marca.nombremarca
    this.nombrePrdModal = productModal.nombreproducto
    this.cantidadPrdModal = productModal.StockProducts[0].cantidadtotal
  }
}
