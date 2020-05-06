import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { MedicService } from 'src/app/services/service.index';
import { Medic } from 'src/app/models/medic.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html'
})
export class MedicsComponent implements OnInit {

  since:number = 0
  total:number = 0
  loading:boolean = true
  medics:Medic[] = []

  constructor(public modalService:ModalUploadService, public medicService:MedicService) { }

  ngOnInit() {
    this.getMedics()
    this.modalService.event.subscribe(resp => this.getMedics())

  } 

  Since(num:number){
    
    let desde = this.since + num
    
    if(desde < 0) return
    if(desde >= this.total) return

    this.since += num
    this.getMedics()


  }

  getMedics(){
    this.loading = true
    this.medicService.getMedics(this.since).subscribe((resp:any) => {
      this.total = resp.total
      this.medics = resp.medicsDB
      this.loading = false       
    })

  }

  createMedic(){

    Swal.fire({
      title: 'Crear Médico',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      icon: 'warning',
      text: "Ingrese nombre",
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true
    }).then((result) => {
      this.medicService.createMedic(result.value).subscribe(resp => console.log(resp)
      )
      this.getMedics()
    })
    
  }


  delete(id:string){    

    Swal.fire({
      title: 'Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(63, 197, 85)',
      cancelButtonColor: 'rgb(224, 70, 70)',
      confirmButtonText: 'Eliminar'
    }).then( result => {
      if (result.value) {
        
        this.medicService.deleteMedic(id).subscribe(resp =>{
            this.getMedics()      
        })

      }
    })
    
  }

  search( value:string ){
    this.loading = true
    
    if(value.length <= 0){
      this.getMedics()
      return
    }

    this.medicService.searchMedic(value).subscribe( (medics:Medic[])=>{
      this.medics = medics 
      this.loading = false
    })

  }
}
