import { Component, OnInit } from '@angular/core';
import { marcaModel } from '../shared/marca.model';
import { Observable } from 'rxjs';
import { ApiTestService } from '../Services/api-test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  marca: Observable<marcaModel[]> | undefined

  constructor(private lista: ApiTestService) {
  }

  ngOnInit() {
    this.marca = this.lista.obtenerMarca();
    /* console.log(this.marca); */
  }

}
