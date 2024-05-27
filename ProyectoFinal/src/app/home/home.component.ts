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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  validSesion: boolean = false;
  setPage: boolean = false;
  userPass: any;
  constructor(private _serviceUsuario: UsuarioService,
    private route: Router,
    private _activeroute: ActivatedRoute,
    private _serviceToast: ToastService,
    private _serviceMail: MailService
  ) {
    this._serviceUsuario.deletUserActive()
  }

  registroForm = new FormGroup({
    correo: new FormControl('dadas@gmail.com', [Validators.required]),
    pass: new FormControl('7SOB4SLdi7i27KO@', [Validators.required]),

  });
  recuperarCuenta = new FormGroup({
    correo: new FormControl('proyectofinal118@gmail.com', [Validators.required]),
    pass: new FormControl('7SOB4SLdi7i27KO@', [Validators.required]),

  });
  cambiarpass = new FormGroup({
    pass: new FormControl('7SOB4SLdi7i27KO@', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?^&])[A-Za-z\d@$!#%^?&]{8,50}$/
      ),
    ]),
    passr: new FormControl('7SOB4SLdi7i27KO@', [Validators.required]),

  });

  ngOnInit(): void {
    localStorage.removeItem('token');
    this._serviceUsuario.deletUserActive()
    this._activeroute.queryParams.subscribe(data => {
      console.log(data);

      if (data['id']) {
        this.userPass = data['id']
        this.setPage = false;
      } else {
        this.setPage = true;

      }
    })


  }
  inicioSesion() {
    let userInfo = this.registroForm.value;
    if (this.registroForm.status == 'VALID') {
      this._serviceUsuario.getUserEmail(userInfo.correo).subscribe({
        next: (data) => {
          if (this._serviceUsuario.desencryptContra(data.contra) == userInfo.pass) {
            
            
            this._serviceUsuario.setUserActive(userInfo.correo).then(res => {
              if (data.rol==2) {
                this.route.navigate(['./HistorialReportes']);
                
              }else{
                if (res) {
                  this.route.navigate(['./Perfiles']);
                }
              }


            })
            // 
          }
          else {
            this._serviceToast.errorSuccess("Error", "Usuario invalido")
          }
        },
        error: (e) => { this._serviceToast.errorSuccess("Error", "Usuario no valido") },
      }
      )
    }
  }
  irCrearCuenta() {
    this.route.navigate(['./Registro']);
  }
  irHome() {
    this.route.navigate(['./Home']);
  }
  reestablecePass() {
    let pass = this.cambiarpass.value;
    console.log(this.cambiarpass.status);

    if (this.cambiarpass.status == 'VALID') {
      if (pass.pass == pass.passr) {
        this._serviceUsuario.getUsuarioId(this.userPass).subscribe({
          next: (data) => {
            if (data.estado == true) {
              this._serviceUsuario.actualizarContra(this.userPass, { contra: this._serviceUsuario.encryptContra(pass.pass), estado: false }).subscribe({
                next: (data) => {
                  console.log(data);

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
            }else{
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
              next: (data) => {},
              error: (e) => {
                this._serviceToast.errorSuccess("Error", "Error en los datos")
              },
              complete: () => {this._serviceToast.showSuccess("Exito", "Revisar correo electronico")}
            })
            
          },
        })
      }, error: (e) => {
        this._serviceToast.errorSuccess("Error", "Error en los datos")
      },
    });
  }

}

