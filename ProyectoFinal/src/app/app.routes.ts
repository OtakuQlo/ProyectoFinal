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
    { path: 'AgregarProducto', component: AgregarProductoComponent },
    { path: 'AjustePlan', component: AjustePlanesComponent },
    { path: 'Historial', component: HistorialComponent },
    { path: 'Inventario', component: InventarioComponent },
    { path: 'HistorialReportes', component: HistorialReportesComponent },
    { path: '', redirectTo: 'Home', pathMatch: 'full' }
];
