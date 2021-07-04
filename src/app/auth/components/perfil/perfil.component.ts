import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { decode } from 'querystring';
import { Observable, Observer } from 'rxjs';
import { GestionClientesService } from 'src/app/shared/services/gestion-clientes.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  helper = new JwtHelperService();
  decodeToken = this.helper.decodeToken(localStorage.getItem('token'));
  isPasswordVisible = true;
  disableInput = true;
  user = this.decodeToken.username;
  datosUsuario;
  cuentaBanco;
  telefono;
  direccion;


  ngOnInit(): void {
    this.get_data_this_user();

  }
  constructor(private notification: NzNotificationService,
              private gestionClientes:GestionClientesService,
              private fb: FormBuilder
  )
  {



    this.validateForm = this.fb.group({
      email: [{ disabled: this.disableInput, value: "" }],
      password: ['',],
      contraseñaActual:[''],
      confirm: ['', [this.confirmValidator]]
    });

    console.log(this.datosUsuario)
    this.validateForm2 = this.fb.group({
      cuentaBanco: [],
      telefono: [],
      direccion: [],

    });


  }

  validateForm: FormGroup;
  submitForm(value: { cuentaBanco: string; telefono: string; direccion: string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);

  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }


    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { error: true, required: true };
      } else if (control.value !== this.validateForm.controls.password.value) {
        return { confirm: true, error: true };
      }
      return {};
    };




    // segundo form

    validateForm2: FormGroup;
    submitForm2(value: { cuentaBanco: string; email: string; password: string; confirm: string; comment: string }): void {
      for (const key in this.validateForm2.controls) {
        this.validateForm2.controls[key].markAsDirty();
        this.validateForm2.controls[key].updateValueAndValidity();
      }
      console.log(value);
      if (this.datosUsuario) {
        this.actualizarDatos(value);
      } else {
        this.nuevoRegistroDatosUsuarios(value)
      }


    }

    validateConfirmPassword2(): void {
      setTimeout(() => this.validateForm2.controls.confirm.updateValueAndValidity());
    }


      confirmValidator2 = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
          return { error: true, required: true };
        } else if (control.value !== this.validateForm2.controls.password.value) {
          return { confirm: true, error: true };
        }
        return {};
      };





// peticiones


get_data_this_user(){

  this.gestionClientes.get_data_this_user().subscribe(respuesta=>{
    this.datosUsuario = respuesta;
    if (this,this.datosUsuario) {
      console.log(this.datosUsuario);
      this.cuentaBanco = this.datosUsuario['cuentaBanco'];
      this.telefono = this.datosUsuario['telefono'];
      this.direccion= this.datosUsuario['direccion'];
      this.direccion= this.datosUsuario['direccion'];
      console.log(this.user);
    }
  })





}

  actualizarDatos(data){
    this.gestionClientes.actualizarDatosUsuario(data).subscribe(respuesta=>{

      if (respuesta) {
      console.log("respuesta")
      this.createNotification('info','Perfil','Datos actualizados con éxito ');
      this.get_data_this_user();
      }
    },err=>{
      console.log(err);
      this.createNotification('error','Error al iniciar sesión: ',err.error.message);
    });
  }

  nuevoRegistroDatosUsuarios(data){
    this.gestionClientes.nuevoRegistroDatosUsuarios(data).subscribe(respuesta=>{
      if (respuesta) {
      console.log("respuesta")
      this.createNotification('Success','Perfil','Datos Ingresados con éxito ');
      this.get_data_this_user();
      }
    },err=>{
      console.log(err);
      this.createNotification('error','Error al iniciar sesión: ',err.error.message);
    });
  }




// notificacion
createNotification(type1: string,type2:string,type3:string): void {
  this.notification.create(
    type1,
    type2,
    type3
  );

}


}








