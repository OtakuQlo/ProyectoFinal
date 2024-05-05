import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccess(titulo:string,body:string) {
    this.toastr.success(titulo,body);
  }
  errorSuccess(titulo:string,body:string) {
    this.toastr.error(titulo,body);
  }
}
