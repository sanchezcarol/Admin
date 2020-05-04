import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  type:string
  id:string
  hidden:string = 'hidden-modal'
  event = new EventEmitter<any>()

  constructor() { }


  closeModal(){

    this.hidden = 'hidden-modal'
    this.type = null
    this.id = null

  }


  viewModal(type:string, id:string){

    this.hidden = ''
    this.type=type
    this.id = id

  }



}
