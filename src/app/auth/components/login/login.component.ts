import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GestionUsuariosService } from 'src/app/auth/services/gestion-usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  helper = new JwtHelperService();
  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }


    this.aut.login_check(this.validateForm.value).subscribe(data => {

      const decodeToken = this.helper.decodeToken(data.token)

      const  user =  {
        "nombre": decodeToken.username,
        "role": decodeToken.roles,
      }

      localStorage.setItem('token', data.token);
      // localStorage.setItem('user',decodeToken.username)
      // localStorage.setItem('usuario', JSON.stringify(user))


          this.router.navigate([''])
        .then(() => {
        window.location.reload();
        });


      // this.router.navigateByUrl('/cards', { skipLocationChange: true });


     },err=>{
      console.log(err);
      this.createNotification('error','Iniciar sesión : ','Error al iniciar sesión');
      this.createNotification('error','error: ',err.error.message);
    })

    //


  }

  constructor(
    private router:Router,
    private aut:GestionUsuariosService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    )
    {

    }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // remember: [true]
    });
  }
// notificaciones
createNotification(type1: string,type2:string,type3:string): void {
  this.notification.create(
    type1,
    type2,
    type3
  );

}



}
