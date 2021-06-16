import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzNotificationService } from 'ng-zorro-antd/notification';


interface ItemData {
  id: string;
  servicio: string;
  precio: string;
  disabled: boolean


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
  Nombre;
  id: any;



  deleteRow(id: string,nombre:string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
    this.createNotification('warning','Cliente: '+`${nombre}`,'Eliminado con éxito');

  }
  //


  fatrash = faTrash;
  faedit=faEdit;
  constructor(private notification: NzNotificationService,private modalService: NgbModal,private _location: Location, private formBuilder:FormBuilder,private route: ActivatedRoute ) { }
  public form: FormGroup;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    // this.getServicios();
    console.log(this.id);
  }

  // getServicios(){
  //  this.service.get_serviciosxUsuario(this.id)
  //  .subscribe( values => {
  //    this.listOfData= values;
  //    this.Nombre = values[0].Nombre;
  //   console.log(values);
  // } );
  // }

  backClicked() {
    this._location.back();
  }

  // modal
    // Modal
    closeModal: string;
    triggerModal(content) {
      this.modalService.open(content,

       {size:'xl',ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
      }, (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
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


//
agregarServicio(array){
console.log(this.listOfData)
console.log(array)
this.listOfData= this.listOfData.concat(array);



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
// modal ng zorro
isVisible = false;



  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  // select estado
  optionList = [
    { label: 'Lucy', value: 'lucy', age: 20 },
    { label: 'Jack', value: 'jack', age: 22 }
  ];
  // selectedValue = { label: 'Jack', value: 'jack', age: 22 };
  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  log(value: { label: string; value: string; age: number }): void {
    console.log(value);
  }

}
