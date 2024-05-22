import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansService {



  constructor(private http: HttpClient) { }
  url = environment.url+'plans';

  getPlansId(id:any): Observable<any>{
    return this.http.get(this.url+"/"+id);
  }

  getPlans(): Observable<any>{
    return this.http.get(this.url+"/");
  }
}