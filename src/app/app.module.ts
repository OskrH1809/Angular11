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
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { AdministrarUserService } from './Services/administrar-user.service';
import { GestionClientesComponent } from './components/gestion-clientes/gestion-clientes.component';
import { CreacionServiciosComponent } from './components/creacion-servicios/creacion-servicios.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { LoginComponent } from './components/login/login.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarContraComponent } from './components/recuperar-contra/recuperar-contra.component';
import { ContratarServiciosComponent } from './components/contratar-servicios/contratar-servicios.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { TextoEditorComponent } from './components/texto-editor/texto-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DashboardComponent } from './components/dashboard/dashboard.component';
registerLocaleData(es);


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    ListadosSeComponent,
    ServicioComponent,
    GestionServiciosComponent,
    GestionClientesComponent,
    CreacionServiciosComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarContraComponent,
    ContratarServiciosComponent,
    TextoEditorComponent,
    DashboardComponent
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
    NzButtonModule,
    NzPaginationModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzToolTipModule,
    NzFormModule,
    NzIconModule,
    NzCheckboxModule,
    NzInputModule,
    NzCarouselModule,
    NzImageModule,
    CKEditorModule,
    NzButtonModule



  ],
  providers: [
    InfoCardsService,
    AdministrarUserService,
    { provide: NZ_I18N, useValue: es_ES },
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
