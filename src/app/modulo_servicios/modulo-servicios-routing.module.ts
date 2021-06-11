import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContratarServiciosComponent } from '../components/contratar-servicios/contratar-servicios.component';
import { CreacionServiciosComponent } from '../components/creacion-servicios/creacion-servicios.component';
import { EdicionTareasComponent } from '../components/edicion-tareas/edicion-tareas.component';
import { GestionServiciosComponent } from '../components/gestion-servicios/gestion-servicios.component';
import { ListadosSeComponent } from '../components/listados-se/listados-se.component';
import { ServicioComponent } from '../components/servicio/servicio.component';

const routes: Routes = [
  {path:'listado/:id', component:ListadosSeComponent},
  {path:'gestionservicios', component:CreacionServiciosComponent},
  {path:'gestiontareas/:id', component:GestionServiciosComponent},
  {path:'contratar', component:ContratarServiciosComponent},
  {path:'edit', component:EdicionTareasComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloServiciosRoutingModule { }
