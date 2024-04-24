import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(public router: Router){

  }

  ngOnInit(): void {
      
  }

  emptyReport(){
    if (this.reporte.length < 10){
      this.labelReporte = 'Por favor escriba algo en el reporte';
    }else{
      this.router.navigate(['/Home']);
    }

  }
}
