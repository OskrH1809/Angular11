import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloServiciosRoutingModule } from './modulo-servicios-routing.module';
import { ListadosSeComponent } from '../components/listados-se/listados-se.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CreacionServiciosComponent } from '../components/creacion-servicios/creacion-servicios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionServiciosComponent } from '../components/gestion-servicios/gestion-servicios.component';
import { ContratarServiciosComponent } from '../components/contratar-servicios/contratar-servicios.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzNotificationModule } from 'ng-zorro-antd/notification';


@NgModule({
  declarations: [
    ListadosSeComponent,
    CreacionServiciosComponent,
    GestionServiciosComponent,
    ContratarServiciosComponent,


  ],
  imports: [
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
    FormsModule,
    NzNotificationModule

  ],
  exports:[

  ]
})
export class ModuloServiciosModule { }
