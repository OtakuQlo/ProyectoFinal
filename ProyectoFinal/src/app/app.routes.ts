import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RealizarVentaComponent } from './realizar-venta/realizar-venta.component';
import { SeccionPerfilesComponent } from './seccion-perfiles/seccion-perfiles.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { CrearPerfilJefeComponent } from './crear-perfil-jefe/crear-perfil-jefe.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';

export const routes: Routes = [
    { path: 'Home', component: HomeComponent }, 
    { path: 'Registro', component: CrearCuentaComponent },
    { path: 'CrearPerfil', component: CrearPerfilComponent },
    { path: 'CrearJefe', component: CrearPerfilJefeComponent },  
    { path: 'Venta', component: RealizarVentaComponent },
    { path: 'Perfiles', component: SeccionPerfilesComponent },
    { path: '', redirectTo: 'Home', pathMatch: 'full' }
];
