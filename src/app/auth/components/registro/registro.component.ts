import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Observer } from 'rxjs';
import { GestionUsuariosService } from 'src/app/auth/services/gestion-usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {



  ngOnInit(): void {
  }


  validateForm: FormGroup;

  submitForm(value: { email: string; password: string; confirm:string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    console.log(value);
    const datos = { email:value.email, password:value.password}
    this.servicelogin.sendPostRegistro(datos).subscribe(
    res => {
      console.log(res);

      if (res.email== value.email) {
        this.createNotification('success','Usuario: '+`${value.email}`,'Registrado con éxito');
        this.router.navigate([''])
      }


    },err=>{
      console.log(err);
      this.createNotification('error','Registro: ','Error al registrarse');
      this.createNotification('error','error: ',err.error);
    });

  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor( private router:Router,private notification: NzNotificationService,private servicelogin:GestionUsuariosService ,private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
  }


      // notificaciones
      createNotification(type1: string,type2:string,type3:string,): void {
      this.notification.create(
        type1,
        type2,
        type3,
        { nzDuration:12000 }
      );

    }


}


