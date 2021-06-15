import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionUsuariosService } from 'src/app/Services/usuarios/gestion-usuarios.service';

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

    // console.log(this.validateForm.value);
    this.aut.login_check(this.validateForm.value).subscribe(data => {
      // console.log(data);
      localStorage.setItem('token', data.token);

     });

    // 

   
  }

  constructor(private aut:GestionUsuariosService,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      // remember: [true]
    });
  }


 
}
