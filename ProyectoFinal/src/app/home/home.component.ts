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
  constructor(private _serviceUsuario: UsuarioService, private route:Router) {}
  registroForm = new FormGroup({
    correo: new FormControl('dadas@gmail.com', [Validators.required]),
    pass: new FormControl('7SOB4SLdi7i27KO@', [Validators.required]),
  });

  ngOnInit(): void {}
  inicioSesion() {
    console.log(this.registroForm.status);
    let userInfo = this.registroForm.value;
    let modal= document.getElementById('recuperarCuentaModal');
    let myInput = document.getElementById('omg');
    if (this.registroForm.status == 'VALID') {
      this._serviceUsuario.getUserEmail(userInfo.correo).subscribe((data) => {
        console.log(data);
        if ((data.contra = this._serviceUsuario.encryptContra(userInfo.pass))) {
          this._serviceUsuario.setUserActive(data);
          console.log(this._serviceUsuario.getUserActive());
          setTimeout(async () => {
          this.route.navigate(['./Perfiles']);
        }, 300);
        }
      });
    }
  }
  irCrearCuenta(){
    this.route.navigate(['./Registro']);
  }
}
