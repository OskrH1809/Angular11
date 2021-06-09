import { CardsComponent } from './components/cards/cards.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextoEditorComponent } from './components/texto-editor/texto-editor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  {path:'editor', component:TextoEditorComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'**',pathMatch:'full',redirectTo:'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
