import { Component } from '@angular/core';
import { ReportesService } from '../../../service/reportes.service';

@Component({
  selector: 'app-historial-reportes',
  standalone: true,
  imports: [],
  templateUrl: './historial-reportes.component.html',
  styleUrl: './historial-reportes.component.css'
})
export class HistorialReportesComponent {
    constructor(private reportes: ReportesService){

    }
    id = 1
    respuesta = "hola test1"

    enviarRespuesta(){
      this.reportes.enviarRespuesta(1,{ respuesta: this.respuesta});
    }
}
