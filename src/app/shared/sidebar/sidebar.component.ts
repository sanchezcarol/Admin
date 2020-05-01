import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from 'src/app/services/service.index';
declare function init_plugins()

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userService:UserService, private _sidebar:SidebarService) { }

  ngOnInit() {
    init_plugins();
  }

  logout(){
    this.userService.logout()
  }

}
