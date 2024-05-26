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
  setPage: boolean = true;
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
    correo: new FormControl('dadas@gmail.com', [Validators.required]),
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
    console.log(this.setPage);
    
    localStorage.removeItem('token');
    this._serviceUsuario.deletUserActive()
    this._activeroute.queryParams.subscribe(data => {
      this._serviceUsuario.getUsuarioId(data['id']).subscribe(data1 => {
        console.log( data1);
        
        if (data['id'] && data1.estado == 1) {

          this.userPass = data['id']

          
          this.setPage = false;
        } else {
          this.setPage = true;
        }
      })

    })


  }
  inicioSesion() {
    let userInfo = this.registroForm.value;
    if (this.registroForm.status == 'VALID') {
      this._serviceUsuario.getUserEmail(userInfo.correo).subscribe((data) => {
        if (this._serviceUsuario.desencryptContra(data.contra) == userInfo.pass) {

          this._serviceUsuario.setUserActive(userInfo.correo).then(res => {
            if (res) {
              this.route.navigate(['./Perfiles']);
            }

          })
          // 
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
  irHome() {
    window.location.href ="http://localhost:4200/Home"
  }
  reestablecePass() {
    console.log(this.userPass);
    let pass = this.cambiarpass.value;
    console.log(this.cambiarpass.status);

    if (this.cambiarpass.status == 'VALID') {
      if (pass.pass == pass.passr) {
        console.log(this.userPass);
        
        this._serviceUsuario.getUsuarioId(this.userPass).subscribe(data => {
          console.log(data.estado);
          if(data.estado==1){
            this._serviceUsuario.actualizarContra(this.userPass, {contra:this._serviceUsuario.encryptContra(pass.pass)}).subscribe(data => {
              if (data) {
                this._serviceToast.showSuccess("Exito", "Actualizacion de contraseñas realizada")
                setTimeout(async () => {this.irHome()}, 1000);
                
               
              }
              
            })
          }else{
            this._serviceToast.errorSuccess("Error","No esta permitido cambiar contraseña")
            setTimeout(async () => {this.irHome()}, 1000);
            
          }
         
          
        })


      }
    } else {
      this._serviceToast.errorSuccess("Error", "Error en los datos")
    }

  }


  formMailRecuperar() {
    let user = this.recuperarCuenta.value
    this._serviceUsuario.getUserEmail(user.correo).subscribe(data => {
      console.log(data);
      this._serviceUsuario.actualizarEstado(data.idusuario,{contra:data.contra  }).subscribe()
      this._serviceMail.recuperarCuenta(data.idusuario).subscribe()
    })
  }
}

