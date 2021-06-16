import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { GestionClientesService } from 'src/app/shared/services/gestion-clientes.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface ItemData {
  id: string;
  email: string;
}
@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.css']
})
export class GestionClientesComponent implements OnInit {
  form: any;

  constructor(private notification: NzNotificationService,
    private userService:GestionClientesService,private _location: Location,private modalService: NgbModal, private formBuilder:FormBuilder) { }

  i = 1;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(nombre): void {
    this.editId = null;
    this.createNotification('info','Cliente: '+`${nombre}`,'Actualizado con éxito');


  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        email: `${this.form.value.email}`,
        
      }
    ];
    this.createNotification('success','Cliente: '+`${this.form.value.nombre}`,'Agregado con éxito');

    this.i++;
  }

  deleteRow(id: string,nombre:string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
    this.createNotification('warning','Cliente: '+`${nombre}`,'Eliminado con éxito');

  }

  ngOnInit(): void {
    this.get_users();
    this.form = this.formBuilder.group({
      email: ['',[Validators.required]],
     


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

  // peticion get de servicios

    get_users(){
      this.userService.get_usersAll().subscribe(data => {
       this.listOfData = data;
       console.log(data);
      //  this.i = data.pop().id + 1;
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
