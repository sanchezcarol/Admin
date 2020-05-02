import { Injectable } from '@angular/core';
import { _URL_ } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor() { }

  uploadImage(file:File, type:string, id:string){

    return new Promise( (resolve,reject) =>{

      let formData = new FormData()
      let xhr = new XMLHttpRequest()
      console.log(file.name);
      
      formData.append('img',file, file.name)

      xhr.onreadystatechange = () => {

        if(xhr.readyState == 4){
          
          if(xhr.status === 200){
            console.log('carga bien');
            resolve( JSON.parse( xhr.response) )
            
          }
          else{
            console.log('mal');
            reject(xhr.response)          
          }

        }
      }

      let url = _URL_ + `/upload/${type}/${id}`

      xhr.open('PUT',url,true)
      xhr.send( formData )


    })




  }
}
