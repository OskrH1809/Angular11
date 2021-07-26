import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloServiciosRoutingModule } from './modulo-servicios-routing.module';
import { ListadosSeComponent } from '../shared/components/listados-servicios-contratados-usuario/listados-servicios-contratados-usuario.component';
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
import { VistaDocumentosComponent } from '../shared/components/vista-documentos/vista-documentos.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ListadoServiciosContradadosAllComponent } from '../shared/listado-servicios-contradados-all/listado-servicios-contradados-all.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ListadoTareasAllComponent } from '../shared/components/listado-tareas-all/listado-tareas-all.component';



@NgModule({
  declarations: [
    ListadosSeComponent,
    CreacionServiciosComponent,
    GestionTareasComponent,
    ContratarServiciosComponent,
    EdicionTareasComponent,
    VistaDocumentosComponent,
    ListadoServiciosContradadosAllComponent,
    ListadoTareasAllComponent

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
    NzSelectModule,
    NzImageModule,
    NzRadioModule

  ],
  exports:[
    EdicionTareasComponent,
    ContratarServiciosComponent
  ]
})
export class ModuloServiciosModule { }
