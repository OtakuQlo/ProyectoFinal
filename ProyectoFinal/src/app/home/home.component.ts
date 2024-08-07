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
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../service/toast.service';
import { MailService } from '../../../service/mail.service';
import { PerfilusuarioService } from '../../../service/perfilusuario.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  validSesion: boolean = false;
  setPage: number = 0;
  userPass: any;
  constructor(private _serviceUsuario: UsuarioService,
    private route: Router,
    private _activeroute: ActivatedRoute,
    private _serviceToast: ToastService,
    private _serviceMail: MailService,
    private _servicePerfil: PerfilusuarioService
  ) {
  }

  registroForm = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),

  });
  recuperarCuenta = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),

  });
  cambiarpass = new FormGroup({
    pass: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?^&])[A-Za-z\d@$!#%^?&]{8,50}$/
      ),
    ]),
    passr: new FormControl('', [Validators.required]),

  });

  ngOnInit(): void {
    this._servicePerfil.setInactiveProfile(localStorage.getItem('pActivo'), {estado : false});
    this._serviceUsuario.deletUserActive();
    localStorage.removeItem('tokenPerfil');
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('pActivo')

    
    this._activeroute.queryParams.subscribe(data => {
      this._serviceUsuario.getUsuarioId(data['id']).subscribe(data1 => {
        

        if (data['id'] && data1.estado == 1) {

          this.userPass = data['id']


          this.setPage = 1;
        } else {
          this.setPage = 0;
        }
      })

    })


  }
  inicioSesion() {
    let userInfo = this.registroForm.value;
    if (this.registroForm.status == 'VALID') {
      this._serviceUsuario.getUserEmail(userInfo.correo).subscribe({
        next: (data) => {
          if (data.habilitado == 1) {
            if (this._serviceUsuario.desencryptContra(data.contra) == userInfo.pass) {
              this._serviceUsuario.setUserActive(userInfo.correo).then(res => {
                if (data.rol == 2) {
                  localStorage.setItem('tokenUser', this._serviceUsuario.encryptContra('AdminOrdenalo'))
                  window.location.href = "/HistorialReportes"
                } else {
                  if (res) {
                    localStorage.setItem('tokenUser',this._serviceUsuario.encryptContra('UsuarioOrdenalo'))
                    this.route.navigate(['./Perfiles']);
                  }
                }


              })
            }
            else {
              this._serviceToast.errorSuccess("Error", "Usuario invalido")
            }
          }
          if (data.habilitado == 0) {
            
            this._serviceUsuario.setUserActive(userInfo.correo);
            this.setPage = 2;
          }

        },
        error: (e) => { this._serviceToast.errorSuccess("Error", "Usuario no valido") },
      }
      )
    }
  }
  rehabilitarCuenta(res:boolean){
    if(res){

    }else{
      this.irHome()
    }
  }
  irCrearCuenta() {
    this.route.navigate(['./Registro']);
  }
  irHome() {
    window.location.href = "http://localhost:4200/Home"
    this.route.navigate(['./Home']);
  }
  reestablecePass() {
    
    let pass = this.cambiarpass.value;
    

    if (this.cambiarpass.status == 'VALID') {
      if (pass.pass == pass.passr) {
        this._serviceUsuario.getUsuarioId(this.userPass).subscribe({
          next: (data) => {
            if (data.estado == true) {
              this._serviceUsuario.actualizarContra(this.userPass, { contra: this._serviceUsuario.encryptContra(pass.pass), estado: false }).subscribe({
                next: (data) => {
                  

                },
                error: (e) => {
                  this._serviceToast.errorSuccess("Error", "Error en los datos")
                },
                complete: () => {
                  this._serviceToast.showSuccess("Exito", "Los datos cambiado")
                  this.irHome()
                },
              }
              )
            } else {
              this._serviceToast.errorSuccess("Error", "Error en los datos")
              this.irHome()
            }


          }

        })


      }
    } else {
      this._serviceToast.errorSuccess("Error", "Error en los datos")
    }

  }


  formMailRecuperar() {
    let user = this.recuperarCuenta.value;
    this._serviceUsuario.getUserEmail(user.correo).subscribe({
      next: (data) => {
        this._serviceUsuario.actualizarContra(data.idusuario, { contra: "", estado: true }).subscribe({
          error: (e) => {
            this._serviceToast.errorSuccess("Error", "Error en los datos")
          },
          complete: () => {
            this._serviceToast.showSuccess("Exito", "Revisar correo electronico")
            this._serviceMail.recuperarCuenta(data.idusuario).subscribe({
              next: (data) => { },
              error: (e) => {
                this._serviceToast.errorSuccess("Error", "Error en los datos")
              },
              complete: () => { this._serviceToast.showSuccess("Exito", "Revisar correo electronico") }
            })

          },
        })
      }, error: (e) => {
        this._serviceToast.errorSuccess("Error", "Error en los datos")
      },
    });

  }
  HabilitarCuenta(){
    
    this._serviceUsuario.habilitarUsuario(this._serviceUsuario.getUserActive().idusuario,{habilitado:1}).subscribe({
      next:(data)=>{
        window.location.href = "http://localhost:4200/Home"
        this.route.navigate(['./Home']);
      }
    })
    
  }
}

