import { Injectable, ViewChild } from '@angular/core';
import { _URL_ } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( public http:HttpClient, public userService:UserService) { }

  getHospitals(since?){

    let url = _URL_+'/hospital?since='+since

    return this.http.get(url)
  }

  getHospital(id:string){

    let url = _URL_+'/hospital/'+id

    return this.http.get(url)
  }

  updateHospital(hospital:Hospital){

    let url = _URL_+'/hospital/'+hospital._id+'?token='+this.userService.token
    return this.http.put(url,hospital)
    
  }

  createHospital(name:string){

    let url = _URL_+'/hospital'
    url+='?token='+this.userService.token
    console.log(this.userService.user);
    
    return this.http.post(url,{name}).pipe(
      map(resp => {
        Swal.fire('Usuario Creado Correctamente',name,'success')
        return resp
      })
    )

  }

  deleteHospital(id:string){

    let url = _URL_+'/hospital/'+id
    url+='?token='+this.userService.token

    return this.http.delete(url).pipe(map(resp => {
      Swal.fire(
        'Elimado!',
        'Hospital eliminado correctamente',
        'success'
      )
      return true
      }))
    }

    searchHospital(value:string){

      let url = _URL_+'/search/todo/'+value
      url += '?token='+this.userService.token

      return this.http.get(url).pipe(map((resp:any=[])=>{
        console.log(resp);
        
        return resp.hospitales
      }))


    }
}
