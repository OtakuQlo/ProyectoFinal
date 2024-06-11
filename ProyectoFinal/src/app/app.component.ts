import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PerfilusuarioService } from '../../service/perfilusuario.service';
import { Observable, interval, map } from 'rxjs';
import { UsuarioService } from '../../service/usuario.service';
import { PlansService } from '../../service/plans.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoFinal';
  userA: any ; 
  perfilA :any;
  plan:any;
  cantperfiles:any;
  
  constructor(private perfilS:PerfilusuarioService, private userS:UsuarioService, private planS: PlansService){
  }

  // Esta función devuelve un observable que emite el valor del LocalStorage cada cierto intervalo de tiempo
  getLocalStorageValuePeriodically( intervalTime: number): Observable<any> {
    return interval(intervalTime).pipe(
      map(() => this.perfilS.getPerfilActivo())
    );
  }

  ngAfterViewInit(){
    this.planEnUso();
    this.cantidadDePlanes();
    if (this.perfilS.getPerfilActivo()){
      // Llama a la función del servicio para obtener el valor del LocalStorage cada 5 segundos (por ejemplo)
        this.getLocalStorageValuePeriodically(100).subscribe(value => {
        this.perfilA = value;
        // Haz lo que necesites con el valor del LocalStorage aquí
      });
      this.planEnUso();
      this.cantidadDePlanes();
    }
    let a:any = this.userS.getUserActive()
    if (a) {
      this.userA = this.userS.getUserActive()
    }
  }

  planEnUso(){
    if (this.userS.getUserActive()) {
      this.planS.getPlansId(this.userS.getUserActive().idplan).subscribe(data => {
        this.plan = data;
      });
    }
  }

  cantidadDePlanes(){
    if (this.userS.getUserActive()) {
      this.perfilS.cantidadPerfiles(this.userS.getUserActive().idusuario).subscribe(data => {
        this.cantperfiles = data;
      });
    }
    
  }

  inactivateUser(){
    this.perfilS.setInactiveProfile(parseInt(this.perfilA.id), {estado : false}).subscribe();
    localStorage.removeItem('pActivo')
    window.location.href = '/Perfiles'
  }

  cerrarSesion(){
    window.location.href = '/Home'
  }

}
