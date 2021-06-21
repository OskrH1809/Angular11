import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from '../auth/services/auth-guard.guard';
import { CardsComponent } from '../shared/components/cards/cards.component';
import { ServicioComponent } from '../shared/components/servicio/servicio.component';

const routes: Routes = [
  {path:'servicio/:id', component:ServicioComponent, canActivate: [AuthGuardGuard],canLoad:[AuthGuardGuard]},
  {path:'cards', component:CardsComponent, canActivate: [AuthGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloServicioContratadoRoutingModule { }
