import { Component } from '@angular/core';
import { ProductoService } from '../../../service/producto.service';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-generar-informe',
  standalone: true,
  imports: [],
  templateUrl: './generar-informe.component.html',
  styleUrl: './generar-informe.component.css'
})
export class GenerarInformeComponent {
  productozzz : any[] = []
  constructor(private productoS:ProductoService) {    
    
    this.productoS.getProductos().subscribe(data => {
      console.log(data);
      
      this.productozzz = data
      console.log(this.productozzz);
    })
    
    this.productozzz
  }

  async generarInforme() {
    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();

    // Agregar una hoja al libro de trabajo
    const worksheet = workbook.addWorksheet('Sheet1');

    //Establecer Columnas
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Occupation', key: 'occupation', width: 20 }
    ];

    // Agregar datos a la hoja
    this.productozzz.forEach(rowdata => {
      worksheet.addRow([rowdata.idproducto, rowdata.nombreproducto, rowdata.precio]);
    })
    

    try {
      const buffer = await workbook.xlsx.writeBuffer();

      // Crear un Blob a partir del buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      //Usar file-saver para descargar el archivo
      saveAs(blob, 'output.xlsx')

      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }
}
