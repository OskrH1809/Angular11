import { CardsComponent } from './components/cards/cards.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadosSeComponent } from './components/listados-se/listados-se.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { GestionServiciosComponent } from './components/gestion-servicios/gestion-servicios.component';

const routes: Routes = [
  {path:'', component:CardsComponent},
  {path:'listadosse', component:ListadosSeComponent},
  {path:'servicio/:id', component:ServicioComponent},
  {path:'gestion', component:GestionServiciosComponent},
  {path:'**',pathMatch:'full',redirectTo:''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
