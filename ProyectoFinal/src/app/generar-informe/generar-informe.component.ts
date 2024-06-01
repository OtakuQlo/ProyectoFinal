import { Component } from '@angular/core';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { UsuarioService } from '../../../service/usuario.service';
import { InformesService } from '../../../service/informes.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-generar-informe',
  standalone: true,
  imports: [],
  templateUrl: './generar-informe.component.html',
  styleUrl: './generar-informe.component.css'
})
export class GenerarInformeComponent {

  informeEMP: any;
  informeVentas: any;
  informeProductoP: any;

  date = formatDate(new Date(), 'dd-MM-yyyy', 'en')

  constructor(private userA:UsuarioService,
    private informes:InformesService) {  
    this.informes.informeVentasEmp(this.userA.getUserActive().idusuario).subscribe(data =>{
      this.informeEMP = data
      console.log(this.informeEMP);
    })  

    this.informes.informeInventario(this.userA.getUserActive().idusuario).subscribe(data =>{
      this.informeVentas = data
      console.log(this.informeVentas);
    })

    this.informes.informeProductoP(this.userA.getUserActive().idusuario).subscribe(data =>{
      this.informeProductoP = data
      console.log(this.informeProductoP);
      
    })
  }

  async generarInformeVentasEMP() {
    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();

    // Agregar una hoja al libro de trabajo
    const worksheet = workbook.addWorksheet('Informe Ventas de Empleados');

    //Establecer Columnas
    worksheet.columns = [
      { header: 'Nombre del Empleado', key: 'nombre_empleado', width: 18 },
      { header: 'Cantidad de Ventas Realizadas', key: 'cantidad_boletas', width: 30 },
      { header: 'Total Vendido', key: 'precio', width: 20 }
    ];
    // Agregar datos a la hoja
    this.informeEMP.forEach((rowdata : any) =>{
      worksheet.addRow([rowdata.nombre_empleado, rowdata.cantidad_boletas, parseInt(rowdata.total)])
    } )
    try {
      const buffer = await workbook.xlsx.writeBuffer();

      // Crear un Blob a partir del buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      //Usar file-saver para descargar el archivo
      saveAs(blob, 'InformeIngre'+this.date+'.xlsx')

      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }

  async generarInformeInventario() {
    
    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();

    // Agregar una hoja al libro de trabajo
    const worksheet = workbook.addWorksheet('Informe Ventas de Empleados');

    //Establecer Columnas
    worksheet.columns = [
      { header: 'Nombre del Producto', key: 'nombre_pro', width: 20 },
      { header: 'Valor en el inventario', key: 'v_inventario', width: 25 },
      { header: 'Restante en el Inventario', key: 'r_inventario', width: 20 }
    ];
    // Agregar datos a la hoja
    this.informeVentas.forEach((rowdata : any) =>{
      worksheet.addRow([rowdata.nombreproducto, parseInt(rowdata.valor_inventario), parseInt(rowdata.restante)])
    } )
    try {
      const buffer = await workbook.xlsx.writeBuffer();

      // Crear un Blob a partir del buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      //Usar file-saver para descargar el archivo
      saveAs(blob, 'InformeIngre'+this.date+'.xlsx')

      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }

  async informeProductoPop(){
    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();

    // Agregar una hoja al libro de trabajo
    const worksheet = workbook.addWorksheet('Informe Ventas de Empleados');

    //Establecer Columnas
    worksheet.columns = [
      { header: 'Nombre del Producto', key: 'nombre_prod', width: 20 },
      { header: 'Marca del Producto', key: 'marca', width: 25 },
      { header: 'Cantidad de Ventas', key: 'c_total', width: 20 },
      { header: 'Valor total de las Ventas', key: 'v_total', width: 20 }
    ];
    // Agregar datos a la hoja
    this.informeProductoP.forEach((rowdata : any) =>{
      worksheet.addRow([rowdata.nombreproducto, rowdata.marca, parseInt(rowdata.c_total), parseInt(rowdata.v_total)])
    } )
    try {
      const buffer = await workbook.xlsx.writeBuffer();

      // Crear un Blob a partir del buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      //Usar file-saver para descargar el archivo
      saveAs(blob, 'InformeIngre'+this.date+'.xlsx')

      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }
}
