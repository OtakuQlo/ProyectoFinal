import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RealizarVentaComponent } from './realizar-venta/realizar-venta.component';
import { SeccionPerfilesComponent } from './seccion-perfiles/seccion-perfiles.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';
import { CrearPerfilJefeComponent } from './crear-perfil-jefe/crear-perfil-jefe.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { AdministrarPerfilesComponent } from './administrar-perfiles/administrar-perfiles.component';
import { ReporteProblemaComponent } from './reporte-problema/reporte-problema.component';
import { GenerarInformeComponent } from './generar-informe/generar-informe.component';

export const routes: Routes = [
    { path: 'Home', component: HomeComponent }, 
    { path: 'Registro', component: CrearCuentaComponent },
    { path: 'CrearJefe', component: CrearPerfilJefeComponent },  
    { path: 'Venta', component: RealizarVentaComponent },
    { path: 'Perfiles', component: SeccionPerfilesComponent },
    { path: 'CrearPerfil', component: CrearPerfilComponent },
    { path: 'AdministrarPerfiles', component: AdministrarPerfilesComponent },
    { path: 'ReportarProblema', component: ReporteProblemaComponent },
    { path: 'Informes', component: GenerarInformeComponent },
    { path: '', redirectTo: 'Home', pathMatch: 'full' }
];
