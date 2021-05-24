import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';

interface ItemData {
  id: string;
  nombre: string;
  apellido: string;
  direccion: string;
}
@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.css']
})
export class GestionClientesComponent implements OnInit {
  form: any;

  constructor(private _location: Location,private modalService: NgbModal, private formBuilder:FormBuilder) { }

  i = 1;
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
        nombre: `${this.form.value.nombre}`,
        apellido: `${this.form.value.apellido}`,
        direccion: `${this.form.value.direccion}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      apellido: ['',Validators.required],
      direccion: ['',Validators.required]

    });
  }

  send():any{
    console.log(this.form.value.nombre);
  }
  // Modal
  closeModal: string;
  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  clearModal(){
    this.form = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      apellido: ['',Validators.required],
      direccion: ['',Validators.required]

    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  backClicked() {
    this._location.back();
  }


}
