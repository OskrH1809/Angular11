import { CardsComponent } from './shared/components/cards/cards.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextoEditorComponent } from './components/texto-editor/texto-editor.component';
import { DashboardComponent } from './views/components/dashboard/dashboard.component';

const routes: Routes = [

  {path:'editor', component:TextoEditorComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'**',pathMatch:'full',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
