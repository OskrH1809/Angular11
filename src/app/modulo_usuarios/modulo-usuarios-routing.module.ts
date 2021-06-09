import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionClientesComponent } from '../components/gestion-clientes/gestion-clientes.component';
import { LoginComponent } from '../components/login/login.component';
import { RecuperarContraComponent } from '../components/recuperar-contra/recuperar-contra.component';
import { RegistroComponent } from '../components/registro/registro.component';

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
