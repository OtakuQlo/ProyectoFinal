import { Component } from '@angular/core';
import { ReportesService } from '../../../service/reportes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-reportes',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './historial-reportes.component.html',
  styleUrl: './historial-reportes.component.css'
})
export class HistorialReportesComponent {
  // variables
  modalText:string = ""
  modalRes:string=""
  
  reportes :any[]=[]
  reportesC:any[]=[]
  reporteID:any

  totalPages: number = 0;
  displacement: number = 0;
  actualPage: number = 1;

  selectedEstado:number = 3;
  search : string =""
    constructor(private _servieceReportes: ReportesService){}
    ngOnInit() {
      this._servieceReportes.getReportes().subscribe(data=>{
        this.reportes = data;
        this.reportesC = data;
        this.totalPages = this.totalPage();
        console.log(data);
      });
    }

    // mostrar informacion en el modal
    modalReportes(idReportes:any){
      this._servieceReportes.getReportesID(idReportes).subscribe(data=>{
        this.modalText=data.descripcion;
        this.reporteID = idReportes;
      });
    }
    

    enviarRespuesta(){
      this. _servieceReportes.enviarRespuesta(this.reporteID,{ respuesta: this.modalRes}).subscribe();
    }

    filtroEstado(){
      if(this.selectedEstado == 3){
        this.reportes = this.reportesC;
      }
      if(this.selectedEstado ==1){
        this.reportes= this.reportesC.filter((reporte) => {
          return reporte.solucion == true;
        });
      }
      if(this.selectedEstado ==2){
        this.reportes= this.reportesC.filter((reporte) => {
          return reporte.solucion == false;
        });
      }
      
    }
    filterSearch(){
      this.reportes= this.reportesC.filter((reporte) => {
        return reporte.Usuario.email.includes(this.search);
      });
    }
    cleanFilter(){
      this.reportes = this.reportesC;
    }
    totalPage() {
  
      return Math.ceil(this.reportes.length / 10);
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
}

