import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, MedicService } from 'src/app/services/service.index';
import { Medic } from 'src/app/models/medic.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: []
})
export class MedicComponent implements OnInit {

  hospitals:Hospital[] = []
  medic:Medic = new Medic('',null,'','','')  
  hospital: Hospital

  constructor( 
    public medicService:MedicService, 
    public hospitalService:HospitalService, 
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public modalUpload:ModalUploadService) 
    { 
        activatedRoute.params.subscribe(params => {
          let id = params['id']
          if(id !== 'new') this.getMedic(id)
        }) 
    }

  ngOnInit() {
    this.hospitalService.getHospitals().subscribe( (resp:any) => {
      this.hospitals = resp.hospitalDB
    })
    this.modalUpload.event.subscribe(resp => this.medic.img = resp.medicSave.img )
    
  }

  createMedic(){

    this.medicService.createMedic(this.medic).subscribe((resp:any) => {      
      this.medic._id = resp.saveMedic._id      
      this.router.navigate(['/medic',this.medic._id])
    })
    
  }

  getHospital(id){
        
    this.hospitalService.getHospital(id).subscribe((resp:any) => {
      this.hospital = resp.hospital      
    })
  }

  chanceImage(){
    this.modalUpload.viewModal('medics',this.medic._id)
  }

  getMedic(id){
    this.medicService.getMedic(id).subscribe((resp:any) => {
      
      this.medic = resp.medic
      this.medic.hospital = resp.medic.hospital._id
      
    })
  }

}
