import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service'
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  hidden: string = ''
  uploadImage: File
  imgTemp: string | ArrayBuffer

  constructor(public modalService: ModalUploadService, public uploadImageService: UploadImageService) { }

  ngOnInit() {
  }

  change(file) {

    if (!file) {
      this.uploadImage = null
      return;
    }

    if (file.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El archivo seleccionado no es una imagen', 'error')
      this.uploadImage = null
    }

    this.uploadImage = file

    let reader = new FileReader()
    let urlTempImg = reader.readAsDataURL(file)

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }

  }

  close() {

    this.imgTemp = null
    this.uploadImage = null

    this.modalService.closeModal()

  }

  upload() {

    this.uploadImageService.uploadImage(this.uploadImage, this.modalService.type, this.modalService.id)
      .then(resp => {
        
        this.modalService.closeModal()
        this.close()
        this.modalService.event.emit(resp)

      })
      .catch(resp => {
        console.log('error cargando imagen ... ');

      })

  }

}
