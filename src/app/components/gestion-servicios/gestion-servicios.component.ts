import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}
@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.component.html',
  styleUrls: ['./gestion-servicios.component.css']
})
export class GestionServiciosComponent implements OnInit {
  mesActual= moment().format('M').toString();
  id:string;
  form: any;


  constructor( private route: ActivatedRoute,private _location: Location,private modalService: NgbModal, private formBuilder:FormBuilder) { }

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
        id: `1 `,
        name: `canales`,
        age: `12`,
        address: `morazan`
      }
      // {
      //   id: `${this.i}`,
      //   name: `${this.form.value.name}`,
      //   age: `${this.form.value.age}`,
      //   address: `${this.form.value.address}`
      // }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get("id");

    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
      age: ['',Validators.required],
      address: ['',Validators.required]

    });
    this.addRow();

  }

  send():any{
    console.log(this.form.value.name);
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
      name: ['',[Validators.required]],
      age: ['',Validators.required],
      address: ['',Validators.required]

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
