import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloServiciosRoutingModule } from './modulo-servicios-routing.module';
import { ListadosSeComponent } from '../shared/components/listados-se/listados-se.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CreacionServiciosComponent } from '../shared/components/creacion-servicios/creacion-servicios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionTareasComponent } from '../shared/components/gestion-tareas/gestion-tareas.component';
import { ContratarServiciosComponent } from '../shared/components/contratar-servicios/contratar-servicios.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { EdicionTareasComponent } from '../components/edicion-tareas/edicion-tareas.component';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [
    ListadosSeComponent,
    CreacionServiciosComponent,
    GestionTareasComponent,
    ContratarServiciosComponent,
    EdicionTareasComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    NzTableModule,
    ModuloServiciosRoutingModule,
    NzPopconfirmModule,
    NzToolTipModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    CKEditorModule,
    NzNotificationModule,
    FormsModule,
    NzModalModule,
    HttpClientModule,
    NzSelectModule


  ],
  exports:[
    EdicionTareasComponent
  ]
})
export class ModuloServiciosModule { }
