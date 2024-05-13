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
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'Home', component: HomeComponent, }, 
    { path: 'Registro', component: CrearCuentaComponent },
    { path: 'CrearJefe', component: CrearPerfilJefeComponent ,canActivate:[authGuard]},  
    { path: 'Venta', component: RealizarVentaComponent ,canActivate:[authGuard]},
    { path: 'Perfiles', component: SeccionPerfilesComponent,canActivate:[authGuard]},
    { path: 'CrearPerfil', component: CrearPerfilComponent,canActivate:[authGuard] },
    { path: 'AdministrarPerfiles', component: AdministrarPerfilesComponent ,canActivate:[authGuard]},
    { path: 'ReportarProblema', component: ReporteProblemaComponent ,canActivate:[authGuard]},
    { path: 'Informes', component: GenerarInformeComponent ,canActivate:[authGuard]},
    { path: 'AgregarProducto', component: AgregarProductoComponent ,canActivate:[authGuard]},
    { path: 'AjustePlan', component: AjustePlanesComponent ,canActivate:[authGuard]},
    { path: 'Historial', component: HistorialComponent ,canActivate:[authGuard]},
    { path: 'Inventario', component: InventarioComponent ,canActivate:[authGuard]},
    { path: 'HistorialReportes', component: HistorialReportesComponent ,canActivate:[authGuard]},
    { path: '**', redirectTo: 'Home', pathMatch: 'full' }
];
