import { CardsComponent } from './components/cards/cards.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadosSeComponent } from './components/listados-se/listados-se.component';
import { ServicioComponent } from './components/servicio/servicio.component';

const routes: Routes = [
  {path:'cards', component:CardsComponent},
  {path:'listadosse', component:ListadosSeComponent},
  {path:'servicio/:id', component:ServicioComponent},
  {path:'**',pathMatch:'full',redirectTo:''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
