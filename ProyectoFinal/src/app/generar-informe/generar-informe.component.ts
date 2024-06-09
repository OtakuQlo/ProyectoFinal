import { Component, OnInit } from '@angular/core';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { UsuarioService } from '../../../service/usuario.service';
import { InformesService } from '../../../service/informes.service';
import { formatDate } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-generar-informe',
  standalone: true,
  imports: [],
  templateUrl: './generar-informe.component.html',
  styleUrl: './generar-informe.component.css'
})
export class GenerarInformeComponent {
  public grafico: any;

  informeEMP: any;
  informeVentas: any;
  informeProductoP: any;
  informeProductoMenP: any;
  informeMerm: any;

  tituloG: any= 'Valor Estimado del Inventario';

  date = formatDate(new Date(), 'dd-MM-yyyy', 'en')

  constructor(private userA:UsuarioService,
    private informes:InformesService) {  
    Chart.register(...registerables)
  }

  ngOnInit(): void{
    
    this.informes.informeInventario(this.userA.getUserActive().idusuario).subscribe(data =>{
      this.informeVentas = data
    })
    this.informes.informeProductoP(this.userA.getUserActive().idusuario).subscribe(data =>{
      this.informeProductoP = data
    })
    this.informes.informeProductoMP(this.userA.getUserActive().idusuario).subscribe(data =>{
      this.informeProductoMenP = data;
    })
    this.informes.informeMermas(this.userA.getUserActive().idusuario).subscribe(data =>{
      this.informeMerm = data
    })
    this.tipoGrafico(1);
  }

  tipoGrafico(id : any){
    switch (id) {
      case 1:
        this.informes.informeVentasEmp(this.userA.getUserActive().idusuario).subscribe(data =>{
          this.informeEMP = data;
          let labels: any[] = [];
          let datas: any[] = [];
          this.informeEMP.forEach((element : any) => {
            labels.push(element.nombre_empleado);
            datas.push(element.total)
          });
          console.log(datas);
          
          const colors = [
            'rgb(255, 0, 0)',   // Rojo
            'rgb(0, 128, 0)',   // Verde
            'rgb(0, 0, 255)',   // Azul
            'rgb(255, 255, 0)', // Amarillo
            'rgb(0, 255, 255)', // Cian
            'rgb(255, 0, 255)', // Magenta
            'rgb(255, 165, 0)', // Naranja
            'rgb(255, 192, 203)', // Rosa
            'rgb(128, 0, 128)', // Púrpura
            'rgb(165, 42, 42)', // Marrón
            'rgb(0, 255, 0)',   // Lima
            'rgb(0, 0, 128)',   // Azul Marino
            'rgb(128, 128, 0)', // Oliva
            'rgb(128, 128, 128)', // Gris
            'rgb(192, 192, 192)', // Plata
            'rgb(255, 215, 0)', // Oro
            'rgb(255, 127, 80)', // Coral
            'rgb(64, 224, 208)', // Turquesa
            'rgb(238, 130, 238)', // Violeta
            'rgb(135, 206, 250)'  // Celeste
          ];
          this.grafico = new Chart("grafico", {
          type: 'bar', // Tipo de gráfico
          data: {
            // Datos que van en X
            labels: labels,
            datasets: [
              {
                //Datos que van en Y 
                data: datas,
                borderColor: colors,
                backgroundColor: colors,
                hoverBorderWidth: 1
              }
              ]
              },
              options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                },
                
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.raw;
                                return label;
                            }
                        }
                    },
                    legend: {
                      display: false
                    }
                }
              }
            });
        }); 
        
        break;
      default:
        break;
    }

    
  

  }

  async generarInformeVentasEMP() {
    this.tituloG = 'Ventas Por Empleado Totales';
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
      saveAs(blob, 'Informe_Ventas_EMP'+this.date+'.xlsx')

      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }

  async generarInformeInventario() {
    this.tituloG = 'Valor Estimado Del Inventario';
    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();

    // Agregar una hoja al libro de trabajo
    const worksheet = workbook.addWorksheet('Informe de Inventario');

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
      saveAs(blob, 'Informe_Inventario_'+this.date+'.xlsx')

      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }

  async informeProductoPop(){
    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();

    // Agregar una hoja al libro de trabajo
    const worksheet = workbook.addWorksheet('Informe Productos Populares');

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
      saveAs(blob, 'Informe_Pro_Popul_'+this.date+'.xlsx')

      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }

  async informeProductoMP(){
    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();

    // Agregar una hoja al libro de trabajo
    const worksheet = workbook.addWorksheet('Informe Productos Menos Populares');

    //Establecer Columnas
    worksheet.columns = [
      { header: 'Nombre del Producto', key: 'nombre_prod', width: 20 },
      { header: 'Cantidad de Ventas', key: 'c_ventas', width: 20 },
    ];
    // Agregar datos a la hoja
    this.informeProductoMenP.forEach((rowdata : any) =>{
      worksheet.addRow([rowdata.nombreproducto, parseInt(rowdata.total_vendido)])
    } )
    try {
      const buffer = await workbook.xlsx.writeBuffer();

      // Crear un Blob a partir del buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      //Usar file-saver para descargar el archivo
      saveAs(blob, 'Informe_Menos_Pop_'+this.date+'.xlsx')

      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }

  async informeMermas(){
    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();

    // Agregar una hoja al libro de trabajo
    const worksheet = workbook.addWorksheet('Informe de Mermas');

    //Establecer Columnas
    worksheet.columns = [
      { header: 'Nombre del Producto', key: 'nombre_prod', width: 20 },
      { header: 'Codigo de Barras', key: 'barcode', width: 20 },
      { header: 'Precio', key: 'precio', width: 15 },
      { header: 'Cantidad', key: 'cantidad', width: 15 },
      { header: 'Total de perdidas', key: 'total_perdido', width: 20},
      { header: 'Fecha de la merma', key: 'fecha', width: 20 },
      { header: 'Descripción', key: 'descripcion', width: 30 },
    ];
    // Agregar datos a la hoja
    this.informeMerm.forEach((rowdata : any) =>{
      worksheet.addRow([rowdata.nombreproducto, rowdata.barcode, parseInt(rowdata.precio), parseInt(rowdata.cantidad), parseInt(rowdata.total_perdido), rowdata.fecha, rowdata.descripcion])
    } )
    try {
      const buffer = await workbook.xlsx.writeBuffer();

      // Crear un Blob a partir del buffer
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      //Usar file-saver para descargar el archivo
      saveAs(blob, 'Informe_mermas_'+this.date+'.xlsx')

      console.log('Archivo Excel guardado.');
    } catch (error) {
      console.error('Error al guardar el archivo Excel:', error);
    }
  }
}
