import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}
@Component({
  selector: 'app-listados-se',
  templateUrl: './listados-se.component.html',
  styleUrls: ['./listados-se.component.css']
})
export class ListadosSeComponent implements OnInit {


  // tabla
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }
  //


  fatrash = faTrash;
  faedit=faEdit;
  constructor(private _location: Location, private formBuilder:FormBuilder) { }
  public form: FormGroup;
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
  backClicked() {
    this._location.back();
  }



}
