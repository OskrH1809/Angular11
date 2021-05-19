import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listados-se',
  templateUrl: './listados-se.component.html',
  styleUrls: ['./listados-se.component.css']
})
export class ListadosSeComponent implements OnInit {

  public form: FormGroup;

  fatrash = faTrash;
  faedit=faEdit;
  constructor( private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      precio: ['',Validators.required],
      estado: ['',Validators.required]

    });
  }

  send():any{
    console.log(this.form.value);
  }

}