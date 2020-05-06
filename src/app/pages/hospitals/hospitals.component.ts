import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals:Hospital[] = []
  since:number = 0
  total:number 
  loading:boolean=true

  constructor(public hospitalService:HospitalService, public modalService:ModalUploadService) { }

  ngOnInit() {
    this.getHospitals()
    this.modalService.event.subscribe(resp => this.getHospitals())

  } 

  Since(num:number){
    
    let desde = this.since + num
    
    if(desde < 0) return
    if(desde >= this.total) return

    this.since += num
    this.getHospitals()


  }

  getHospitals(){
    this.loading = true
    this.hospitalService.getHospitals(this.since).subscribe((resp:any) => {
      this.total = resp.total
      this.hospitals = resp.hospitalDB
      this.loading = false
    
    })

  }

  createUser(){
    // this.modalCreate.openModal()
    Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      icon: 'warning',
      text: "Ingrese nombre del hospital",
      showCancelButton: true,
      confirmButtonText: 'Crear',
      showLoaderOnConfirm: true
    }).then((result) => {
      this.hospitalService.createHospital(result.value).subscribe()
      this.getHospitals()
    })
  }

  updateHospital(hospital:Hospital){

    this.hospitalService.updateHospital(hospital).subscribe(resp => {console.log(resp);
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
      confirmButtonText: 'Yes, delete it!'
    }).then( result => {
      if (result.value) {
        
        this.hospitalService.deleteHospital(id).subscribe(resp =>{
            this.getHospitals()          
        })

      }
    })
    
  }

  search( value:string ){
    this.loading = true
    console.log(value);
    
    if(value.length <= 0){
      this.getHospitals()
      return
    }

    this.hospitalService.searchHospital(value).subscribe( (hospitals:Hospital[])=>{
      this.hospitals = hospitals
      this.loading = false
    })

  }

  viewModal(hospital:Hospital){
    this.modalService.viewModal('hospitals', hospital._id)
  }

}
