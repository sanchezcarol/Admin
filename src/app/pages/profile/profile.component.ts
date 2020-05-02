import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user:User
  uploadImage: File
  imgTemp: string | ArrayBuffer

  constructor(public userService:UserService) {
    this.user = this.userService.user
   }

  ngOnInit() {
  }

  update(user:User){

    if(!this.user.google)this.user.email = user.email

    this.user.name = user.name
    this.userService.updateUser(this.user).subscribe();
    
    
  }

  change(file){

    if(!file) {
      this.uploadImage = null
      return ;
    }

    if(file.type.indexOf('image')<0){
      Swal.fire('Error', 'El archivo seleccionado no es una imagen', 'error')
      this.uploadImage = null
    }

    this.uploadImage = file

    let reader = new FileReader()
    let urlTempImg = reader.readAsDataURL(file)
    
    reader.onloadend = () =>{
      this.imgTemp = reader.result
    }


  }

  chanceImage(){

    this.userService.changeImage(this.uploadImage,this.user._id)

  }

}
