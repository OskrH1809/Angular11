import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContratarServiciosComponent } from '../shared/components/contratar-servicios/contratar-servicios.component';
import { CreacionServiciosComponent } from '../shared/components/creacion-servicios/creacion-servicios.component';
import { EdicionTareasComponent } from '../components/edicion-tareas/edicion-tareas.component';
import { GestionTareasComponent } from '../shared/components/gestion-tareas/gestion-tareas.component';
import { ListadosSeComponent } from '../shared/components/listados-se/listados-se.component';
import { ServicioComponent } from '../shared/components/servicio/servicio.component';

const routes: Routes = [
  {path:'listado/:id', component:ListadosSeComponent},
  {path:'gestionservicios', component:CreacionServiciosComponent},
  {path:'gestiontareas/:id', component:GestionTareasComponent},
  {path:'contratar', component:ContratarServiciosComponent},
  {path:'edit', component:EdicionTareasComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloServiciosRoutingModule { }
