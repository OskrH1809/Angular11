import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContratarServiciosComponent } from '../shared/components/contratar-servicios/contratar-servicios.component';
import { CreacionServiciosComponent } from '../shared/components/creacion-servicios/creacion-servicios.component';
import { EdicionTareasComponent } from '../components/edicion-tareas/edicion-tareas.component';
import { GestionTareasComponent } from '../shared/components/gestion-tareas/gestion-tareas.component';
import { ListadosSeComponent } from '../shared/components/listados-se/listados-se.component';
import { ServicioComponent } from '../shared/components/servicio/servicio.component';
import { AuthGuardGuard } from '../auth/services/auth-guard.guard';

const routes: Routes = [
  {path:'listado/:id', component:ListadosSeComponent, canActivate: [AuthGuardGuard],canLoad: [AuthGuardGuard]},
  {path:'gestionservicios', component:CreacionServiciosComponent, canActivate: [AuthGuardGuard],canLoad: [AuthGuardGuard]},
  {path:'gestiontareas/:id', component:GestionTareasComponent, canActivate: [AuthGuardGuard],canLoad: [AuthGuardGuard]},
  {path:'contratar', component:ContratarServiciosComponent, canActivate: [AuthGuardGuard],canLoad: [AuthGuardGuard]},
  {path:'edit', component:EdicionTareasComponent, canActivate: [AuthGuardGuard],canLoad: [AuthGuardGuard]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloServiciosRoutingModule { }
