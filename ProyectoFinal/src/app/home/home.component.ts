import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  validSesion: boolean = false;

  constructor(private _serviceUsuario: UsuarioService, private route: Router) { 
    this._serviceUsuario.deletUserActive();
    console.log(localStorage.getItem('usuario'));
    console.log(this._serviceUsuario.encryptContra('123'));
    
  }

  registroForm = new FormGroup({
    correo: new FormControl('dadas@gmail.com', [Validators.required]),
    pass: new FormControl('7SOB4SLdi7i27sKO@', [Validators.required]),

  });

  ngOnInit(): void { }
  inicioSesion() {
    let userInfo = this.registroForm.value;
    if (this.registroForm.status == 'VALID') {
      this._serviceUsuario.getUserEmail(userInfo.correo).subscribe((data) => {

        if (this._serviceUsuario.desencryptContra(data.contra) == userInfo.pass) {
          this._serviceUsuario.setUserActive(data);
          console.log(this._serviceUsuario.getUserActive());

          setTimeout(async () => {
            this.route.navigate(['./Perfiles']);
          }, 300);
        }
        else {
          //  Alerta de error
          this.validSesion = true;
          setTimeout(async () => {
            this.validSesion = false;
          }, 3000);
        }
      });
    }
  }
  irCrearCuenta() {
    this.route.navigate(['./Registro']);
  }
}
