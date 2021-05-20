import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CardsComponent } from './components/cards/cards.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoCardsService } from './Services/info-cards.service';
import { ListadosSeComponent } from './components/listados-se/listados-se.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicioComponent } from './components/servicio/servicio.component';
import { GestionServiciosComponent } from './components/gestion-servicios/gestion-servicios.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import es from '@angular/common/locales/es';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
registerLocaleData(es);


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
    ReactiveFormsModule,
    NzTableModule,
    NzTableModule,
    NzButtonModule,
    NzPaginationModule,
    NzPopconfirmModule


  ],
  providers: [
    InfoCardsService,
    { provide: NZ_I18N, useValue: es_ES },
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
