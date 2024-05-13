import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, EMPTY } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PerdidasService {

  constructor(private http: HttpClient) { }
  private url = environment.url + 'perdidas';

  async postPerdidas(perdida: any, barcode: any): Promise<boolean> {
    try {
      let producto:any = await lastValueFrom(this.http.get(environment.url + 'productos/' + barcode));
      console.log(producto.length==0);
      if (producto.length!=0) {
        await lastValueFrom( this.http.post(this.url, perdida));
        return true;
      }else{
        return false;
      }
    } catch (error) {
      console.error('Error al procesar la pérdida:', error);
      return false; 
    }
  }
}
