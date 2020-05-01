import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _URL_ } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:User
  token:string
  
  constructor( public http:HttpClient  ) {  this.updateStorage()  }

  updateStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token')
      this.user = JSON.parse( localStorage.getItem('user') )
    }
    else {
      this.token = '';
      this.user = null
    }
  }

  logout(){
    this.user = null
    this.token = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    window.location.href = '#/login'
  }

  loggedIn(){
    return (this.token.length > 5 ? true : false)
  }

  saveStorage(id,token,user){
    localStorage.setItem('id',id)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    
    this.user = user
    this.token = token
  }

  createUser(user:User){
    
    let url = _URL_+'/user'

    return this.http.post(url,user)
            .pipe(
              map( (resp:any) => {
                Swal.fire('Usuario creado exitosamente', user.email, 'success')
                return resp.user
              })
            )

  }

  loginUser(user:User, recuerdame:boolean = false){

    if(recuerdame) localStorage.setItem('email',user.email)
    else localStorage.removeItem('email')
    
    let url = _URL_+'/login'
    
    return this.http.post(url,user)
                .pipe(map((resp:any) => {

                  this.saveStorage(resp.id,resp.token,resp.user)
                  Swal.fire('Bienvenido',user.email,'success')
                  
                  return true
                }))

  }

  loginGoogle(token){
    let url = _URL_+'/login/google'
    
    return this.http.post(url,{token})
        .pipe(map((resp:any) => {
          this.saveStorage(resp.id,resp.token,resp.user)
          return true
        }))



  }
  

}
