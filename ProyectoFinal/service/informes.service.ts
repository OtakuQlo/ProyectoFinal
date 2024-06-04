import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  url = 'http://localhost:3000/api/informes'
  
  constructor(private http: HttpClient) {
  }
  
  informeVentasEmp(id: any){
    return this.http.get(this.url+"/ventasEMP/"+id);
  }

  informeInventario(id:any){
    return this.http.get(this.url+"/ventas/"+id);
  }

  informeProductoP(id:any){
    return this.http.get(this.url+"/productoP/"+id);
  }

  informeProductoMP(id:any){
    return this.http.get(this.url+"/productoMP/"+id)
  }

  informeMermas(id:any){
    return this.http.get(this.url+"/mermas/"+id)
  }
}
