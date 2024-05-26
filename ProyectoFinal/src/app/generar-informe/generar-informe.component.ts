import { Component } from '@angular/core';
import { ProductoService } from '../../../service/producto.service';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { HistorialService } from '../../../service/historial.service';
import { ProdcutosllegadaService } from '../../../service/prodcutosllegada.service';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-generar-informe',
  standalone: true,
  imports: [],
  templateUrl: './generar-informe.component.html',
  styleUrl: './generar-informe.component.css'
})
export class GenerarInformeComponent {
  productozzz : any[] = [];
  productoLLegada:any[] = [];
  stock: any[] = [];
  empleados: any [] = [];
  

  constructor(private productoS:ProductoService,private productLL: ProdcutosllegadaService,private userA:UsuarioService) {    
    
    this.productoS.getProductos().subscribe(data => {
      console.log(data);
      this.productozzz = data
      console.log(this.productozzz);
    })
    this.productLL.getProduct(this.userA.getUserActive().idusuario).subscribe(dataLLeg =>{
      this.productoLLegada = dataLLeg;
      console.log(this.productoLLegada);  
    })       
  }

  async generarInforme() {
    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();

    // Agregar una hoja al libro de trabajo
    const worksheet = workbook.addWorksheet('Informe Ingreso');

    //Establecer Columnas
    worksheet.columns = [
      { header: 'Codigo de Barras', key: 'codebar', width: 18 },
      { header: 'Nombre Producto', key: 'nombreproducto', width: 30 },
      { header: 'Precio', key: 'precio', width: 20 },
      { header: 'Fecha llegada', key: 'fechallegada', width: 30 },
      { header: 'Fecha Vencimiento', key: 'fechavencimiento', width: 30 },
      { header: 'Stock Entrante', key: 'stockE', width: 30 },
      { header: 'Stock Actual', key: 'stockA', width: 30 },
    ];
    // Agregar datos a la hoja
    this.productoLLegada.forEach(rowdata => {
      worksheet.addRow([rowdata.barcode, rowdata.nombre, rowdata.precioaventa,rowdata.fechaingreso,rowdata.fechavencimiento,rowdata.cantidad,10]);
    })
    try {
      const buffer = await workbook.xlsx.writeBuffer();

      // Crear un Blob a partir del buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      //Usar file-saver para descargar el archivo
      saveAs(blob, 'InformeIngre'+'21/05/2024'+'.xlsx')

      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }

  async generarInformeEmpleados() {
    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();
    // Agregar una hoja al libro de trabajo
    const worksheet = workbook.addWorksheet('Informe Ingreso');
    //Establecer Columnas
    worksheet.columns = [
      { header: 'Nombre del Empleado', key: 'nombre_emp', width: 20 },
      { header: 'Cantidad de Ventas', key: 'cant_vent', width: 30 },
      { header: 'Total', key: 'total', width: 16 }
    ];
    // Agregar datos a la hoja
    this.productoLLegada.forEach(rowdata => {
      worksheet.addRow([rowdata.barcode, rowdata.nombre, rowdata.precioaventa]);
    })
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      // Crear un Blob a partir del buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      //Usar file-saver para descargar el archivo
      saveAs(blob, 'InformeIngre'+'21/05/2024'+'.xlsx')
      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }
}
