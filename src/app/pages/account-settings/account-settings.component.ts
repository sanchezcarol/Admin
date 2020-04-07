import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  url:string
              //Tipo de Inyección, Hace Referencia al DOM
  constructor(private _settings:SettingsService) {}

  ngOnInit() {
    this.check()
  }

  cambiarColor(theme:string,link:any){
    this.aplicarCheck(link)
    this._settings.applyTheme(theme)
    
  }
  
  aplicarCheck(link){
    let selectores:any = document.getElementsByClassName('selector');

    for(let ref of selectores){
      ref.classList.remove('working');
    }

    link.classList.add('working')

  }

  check(){
    let selectores:any = document.getElementsByClassName('selector');
    let theme = this._settings.ajustes.theme
    for(let ref of selectores){
      if(ref.getAttribute('data-theme') === theme){
        ref.classList.add('working');
        break;
      }
    }
  }
}
