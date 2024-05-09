import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PerfilusuarioService } from '../../service/perfilusuario.service';
import { interval, switchMap } from 'rxjs';

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

  ngOnInit() {
    // Crea un Observable que emite un valor cada segundo utilizando interval()
    interval(5000) // Intervalo de 10 segundos
      .pipe(
        switchMap(() => {
          // Lee el valor del localStorage cada vez que se emite un valor en el intervalo
          const perfilA = parseInt(localStorage.getItem('pActivo'));
          // Verifica si el valor es válido antes de realizar la consulta
          if (!isNaN(perfilA)) {
            return this.perfilS.getPerfiles(perfilA);
          } else {
            // Si el valor no es válido, retorna un observable vacío
            return EMPTY;
          }
        })
      )
      .subscribe((perfiles) => {
        this.perfiles = perfiles;
      });
  }

  inactivateUser(){
    this.perfilS.setInactiveProfile(parseInt(this.userA.id), {estado : false}).subscribe();
    localStorage.removeItem('pActivo')
    this.route.navigate(['/Perfiles'])
    console.log(localStorage.getItem('pActivo'));
  }
}
