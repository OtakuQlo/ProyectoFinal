import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportesService } from '../../../service/reportes.service';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-reporte-problema',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reporte-problema.component.html',
  styleUrl: './reporte-problema.component.css'
})


export class ReporteProblemaComponent {

  reporte: string= '';
  labelReporte: string= '';
  

  constructor(public router: Router, private reportar:ReportesService, private userS:UsuarioService){
  }

  ngOnInit(): void {
      
  }

  emptyReport(){
   
    if (this.reporte.length <= 10){
      this.labelReporte = 'Por favor escriba algo en el reporte';
    }else{
      this.crearReporte();
      this.router.navigate(['/Inventario']);
    }
  }

  crearReporte(){
    let user : any = this.userS.getUserActive();
    console.log(user.idusuario);
    
    this.reportar.crearReporte({
      idreporte: '',
      idusuario : user.idusuario,
      descripcion : this.reporte,
      respuesta : '',
      solucion : false
    }).subscribe((response) => {
      console.log('Si',response);
    },
    (error) => {
      console.log('No', error);
    });
    console.log('Si')
  }
}
