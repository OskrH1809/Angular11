import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GestionUsuariosService } from 'src/app/auth/services/gestion-usuarios.service';
import { Autentificacion } from 'src/app/core/interceptors/autentificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

   
    this.aut.login_check(this.validateForm.value).subscribe(data => {
      // console.log(data);
      if (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user',this.validateForm.value.username)
      }
      this.router.navigateByUrl('/cards');
     });

    // 

   
  }

  constructor(private router:Router,private aut:GestionUsuariosService,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // remember: [true]
    });
  }


 
}
