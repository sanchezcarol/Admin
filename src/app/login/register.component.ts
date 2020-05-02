import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

declare function init_plugins()

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup

  constructor(public userService:UserService, public router:Router) { }

  equals(campo1:string, campo2:string){
    return (group:FormGroup) =>{

      let pass1 = group.controls[campo1].value
      let pass2 = group.controls[campo2].value

      if(pass1===pass2){
        return null
      }

      return {
        equals:true
      };
    };
  }

  ngOnInit() {
    init_plugins()
    this.form = new FormGroup({
      name: new FormControl( null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condition: new FormControl(false)
    }, { validators: this.equals('password','password2') }) 
  }

  registrarUsuario(){

    if(this.form.invalid) return;
    if(!this.form.value.condition) {
      Swal.fire("Importante", "Debe aceptar las condiciones!", "warning");
      return
    }

    console.log('',this.form.valid ,this.form.value);

    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    )
    
    this.userService.createUser(user).subscribe(resp => this.router.navigate(['/login']) )

  }


}
