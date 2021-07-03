import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IDropdownSettings } from 'ng-multiselect-dropdown';import { CreacionServiciosService } from 'src/app/Services/creacion-servicios.service';
import { GestionServiciosService } from 'src/app/Services/servicios/gestion-servicios.service';
// import { ServiciosService } from 'src/app/Services/servicios.service';
interface ItemData {
  date: string
  id: string;
  name: string;
  price: string;


}
@Component({
  selector: 'app-creacion-servicios',
  templateUrl: './creacion-servicios.component.html',
  styleUrls: ['./creacion-servicios.component.css']
})
export class CreacionServiciosComponent implements OnInit {

  // tabla
  value:string;
  indice:any;
  buscar;



  editId: string | null = null;
  listOfData:any = [];
  i ;
  nuevoClienteSelect: { userName: string; };

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(id,nombre,precio): void {
    this.editId = null;
    this.actualizacionServicio(id,nombre,precio);

  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,


    ];
    this.CrearServicio();

    this.i++;


  }

  deleteRow(id: string,nombre:string): void {
    this.EliminacionServicio(id)
    this.get_serviciosall(this.buscar);


  }

  // tabla ^




  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }




  //  formulario modal
validateForm: FormGroup;
submitForm(value: { userName: string; }): void {
  for (const key in this.validateForm.controls) {
    this.validateForm.controls[key].markAsDirty();
    this.validateForm.controls[key].updateValueAndValidity();
  }
  console.log(value);
  this.clientes.push(value.userName);

}


userNameAsyncValidator = (control: FormControl) =>
new Observable((observer: Observer<ValidationErrors | null>) => {
  setTimeout(() => {
    if (control.value === 'JasonWood') {
      // you have to return `{error: true}` to mark it as an error event
      observer.next({ error: true, duplicated: true });
    } else {
      observer.next(null);
    }
    observer.complete();
  }, 1000);
});


//  formulario modal ^


  // select
  // randomUserUrl = 'https://api.randomuser.me/?results=10';
  optionList: string[] = [];
  selectedUser = null;
  isLoading = false;


  // getRandomNameList: Observable<string[]> = this.http
  // .get(`${this.randomUserUrl}`)
  // .pipe(map((res: any) => res.results))
  // .pipe(
  //   map((list: any) => {
  //     return list.map((item: any) => `${item.name.first}`);
  //   })
  // );

// loadMore(): void {
//   this.isLoading = true;
//   this.getRandomNameList.subscribe(data => {
//     this.isLoading = false;
//     this.optionList = [...this.optionList, ...data];
//   });
// }
// clientes
isSubmitted = false;
clientes: any = ['oscar', 'canales', 'hernandez', 'alberto']


// select ^
public form: FormGroup;
  constructor(
    private notification: NzNotificationService,

    private fb: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient,
    private _location: Location,
    private formBuilder:FormBuilder,
    private servicio : GestionServiciosService

  ){






    // this.validateForm = this.fb.group({
    //   userName: ['', [Validators.required], [this.userNameAsyncValidator]],

    // });





   }

  // peticion post servicios
  servicios: any;
  // peticion post ^

  CrearServicio(){
    // peticion post
    const nuevoServicio ={ name: `${this.form.value.nombre}`, price: `${this.form.value.precio}`, }
    // peticion post ^

    this.servicio.sendPost(nuevoServicio).subscribe(
      res => {
      console.log(res);
      if (res) {
      this.createNotification('success','Servicio: '+`${this.form.value.nombre}`,'Agregado con éxito');
      this.get_serviciosall(this.buscar);
      }
    },err=>{
      console.log(err);
      this.createNotification('error','Error al crear servicio: ',err);
    });


  }
// peticcion delete servicios
  EliminacionServicio(id){
    this.servicio.deleteServicio(id).subscribe(
      res=>{
        console.log(res);
        if (res) {
          this.createNotification('warning','Servicio: ','Eliminado con éxito');
        }


    },err=>{
      console.log(err);
      this.createNotification('error','Error al eliminar servicio: ',err);
    }
    );

  }
  // peticcion delete servicios ^

  // peticcion put servicios

  actualizacionServicio(id,nombre,precio){
    const data = {name:nombre, price: precio }
    console.log(data);
    this.servicio.updateServicio(id,data).subscribe(
      resp=>{
        console.log(resp);
        if (resp) {
          this.createNotification('info','Servicio: ','Servicio actualizaddo con éxito');

        }
      },err=>{
        console.log(err);
        this.createNotification('error','Error al actualizar servicio: ',err);
      }
      )

  }

    // peticcion put servicios ^







  // multiselect
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  //
  ngOnInit(): void {
    console.log(this.value);
    this.getIndice();
    this.get_serviciosall(this.buscar);

    // multiselect
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 3

    };
    //


    this.form = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      precio: ['',Validators.required],


    });
    // select
    // this.loadMore();
    // select ^
  }
  changeCity(e) {
    console.log(e.value)
    this.clienteNombre.setValue(e.target.value, {
      onlySelf: true
    })
  }
  get clienteNombre() {
    return this.form.get('clienteNombre');
  }


  onSubmit() {
    this.isSubmitted = true;
    if (!this.form.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.form.value))
    }

  }


  send():any{
    console.log(this.form.value);

  }



  // modal
  closeModal: string;
  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  clearModal(){
    // this.formModal = this.form2.group({
    //   name: ['',[Validators.required]],
    // });
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
  data_serviciosall:any;
    //getSearchServices
  get_serviciosall(buscar){

      if (buscar) {
        this.servicio.getSearchServices(this.value).subscribe(data => {
          this.listOfData = data;
            console.log(data);
        },err=>{
          console.log(err);
          this.createNotification('error','Error al obtener los servicios: ',err);
        });
      } else {
        this.servicio.get_servicios().subscribe(data => {
          // this.indice = data.pop()['id'] +1;
          this.listOfData = data;
            console.log(data);
        },err=>{
          console.log(err);
          this.createNotification('error','Error al obtener los servicios: ',err);
        });
      }

    }

    getIndice(){
      this.servicio.get_servicios().subscribe(data => {

        if(data){
          this.i = data.pop().id + 1;
        }
      //
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

  EnterSubmit(evento){
    if(evento.keyCode === 13){
     this.buscar=this.value
    this.get_serviciosall(this.buscar);
  }


  }

  cancelarBusqueda(){
    const buscar=null;
    this.value=''
    this.get_serviciosall(buscar);
  }

}






