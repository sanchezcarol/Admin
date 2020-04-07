import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
declare function init_plugins()

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _sidebar:SidebarService) { }

  ngOnInit() {
    init_plugins();
  }

  

}
