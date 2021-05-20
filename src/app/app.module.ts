import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CardsComponent } from './components/cards/cards.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoCardsService } from './Services/info-cards.service';
import { ListadosSeComponent } from './components/listados-se/listados-se.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicioComponent } from './components/servicio/servicio.component';
import { GestionServiciosComponent } from './components/gestion-servicios/gestion-servicios.component';


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    ListadosSeComponent,
    ServicioComponent,
    GestionServiciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatExpansionModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule


  ],
  providers: [
    InfoCardsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
