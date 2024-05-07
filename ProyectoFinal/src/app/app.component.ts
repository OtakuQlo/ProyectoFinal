import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PerfilusuarioService } from '../../service/perfilusuario.service';

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

  inactivateUser(){
    this.perfilS.setInactiveProfile(parseInt(this.userA.id), {estado : false}).subscribe();
    localStorage.removeItem('pActivo')
    this.route.navigate(['/Perfiles'])
    console.log(localStorage.getItem('pActivo'));
  }
}
