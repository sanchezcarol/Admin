import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

//declare function init_plugins()

export class SidebarService {

  menu : any[] = []

  // menu : any = [
  //   {
  //     titulo: 'Principal',
  //     icon: 'mdi mdi-gauge',
  //     submenu:[
  //       { titulo: 'ProgressBar', url:'/progress'},
  //       { titulo: 'Dashboard', url:'/dashboard'},
  //       { titulo: 'Promesas', url: '/promesas'},
  //       { titulo: 'Graphics1', url: '/graphics1'},
  //       { titulo: 'Rxjs', url: '/rxjs'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu:[
  //       { titulo: 'Medicos', url:'/medics'},
  //       { titulo: 'Hospitales', url:'/hospitals'},
  //       { titulo: 'Usuarios', url: '/users'}
  //     ]
  //   }
  // ]

  constructor(public userService: UserService) { }

  cargarMenu(){
    this.menu = this.userService.menu
  }
}
