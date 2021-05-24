import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
interface ItemData {
  id: string;
  nombre: string;
  precio: string;
  estado: string;
  clienteNombre:string;
}
@Component({
  selector: 'app-creacion-servicios',
  templateUrl: './creacion-servicios.component.html',
  styleUrls: ['./creacion-servicios.component.css']
})
export class CreacionServiciosComponent implements OnInit {

  // tabla
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
        precio: `${this.form.value.precio}`,
        estado: `${this.form.value.estado}`,
        clienteNombre: `${this.form.value.clienteNombre}`,

      }
    ];
    console.log(this.form.value.nombre);
    this.i++;
  }

  deleteRow(id: string): void {
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

  //  formulario modal
validateForm: FormGroup;
submitForm(value: { userName: string; }): void {
  for (const key in this.validateForm.controls) {
    this.validateForm.controls[key].markAsDirty();
    this.validateForm.controls[key].updateValueAndValidity();
  }
  console.log(value);

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
  constructor(private fb: FormBuilder,private modalService: NgbModal,private http: HttpClient,private _location: Location, private formBuilder:FormBuilder) {







    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],

    });





   }


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      precio: ['',Validators.required],
      estado: ['',Validators.required],
      clienteNombre: ['',Validators.required]

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



}
