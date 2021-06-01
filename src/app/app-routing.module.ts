import { CardsComponent } from './components/cards/cards.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadosSeComponent } from './components/listados-se/listados-se.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { GestionServiciosComponent } from './components/gestion-servicios/gestion-servicios.component';
import { GestionClientesComponent } from './components/gestion-clientes/gestion-clientes.component';
import { CreacionServiciosComponent } from './components/creacion-servicios/creacion-servicios.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent} from './components/registro/registro.component'
import { RecuperarContraComponent } from './components/recuperar-contra/recuperar-contra.component';
import { ContratarServiciosComponent } from './components/contratar-servicios/contratar-servicios.component';
import { TextoEditorComponent } from './components/texto-editor/texto-editor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'', component:CardsComponent},
  {path:'listadosse', component:ListadosSeComponent},
  {path:'servicio/:id', component:ServicioComponent},
  {path:'gestiontareas/:id', component:GestionServiciosComponent},
  {path:'gestionclientes', component:GestionClientesComponent},
  {path:'creacionservicios', component:CreacionServiciosComponent},
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'recuperar', component:RecuperarContraComponent},
  {path:'contratar', component:ContratarServiciosComponent},
  {path:'editor', component:TextoEditorComponent},
  {path:'dashboard', component:DashboardComponent},






  {path:'**',pathMatch:'full',redirectTo:''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
