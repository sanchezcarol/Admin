import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu : any = [
    {
      titulo: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu:[
        { titulo: 'ProgressBar', url:'/progress'},
        { titulo: 'Dashboard', url:'/dashboard'},
        { titulo: 'Promesas', url: '/promesas'},
        { titulo: 'Graphics1', url: '/graphics1'},
        { titulo: 'Rxjs', url: '/rxjs'}
      ]
    }
  ]

  constructor() { }
}
