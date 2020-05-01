import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins()
declare const gapi:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  auth2:any
  recuerdame:boolean = false
  email : string
  constructor(private router:Router, public userService:UserService) { }

  ngOnInit() {
    init_plugins()
    this.initGoogle()
    this.email = localStorage.getItem('email') || ''
    if(this.email.length >  1) this.recuerdame = true
  }

  initGoogle(){

     gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '688971148451-932hks33fplelbdm23gn49msj2ig2sqv.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        })

        this.attachSignin(document.getElementById('btn-google'))
     })

  }


  attachSignin(element){

    this.auth2.attachClickHandler(element, {}, googleUser => {

      //var profile = googleUser.getBasicProfile()
      let token = googleUser.getAuthResponse().id_token

      this.userService.loginGoogle(token).subscribe( () => window.location.href= '#/dashboard')
      
    })
  }


  ingresar(form:NgForm){
   
    if(form.invalid) return;

    let user = new User(null, form.value.email,form.value.password)

    this.userService.loginUser(user, form.value.recuerdame)
        .subscribe(resp => this.router.navigate(['/dashboard']))
  }
}
