import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users : User[] = []
  since: number = 0
  total: number = 0
  loading: boolean = true

  constructor( public userService:UserService, public modalService:ModalUploadService) { }

  ngOnInit() {
    this.getUsers()
    this.modalService.event.subscribe(resp => this.getUsers())
  }

  getUsers(){
    this.loading = true
    this.userService.getUsers(this.since).subscribe((resp:any) => {
      this.total = resp.total
      this.users = resp.users      
      this.loading = false
    })
  }

  Since(num:number){
    
    let desde = this.since + num
    
    if(desde < 0) return
    if(desde > this.total) return

    this.since += num
    this.getUsers()


  }

  search( value:string ){
    this.loading = true
    if(value.length <= 0){
      this.getUsers()
      return
    }
    this.userService.searchUser(value).subscribe( (users:User[])=>{
      this.users = users
      this.loading = false
    })

  }

  deleteUser(user){
  
    if(user._id === this.userService.user._id){
      Swal.fire('Error', 'No se puede eliminar a sí mismo','error')
      return
    }

    Swal.fire({
      title: 'Estás seguro de eliminar a : '+ user.email +'?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(63, 197, 85)',
      cancelButtonColor: 'rgb(224, 70, 70)',
      confirmButtonText: 'Yes, delete it!'
    }).then( result => {
      if (result.value) {
        
        this.userService.deleteUser(user._id).subscribe(resp =>{
            this.getUsers()          
        })

      }
    })
  }

  editUser(user:User){

    this.userService.updateUser(user).subscribe()

  }

  viewModal(user:User){
    this.modalService.viewModal('users', user._id)
  }

}
