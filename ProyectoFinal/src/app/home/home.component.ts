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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private _serviceUsuario: UsuarioService) {}
  registroForm = new FormGroup({
    correo: new FormControl('asdas', [Validators.required]),
    pass: new FormControl('123', [Validators.required]),
  });

  ngOnInit(): void {}
  inicioSesion() {
    console.log(this.registroForm.status);
    let userInfo = this.registroForm.value;
    if (this.registroForm.status == 'VALID') {
      this._serviceUsuario.getUserEmail(userInfo.correo).subscribe((data) => {
        console.log(data);
        if ((data.contra = this._serviceUsuario.encryptContra(userInfo.pass))) {
          this._serviceUsuario.setUserActive(data);
          console.log(this._serviceUsuario.getUserActive());
        }
      });
    }
  }
}
