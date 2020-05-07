import { Component, OnInit } from '@angular/core';

declare function init_plugins() 

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})


export class PagenotfoundComponent implements OnInit {

  anio = new Date().getFullYear()

  constructor() { }

  ngOnInit() {
    init_plugins()
  }

}
