import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _URL_ } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { User } from 'src/app/models/user.model';
import { UploadImageService } from '../uploadImage/upload-image.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User
  token: string
  menu: any[] = []

  constructor(public http: HttpClient, public uploadImage: UploadImageService) { this.updateStorage() }

  updateStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
      this.user = JSON.parse(localStorage.getItem('user'))
      this.menu = JSON.parse(localStorage.getItem('menu'))
    }
    else {
      this.token = '';
      this.user = null
      this.menu = []

    }
  }

  logout() {
    this.user = null
    this.token = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('menu')

    window.location.href = '#/login'
  }

  loggedIn() {
    return (this.token.length > 5 ? true : false)
  }

  saveStorage(id, token, user, menu) {

    localStorage.setItem('id', id)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('menu', JSON.stringify(menu))

    this.user = user
    this.token = token
    this.menu = menu
  }

  createUser(user: User) {

    let url = _URL_ + '/user'

    return this.http.post(url, user)
      .pipe(
        map((resp: any) => {
          Swal.fire('Usuario creado exitosamente', user.email, 'success')
          return resp.user
        }),
        catchError(err => {
          Swal.fire( 'Error Registrando Usuario', err.error.errors.message, 'error' );
          return Observable.throw( err );
        })
        )
  }

  loginUser(user: User, recuerdame: boolean = false) {

    if (recuerdame) localStorage.setItem('email', user.email)
    else localStorage.removeItem('email')

    let url = _URL_ + '/login'

    return this.http.post(url, user)
      .pipe(map((resp: any) => {

        this.saveStorage(resp.id, resp.token, resp.userDB, resp.menu)
        Swal.fire('Bienvenido', user.email, 'success')
        return true
      }),
      catchError(err => {
        Swal.fire( 'Error en el login', err.error.mensaje, 'error' );
        return Observable.throw( err );
      })
      )

  }

  renewToken(){
    
    let url = _URL_+'/login/renewToken?token='+this.token

    return this.http.get(url).pipe(
      map((resp:any) => {
        this.token = resp.token    
        localStorage.setItem('token', this.token)
      }),
      catchError(err => {
        Swal.fire( 'Error en la renovación del token','', 'error' );
        return Observable.throw( err );
      })
    )
  }

  loginGoogle(token) {
    let url = _URL_ + '/login/google'

    return this.http.post(url, { token })
      .pipe(map((resp: any) => {

        this.saveStorage(resp.id, resp.token, resp.user, resp.menu)

        return true
      }))



  }

  updateUser(user: User) {

    let url = _URL_ + '/user/' + user._id
    url += '?token=' + this.token

    return this.http.put(url, user).pipe(

      map((resp: any) => {

        if (user._id === this.user._id) {
          this.saveStorage(resp.saveUser._id, this.token, resp.saveUser, this.menu)
        }

        Swal.fire('Usuario actualizado exitosamente', user.name, 'success')

        return true
      }),
      catchError(err => {
        Swal.fire( 'Error Actualizando Usuario','Su modificación no ha podido ser realizada', 'error' );
        return Observable.throw( err );
      })
    )

  }

  changeImage(img: File, id: string) {

    this.uploadImage.uploadImage(img, 'users', id)
      .then((resp: any) => {

        this.user.img = resp.userSave.img
        this.saveStorage(resp.userSave._id, this.token, this.user, this.menu)
        Swal.fire('Imagen Actualizada', '', 'success')

      })
      .catch(resp => {

        Swal.fire('No se pudo actualizar la imagen', 'oops', 'warning')
      })
  }

  getUsers(since: number) {

    let url = _URL_ + '/user?since=' + since

    return this.http.get(url)
  }

  searchUser(value: string) {

    let url = _URL_ + '/search/coleccion/users/' + value

    return this.http.get(url).pipe(
      map((resp: any) => { return resp.users })
    )

  }

  deleteUser(id: string) {

    let url = _URL_ + '/user/' + id
    url += '?token=' + this.token

    return this.http.delete(url)
      .pipe(map(resp => {
        Swal.fire(
          'Elimado!',
          'Usuario eliminado correctamente',
          'success'
        )
        return resp
      }))


  }

}
