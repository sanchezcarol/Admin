import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _URL_ } from 'src/app/config/config';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Medic } from 'src/app/models/medic.model';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  constructor(public http:HttpClient, public userService:UserService) { }

  getMedics(since:number){
    let url = _URL_+'/medic?since='+since
    return this.http.get(url)
  }

  getMedic(id:string){
    let url = _URL_+'/medic/'+id
    return this.http.get(url)
  }

  createMedic(medic:Medic){

    let url = _URL_+'/medic'

    if(medic._id){
      //Update
      console.log(medic);
      
      url+= '/'+medic._id+'?token='+this.userService.token
      return this.http.put(url,medic).pipe(
        map(result => {
          Swal.fire('Médico Actualizado',name,'success')
          return result
        })
      )
      
    }
    else{
      //Create
      url += '?token='+this.userService.token
      return this.http.post(url,medic).pipe(
        map(result => {
          Swal.fire('Médico Creado Correctamente',name,'success')
          return result
        })
      )

    }



  }

  searchMedic(value:string){

    let url = _URL_+'/search/todo/'+value
    url += '?token='+this.userService.token

    return this.http.get(url).pipe(map((resp:any)=>{
      
      return resp.medics
    }))
  }

  deleteMedic(id:string){

    let url = _URL_+'/medic/'+id
    url+='?token='+this.userService.token

    return this.http.delete(url).pipe(map(resp => {
      Swal.fire(
        'Elimado!',
        'Médico eliminado correctamente',
        'success'
      )
      return true
      }))
    }


}
