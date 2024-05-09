import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PerfilusuarioService } from '../../service/perfilusuario.service';
import { Observable, interval, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoFinal';

  userA: any = this.perfilS.getPerfilActivo() 
  
  constructor(private route:Router, private perfilS:PerfilusuarioService){    
  }

  // Esta función devuelve un observable que emite el valor del LocalStorage cada cierto intervalo de tiempo
  getLocalStorageValuePeriodically( intervalTime: number): Observable<any> {
    return interval(intervalTime).pipe(
      map(() => this.perfilS.getPerfilActivo())
    );
  }
  
  ngOnInit() {
    // Llama a la función del servicio para obtener el valor del LocalStorage cada 5 segundos (por ejemplo)
    this.getLocalStorageValuePeriodically(100).subscribe(value => {
      this.userA = value;
      // Haz lo que necesites con el valor del LocalStorage aquí
    });
  }

  inactivateUser(){
    this.perfilS.setInactiveProfile(parseInt(this.userA.id), {estado : false}).subscribe();
    this.route.navigate(['/Perfiles'])
    localStorage.removeItem('pActivo')
  }
}
