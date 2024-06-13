import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../service/usuario.service';
import { validateRut } from '@fdograph/rut-utilities';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../service/toast.service';
import { WebpayService } from '../../../service/webpay.service';
import { PlansService } from '../../../service/plans.service';
import { TarjetaService } from '../../../service/tarjeta.service';
@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css',
})
export class CrearCuentaComponent {
  validNombre: boolean = false;
  validApellido: boolean = false;
  validRut: boolean = false;
  validarCorreo: boolean = false;
  validarPass: boolean = false;
  validarPass2: boolean = false;
  validartelefono: boolean = false;
  checkboxTermState: boolean = false;
  BASICO: boolean = true;
  INTERMEDIO: boolean = false;
  AVANZADO: boolean = false;
  plan: number = 1;
  plans: any[] = [];
  procesosCrearCuenta: number = 1;
  constructor(
    private route: Router,
    private _serviceUsuario: UsuarioService,
    private _servicioToast: ToastService,
    private _servicePago: WebpayService,
    private _servicePlanes: PlansService,
    private _servieTarjeta:TarjetaService
  ) { }

  registroForm = new FormGroup({
    rut: new FormControl('202995470', [Validators.required]),
    correo: new FormControl('dadas@gmail.com', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/),
    ]),
    telefono: new FormControl('56985420', [
      Validators.required,
      Validators.max(99999999),
      Validators.min(10000000),
    ]),
    pass: new FormControl('7SOB4SLdi7i27KO@', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#?^&])[A-Za-z\d@$!#%^?&]{8,50}$/
      ),
    ]),
    pass1: new FormControl('7SOB4SLdi7i27KO@', [Validators.required]),
    nombre: new FormControl('sadasd', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,100}$/
      ),
    ]),
    apellido: new FormControl('dasdsa', [
      Validators.required,
      Validators.pattern(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1])[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,100}$/
      ),
    ]),
  });
  tarjetaForm = new FormGroup({
    cardNumber: new FormControl('370000000002032', [
      Validators.required,
      Validators.max(999999999999999),
    ]),
    cvv: new FormControl('123', [
      Validators.required,
      Validators.max(999),
      Validators.min(111),
    ]),
    mes: new FormControl('12', [
      Validators.required,
      Validators.max(12),
      Validators.min(1),
    ]),
    ano: new FormControl('01', [
      Validators.required,
      Validators.max(99),
      Validators.min(1),
    ]),
  });
  ngOnInit(): void {
    this._servicePlanes.getPlans().subscribe({
      next: (data) => {
        this.plans = data
        console.log(this.plans);

      },
    })
  }
  // funcion de crear cuenta
  crearCuenta(
    nombre: any,
    apellido: any,
    rut: any,
    contra: any,
    email: any,
    telefono: any,
    idplan: any,
  ) {
    this._serviceUsuario
      .postUsuario({
        idusaurio: '',
        nombre: nombre,
        apellido: apellido,
        rut: rut,
        contra: this._serviceUsuario.encryptContra(contra),
        telefono: telefono,
        idplan: idplan,
        email: email,
        rol: 1,
        estado: 0,
        habilitado:1,
      }).subscribe(data=>{
        let card = this.tarjetaForm.value
        this._servieTarjeta.postTarjeta({
          numero: this._serviceUsuario.encryptContra(card.cardNumber?.toString()),
          cvv: this._serviceUsuario.encryptContra(card.cvv),
          month: this._serviceUsuario.encryptContra(card.mes?.toString().padStart(2, "0")),
          year: this._serviceUsuario.encryptContra(card.ano?.toString().padStart(2, "0")),
          idusuario: data.idusuario
      }).subscribe()
      })

    this._serviceUsuario.setUserActive(email).then(res => {
      localStorage.setItem('tokenUser',this._serviceUsuario.encryptContra('UsuarioOrdenalo'))
      console.log(res);
      if (res) {
        this._servicioToast.showSuccess("Cuenta Creda", "cuenta creada con existo")
        this.route.navigate(['/CrearJefe']);
      }
    })




  }

  // funcion de validar
  onSubmit() {
    let usuario = this.registroForm.value;
    let flag = true;

    // los formularios deben de tener contenido
    if (this.registroForm.status != 'VALID') {
      flag = false;
    }
    // Validar que rut sea el correcto
    this.validRut =
      this.registroForm.get('rut')?.status == 'VALID' ? false : true;
    this.validRut = validateRut(usuario.rut?.toString()) ? false : true;
    // Validar Nombre
    this.validNombre =
      this.registroForm.get('nombre')?.status == 'VALID' ? false : true;
    //Validar Apellido
    this.validApellido =
      this.registroForm.get('apellido')?.status == 'VALID' ? false : true;
    // validar correo electronico
    this.validarCorreo =
      this.registroForm.get('correo')?.status == 'VALID' ? false : true;
    // validar telefono
    this.validartelefono =
      this.registroForm.get('telefono')?.status == 'VALID' ? false : true;
    // validar contraseña
    this.validarPass =
      this.registroForm.get('pass')?.status == 'VALID' ? false : true;
    this.validarPass2 =
      this.registroForm.get('pass1')?.status == 'VALID' ? false : true;
    this.validarPass2 =
      this.registroForm.value.pass == this.registroForm.value.pass1
        ? false
        : true;
    if (
      !this.validarCorreo &&
      !this.validApellido &&
      !this.validNombre &&
      !this.validarPass &&
      !this.validarPass2 &&
      !this.validartelefono &&
      !this.validRut &&
      flag
    ) {
      if (this.checkboxTermState) {
        if (this.BASICO || this.INTERMEDIO || this.AVANZADO) {
          console.log(usuario.pass);
          this._serviceUsuario.usuarioExistente(usuario.correo, usuario.rut).subscribe(data => {

            if (data.length == 0) {
              console.log("se puede crear el usuario");
              this.procesosCrearCuenta = 2;
            }
            if (data.length > 0) {
              this._servicioToast.errorSuccess("Error", "El correo ya está en uso o el rut")
            }


          }, (error) => {

          })
          
        } else {
          this._servicioToast.errorSuccess("Error", "Seleccione el plan a pagar")
        }
      } else {
        this._servicioToast.errorSuccess("Error", "Acepte los terminos")
      }
    }
  }
  CheckboxChanges1() {
    console.log(this.BASICO);

    this.INTERMEDIO = false;
    this.AVANZADO = false;
    this.plan = 1;
  }
  CheckboxChanges2() {

    this.BASICO = false;
    this.AVANZADO = false;
    this.plan = 2;
    console.log(this.BASICO);
  }
  CheckboxChanges3() {
    this.INTERMEDIO = false;
    this.BASICO = false;
    this.plan = 3;
  }
  card() {
    console.log("card");
    let card = this.tarjetaForm.value
    this._servicePago.realizarPago({
      "buyOrder": 1,
      "sessionId": 1,
      "precio": 2,
      "cvv": card.cvv,
      "cardnumber": card.cardNumber?.toString(),
      "month": card.mes?.toString().padStart(2, "0"),
      "year": card.ano?.toString().padStart(2, "0")
    }).subscribe({
      next: (data) => {
        console.log(data);
        let token: any = data
        this._servicePago.verificarPago({ token: token.token }).subscribe({
          next: (curr) => {
            console.log(curr);
            let res: any = curr;
            console.log(res.status);
            if (res.status == "AUTHORIZED") {
              this._servicioToast.showSuccess("Exito", "Tarjeta aprobada")
              let usuario = this.registroForm.value;
              this.crearCuenta(
                usuario.nombre,
                usuario.apellido,
                usuario.rut,
                usuario.pass,
                usuario.correo,
                usuario.telefono,
                this.plan,
              );
              
            } else {
              this._servicioToast.errorSuccess("ERROR", "Tarjeta rechazada")
              this.procesosCrearCuenta = 1
            }
          },
          error: (err) => {

          }
        })
      },
      error: (err) => {
        this._servicioToast.errorSuccess("ERROR", "Valores no validos en tarjeta")
      },
    })
  }
}