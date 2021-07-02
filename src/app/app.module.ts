import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import es from '@angular/common/locales/es';
import { AdministrarUserService } from './Services/administrar-user.service';
import { TextoEditorComponent } from './components/texto-editor/texto-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DashboardComponent } from './views/components/dashboard/dashboard.component';
import { HeaderComponent } from './views/components/header/header.component';
import { ModuloUsuariosModule } from './modulo_usuarios/modulo-usuarios.module';
import { ModuloServiciosModule } from './modulo_servicios/modulo-servicios.module';
import { ModuloServicioContratadoModule } from './modulo_servicio_contratado/modulo-servicio-contratado.module';
import { FooterComponent } from './views/components/footer/footer.component';
import { AsideComponent } from './views/components/aside/aside.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Autentificacion } from './core/interceptors/autentificacion.service';
import { GestionUsuariosService } from './auth/services/gestion-usuarios.service';
import { PerfilComponent } from './auth/components/perfil/perfil.component';
import { VistaDocumentosComponent } from './shared/components/vista-documentos/vista-documentos.component';
registerLocaleData(es);


@NgModule({
  declarations: [
    AppComponent,
    TextoEditorComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    PerfilComponent,


  ],
  imports: [
    BrowserModule,
    ModuloUsuariosModule,
    ModuloServiciosModule,
    ModuloServicioContratadoModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  providers: [
    AdministrarUserService,
    GestionUsuariosService,

    { provide: NZ_I18N , useValue: es_ES,
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: Autentificacion,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
