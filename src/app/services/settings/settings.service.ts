import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    themeUrl: "assets/css/colors/default.css",
    theme: 'default'
  }
  url:string

  constructor( @Inject(DOCUMENT) private _document ) {   
    this.saveSettings()
  }

  saveLocalStorage(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes))
  }

  saveSettings(){
    if( localStorage.getItem('ajustes') ){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'))
      this.applyTheme(this.ajustes.theme)
      
    }
    else{
      this.applyTheme(this.ajustes.theme)

    }
  }

  applyTheme(theme:string){
    this.url = `assets/css/colors/${theme}.css`;
    this.ajustes.theme = theme;
    this.ajustes.themeUrl = this.url 
    this._document.getElementById('theme').setAttribute('href', this.url);
    this.saveLocalStorage() 
  }
}

interface Ajustes {
  themeUrl: string;
  theme: string;
}

