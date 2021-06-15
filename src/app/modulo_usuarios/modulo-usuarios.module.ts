import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloUsuariosRoutingModule } from './modulo-usuarios-routing.module';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { RegistroComponent } from '../components/registro/registro.component';
import { RecuperarContraComponent } from '../components/recuperar-contra/recuperar-contra.component';
import { GestionClientesComponent } from '../components/gestion-clientes/gestion-clientes.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    RecuperarContraComponent,
    GestionClientesComponent,

  ],
  imports: [
    CommonModule,
    ModuloUsuariosRoutingModule,
    ReactiveFormsModule,
    NzFormModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzPopconfirmModule,
    NzToolTipModule,
    NzCheckboxModule,
    NzSelectModule,
    NzTableModule,




  ]
})
export class ModuloUsuariosModule { }
