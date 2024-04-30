import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private _serviceUsuario: UsuarioService) {}
  ngOnInit(): void {}
}
