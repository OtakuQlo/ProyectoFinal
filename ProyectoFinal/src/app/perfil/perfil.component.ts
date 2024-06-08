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

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  constructor(private _sericeUsuario:UsuarioService, private _serviceToast:ToastService){}
  private usuario :any;
  ngOnInit(): void {
    this.usuario = this._sericeUsuario.getUserActive();
    this.PerfilForm.controls['correo'].setValue(this.usuario.email)
    this.PerfilForm.controls['nombre'].setValue(this.usuario.nombre)
    this.PerfilForm.controls['apellido'].setValue(this.usuario.apellido)

  }
  PerfilForm = new FormGroup({
    correo: new FormControl('', [Validators.required,Validators.email]),
    apellido: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
  });
  actualizarDatos(){
    let usuarioAct = this.PerfilForm.value
    this._sericeUsuario.getUserEmail(usuarioAct.correo).subscribe({
      next:(data)=> {
        if (data.email == usuarioAct.correo) {
          this._sericeUsuario.actualizarUsuario(this.usuario.idusuario,{correo:usuarioAct.correo
            ,nombre:usuarioAct.nombre,apellido:usuarioAct.apellido}).subscribe({
              next:(data)=>{
                console.log(data);
                this._sericeUsuario.setUserActive(data.email);
                this._serviceToast.showSuccess("Actualizacion","Datos cambiado")
              }
            })
        }else{
          this._serviceToast.errorSuccess("Error","correo ya en uso")
        }
      },
      error:(err)=> {
        console.log(err);
        console.log(this.usuario.idusuario);
        
        this._sericeUsuario.actualizarUsuario(this.usuario.idusuario,{correo:usuarioAct.correo
          ,nombre:usuarioAct.nombre,apellido:usuarioAct.apellido}).subscribe({
            next:(data)=>{
              console.log(data);
              this._sericeUsuario.setUserActive(data.email);
              this._serviceToast.showSuccess("Actualizacion","Datos cambiado")
            }
          })
      },
    })   
  }
}
