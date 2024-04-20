import { Component, OnInit } from '@angular/core';

import { MarcaService } from '../../../service/marca.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  constructor(private _marcaservice:MarcaService){}
  ngOnInit(): void {
      this.obtenermarcas();
  }
  obtenermarcas(){
    this._marcaservice.getMarca().subscribe(data=>{
      console.log(data)
    })
  }

}
