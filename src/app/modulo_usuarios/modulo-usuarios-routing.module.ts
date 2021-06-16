import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionClientesComponent } from '../shared/components/gestion-clientes/gestion-clientes.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { RegistroComponent } from '../auth/components/registro/registro.component';
import { RecuperarContraComponent } from '../auth/components/recuperar-contra/recuperar-contra.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegistroComponent},
  {path:'recuperar', component:RecuperarContraComponent},
  {path:'gestionclientes', component:GestionClientesComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloUsuariosRoutingModule { }
