import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosService } from 'src/app/Services/servicios.service';
import { InfoCardsService } from 'src/app/Services/info-cards.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IDropdownSettings } from 'ng-multiselect-dropdown';import { CreacionServiciosService } from 'src/app/Services/creacion-servicios.service';
interface ItemData {
  id: string;
  nombre: string;
  precio: string;

}
@Component({
  selector: 'app-creacion-servicios',
  templateUrl: './creacion-servicios.component.html',
  styleUrls: ['./creacion-servicios.component.css']
})
export class CreacionServiciosComponent implements OnInit {

  // tabla
  i ;
  editId: string | null = null;
  listOfData: ItemData[] = [];
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
      {
        id: `${this.i}`,
        nombre: `${this.form.value.nombre}`,
        precio: `${this.form.value.precio}`

      }


    ];
    this.CrearServicio();

    this.i++;


  }

  deleteRow(id: string): void {
    this.EliminacionServicio(id)
    this.listOfData = this.listOfData.filter(d => d.id !== id);
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


  // notificacion
  createServicioNotification(): void {
    this.notification
      .blank(
        'Creacion de servicio',
        'El servicio se ha creado correctamente'
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }
  // notificacion

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
  randomUserUrl = 'https://api.randomuser.me/?results=10';
  optionList: string[] = [];
  selectedUser = null;
  isLoading = false;


  getRandomNameList: Observable<string[]> = this.http
  .get(`${this.randomUserUrl}`)
  .pipe(map((res: any) => res.results))
  .pipe(
    map((list: any) => {
      return list.map((item: any) => `${item.name.first}`);
    })
  );

loadMore(): void {
  this.isLoading = true;
  this.getRandomNameList.subscribe(data => {
    this.isLoading = false;
    this.optionList = [...this.optionList, ...data];
  });
}
// clientes
isSubmitted = false;
clientes: any = ['oscar', 'canales', 'hernandez', 'alberto']


// select ^
public form: FormGroup;
  constructor(
    private notification: NzNotificationService,
    private ServiciosService: ServiciosService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient,
    private _location: Location,
    private formBuilder:FormBuilder,
    private servicio :CreacionServiciosService

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
    const nuevoServicio ={ nombre: `${this.form.value.nombre}`, precio: `${this.form.value.precio}`, }
    // peticion post ^
    this.servicio.sendPos(nuevoServicio).subscribe(
      res => {
      console.log(res);
    });
    this.createServicioNotification();
  }
// peticcion delete servicios
  EliminacionServicio(id){
    this.servicio.deleteServicio(id).subscribe(
      res=>{
        console.log(res);
    });
  }
  // peticcion delete servicios ^

  // peticcion put servicios

  actualizacionServicio(id,nombre,precio){
    const data = {nombre:nombre, precio: precio }
    this.servicio.updateServicio(id,data).subscribe(
      resp=>{
        console.log(resp);
      })

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
    this.get_serviciosall();

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
    this.loadMore();
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
    get_serviciosall(){
      this.servicio.get_servicios().subscribe(data => {
       this.listOfData = data;
       console.log(data);
      //  this.i = data.pop().id + 1;
      });
    }


  }






