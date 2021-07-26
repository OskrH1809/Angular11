import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrlF = environment.baseURLF;

@Injectable({
  providedIn: 'root'
})
export class GestionServiciosContratadosService {
  constructor(private http: HttpClient) { }
  usuario = localStorage.getItem('usuario');
  headers = new HttpHeaders();
  bloqueador :boolean;




  getServiciosContratadosByUser(): Observable<any> {
    return this.http.get(`${baseUrlF}/api/services_by_user`);
    //
  }

  getServiciosContratadosAll(): Observable<any> {
    return this.http.get(`${baseUrlF}/api/contrated_services`);
    //
  }

  registrarNuevosServicios(data) {
    return this.http.post(`${baseUrlF}/api/new_contrated`, data);
  }

  registrarNuevosServiciosOpcional(data) {
    return this.http.post(`${baseUrlF}/api/new_contrated_optional`, data);
  }

  getClientesDeServicios(idServicio) {
    return this.http.get(`${baseUrlF}/api/clientes_de_servicio/${idServicio}`);
  }

  getServiciosContratadosUsuarioEspecifico(data: string): Observable<any> {

    return this.http.get(`${baseUrlF}/api/servicios_contratados_usuario_especifico/${data}`,);
  }


  updateEstadoServicioContratado(id, data): Observable<any> {
    return this.http.put(`${baseUrlF}/api/editestado/${id}`, data);
  }

  cambiarPeriodoPagoServicioContratado(data): Observable<any> {
    return this.http.put(`${baseUrlF}/api/periodo_pago`, data);
  }


  postDocumentServiceContracted(data: any): Observable<any> {
    return this.http.post(`${baseUrlF}/api/documents`, data);
  }

  getDocumentsServiceContracted(): Observable<any> {
    return this.http.get(`${baseUrlF}/api/documents`,);
  }

  activarServicioContratado(data) {
    return this.http.put(`${baseUrlF}/api/activar_servicio_contratado`, data);
  }

  desactivarServicioContratado(data) {
    return this.http.put(`${baseUrlF}/api/desactivar_servicio_contratado`, data);
  }


  // Tareas

  newTareas(data: any): Observable<any> {
    return this.http.post(`${baseUrlF}/api/tareas`, data);
  }

  tareasUsuarioEspecifico(): Observable<any> {
    return this.http.get(`${baseUrlF}/api/tareas_especificas_usuario`);
  }

  editarTarea(data: any) {
    return this.http.put(`${baseUrlF}/api/tareas`, data);
  }

  eliminarTarea(data) {

    return this.http.delete(`${baseUrlF}/api/tareas/${data}`,);
  }

  getOneDocumentSpecific(usuario, tipo, servicioContratado) {
    return this.http.get(`${baseUrlF}/api/documents/${usuario}/${tipo}/${servicioContratado}`);
  }


  getTareasEspeficas(usuario, servicio: string) {
    return this.http.get(`${baseUrlF}/api/tareas_especificas/${usuario}/${servicio}`);
  }

  actualizarEstadoTarea(data) {
    return this.http.put(`${baseUrlF}/api/tareas_actualizar_estado`, data);
  }

  ingresarHorasTarea(data){
    return this.http.put(`${baseUrlF}/api/tareas_ingresar_horas`, data);
  }

  getTareasAll(){
    return this.http.get<any>(`${baseUrlF}/api/get_all_task`);

  }

}
