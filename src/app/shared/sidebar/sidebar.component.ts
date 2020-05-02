import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
declare function init_plugins()

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user:User

  constructor(private userService:UserService, private _sidebar:SidebarService) { }

  ngOnInit() {
    init_plugins();
    this.user = this.userService.user
  }

  logout(){
    this.userService.logout()
  }

}
