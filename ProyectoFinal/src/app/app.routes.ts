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
import { AdminGuard, AdminORDGuard, HomeGuard, PUGuard, authGuard } from '../authGard/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

export const routes: Routes = [
    { path: 'Home', component: HomeComponent}, 
    { path: 'Registro', component: CrearCuentaComponent,canActivate:[HomeGuard]},
    { path: 'CrearJefe', component: CrearPerfilJefeComponent ,canActivate:[authGuard]},  
    { path: 'Venta', component: RealizarVentaComponent ,canActivate:[PUGuard]},
    { path: 'Perfiles', component: SeccionPerfilesComponent,canActivate:[authGuard]},
    { path: 'CrearPerfil', component: CrearPerfilComponent,canActivate:[AdminGuard] },
    { path: 'AdministrarPerfiles', component: AdministrarPerfilesComponent ,canActivate:[AdminGuard]},
    { path: 'ReportarProblema', component: ReporteProblemaComponent ,canActivate:[AdminGuard]},
    { path: 'Estado', component: GenerarInformeComponent ,canActivate:[AdminGuard]},
    { path: 'AgregarProducto', component: AgregarProductoComponent ,canActivate:[AdminGuard]},
    { path: 'AgregarProducto/:id', component: AgregarProductoComponent ,canActivate:[AdminGuard]},
    { path: 'AjustePlan', component: AjustePlanesComponent ,canActivate:[PUGuard]},
    { path: 'Historial', component: HistorialComponent ,canActivate:[AdminGuard]},
    { path: 'Inventario', component: InventarioComponent ,canActivate:[AdminGuard]},
    { path: 'HistorialReportes', component: HistorialReportesComponent ,canActivate:[AdminORDGuard]},
    { path: 'Perfil', component: PerfilComponent ,canActivate:[AdminGuard]},
    { path: '**', redirectTo: 'Home', pathMatch: 'full' }
];
