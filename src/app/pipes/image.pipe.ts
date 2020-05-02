import { Pipe, PipeTransform } from '@angular/core';
import { _URL_ } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  
  
  transform(img:string, tipo:string = 'users'): any {
  
    let url = _URL_+'/images'
    console.log(img);
    
    if(!img){
      return url += '/users/xxx'
    }

    if(img.indexOf('https') >= 0){
      return img
    }

    switch (tipo) {
      
      case 'users': 
      url += '/users/'+img
      break;

      case 'medics': 
      url += '/medics/'+img
      break;

      case 'hospitals': 
      url += '/hospitals/'+img
      break;

      default:
        console.log('Tipo no existe');
        url += '/users/xxx'
        break;
    }

    return url


  }

}
