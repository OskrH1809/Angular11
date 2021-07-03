import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  isPasswordVisible = true;
  disableInput = true;
  oscar='hoscar161@gmail.com';

  ngOnInit(): void {

  }
  constructor(private fb: FormBuilder) {


    this.validateForm = this.fb.group({
      email: [{ disabled: this.disableInput, value: `${this.oscar}` }],
      password: ['',],
      confirm: ['', [this.confirmValidator]]
    });

    this.validateForm2 = this.fb.group({
      cuenta: [],
      telefono: [],
      direccion: [],

    });
  }

  validateForm: FormGroup;
  submitForm(value: { userName: string; email: string; password: string; confirm: string; comment: string }): void {
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
    submitForm2(value: { userName: string; email: string; password: string; confirm: string; comment: string }): void {
      for (const key in this.validateForm2.controls) {
        this.validateForm2.controls[key].markAsDirty();
        this.validateForm2.controls[key].updateValueAndValidity();
      }
      console.log(value);
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












}








