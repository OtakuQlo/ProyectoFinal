import { Component } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../service/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  constructor(private route: Router, private _sericeUsuario: UsuarioService, private _serviceToast: ToastService) { }
  private usuario: any;
  validPass: boolean = false;
  validPass1: boolean = false;
  validPassActual: boolean = false;
  ngOnInit(): void {
    this.usuario = this._sericeUsuario.getUserActive();
    this.PerfilForm.controls['correo'].setValue(this.usuario.email)
    this.PerfilForm.controls['nombre'].setValue(this.usuario.nombre)
    this.PerfilForm.controls['apellido'].setValue(this.usuario.apellido)

  }
  PerfilForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3),]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3),]),
  });
  PassForm = new FormGroup({
    pass: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?^&])[A-Za-z\d@$!#%^?&]{8,50}$/
    ),]),
    pass1: new FormControl('', [Validators.required, Validators.minLength(8),]),
    passAnterior: new FormControl('', [Validators.required]),

  });
  actualizarDatos() {
    let usuarioAct = this.PerfilForm.value
    if (this.PerfilForm.status == "VALID") {
      this._sericeUsuario.getUserEmail(usuarioAct.correo).subscribe({
        next: (data) => {
          if (data.email == usuarioAct.correo) {
            this._sericeUsuario.actualizarUsuario(this.usuario.idusuario, {
              correo: usuarioAct.correo
              , nombre: usuarioAct.nombre, apellido: usuarioAct.apellido
            }).subscribe({
              next: (data) => {
                console.log(data);
                this._sericeUsuario.setUserActive(data.email);
                this._serviceToast.showSuccess("Actualizacion", "Datos cambiado")
              }
            })
          } else {
            this._serviceToast.errorSuccess("Error", "correo ya en uso")
          }
        },
        error: (err) => {
          console.log(err);
          console.log(this.usuario.idusuario);

          this._sericeUsuario.actualizarUsuario(this.usuario.idusuario, {
            correo: usuarioAct.correo
            , nombre: usuarioAct.nombre, apellido: usuarioAct.apellido
          }).subscribe({
            next: (data) => {
              console.log(data);
              this._sericeUsuario.setUserActive(data.email);
              this._serviceToast.showSuccess("Actualizacion", "Datos cambiado")
            }
          })
        },
      })
    } else {
      this._serviceToast.errorSuccess("Error", "")
    }

  }

  actualizarPass() {
    let userPass: any = this.PassForm.value;
    let pass: string = this._sericeUsuario.encryptContra(userPass.pass)
    this.validPass = false;
    this.validPass1 = false;
    this.validPassActual = false;
    if (userPass.passAnterior != this._sericeUsuario.desencryptContra(this.usuario.contra)) {
      this.validPassActual = true;
    }
    if (this.PassForm.get('pass')?.status == 'INVALID') {
      this.validPass = true;
    }
    if (userPass.pass != userPass.pass1) {
      this.validPass1 = true;
    }
    if (!this.validPass && !this.validPass1 && !this.validPassActual) {
      this.putContra(pass)
    }
  }
  putContra(pass: any) {
    console.log(this._sericeUsuario.desencryptContra(pass));

    this._sericeUsuario.actualizarContra(this.usuario.idusuario, { contra: pass, estado: 3 }).subscribe({
      next: (data) => {
        console.log(data);
        this._sericeUsuario.setUserActive(data.email).then(data => {
          window.location.href = "http://localhost:4200/Perfil"
          this.route.navigate(['./Perfil']);
        });

        this._serviceToast.showSuccess("Exito", "Constraseña actualizada")
      },
      error: (err) => {
        this._serviceToast.errorSuccess("Informacion no valido", "ERROR")
        console.log(err);

      },
    })
  }
  eliminarCuenta(){
    console.log("Elminar Cuenta");
    this._sericeUsuario.habilitarUsuario(this.usuario.idusuario,{habilitado:0}).subscribe({
      next:(data)=>{
        window.location.href = "http://localhost:4200/Home"
        this.route.navigate(['./Home']);
      }
    })
    
  }
}
