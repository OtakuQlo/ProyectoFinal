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
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { AjustePlanesComponent } from './ajuste-planes/ajuste-planes.component';
import { HistorialComponent } from './historial/historial.component';
import { InventarioComponent } from './inventario/inventario.component';
import { HistorialReportesComponent } from './historial-reportes/historial-reportes.component';
import { AdminGuard, AdminOrdenaloGuard, HomeGuard, PUGuard, authGuard } from '../authGard/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

export const routes: Routes = [
    { path: 'Home', component: HomeComponent,canActivate:[HomeGuard] }, 
    { path: 'Registro', component: CrearCuentaComponent,canActivate:[HomeGuard]},
    { path: 'CrearJefe', component: CrearPerfilJefeComponent ,canActivate:[authGuard]},  
    { path: 'Venta', component: RealizarVentaComponent ,canActivate:[PUGuard]},
    { path: 'Perfiles', component: SeccionPerfilesComponent,canActivate:[]},
    { path: 'CrearPerfil', component: CrearPerfilComponent,canActivate:[] },
    { path: 'AdministrarPerfiles', component: AdministrarPerfilesComponent ,canActivate:[]},
    { path: 'ReportarProblema', component: ReporteProblemaComponent ,canActivate:[]},
    { path: 'Estado', component: GenerarInformeComponent ,canActivate:[]},
    { path: 'AgregarProducto', component: AgregarProductoComponent ,canActivate:[]},
    { path: 'AgregarProducto/:id', component: AgregarProductoComponent ,canActivate:[]},
    { path: 'AjustePlan', component: AjustePlanesComponent ,canActivate:[authGuard]},
    { path: 'Historial', component: HistorialComponent ,canActivate:[]},
    { path: 'Inventario', component: InventarioComponent ,canActivate:[]},
    { path: 'HistorialReportes', component: HistorialReportesComponent ,canActivate:[authGuard]},
    { path: 'Perfil', component: PerfilComponent ,canActivate:[]},
    { path: '**', redirectTo: 'Home', pathMatch: 'full' }
];
