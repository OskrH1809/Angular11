import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from '../components/cards/cards.component';
import { ServicioComponent } from '../components/servicio/servicio.component';

const routes: Routes = [
  {path:'servicio/:id', component:ServicioComponent},
  {path:'cards', component:CardsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloServicioContratadoRoutingModule { }
